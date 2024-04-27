let Persona = {
  name: "jhorman",
  aprellido: "salazar",
  padre: {
    namep: "Rolando",
    apellodp: "Salazar G",
    edad: 51,
  },
  hobby: "tocar guitarra",
};

console.log(document.getElementById("copyright"));

function mostrar(event) {
  let mensaje = "";
  let precio = event.target
    .closest(".menu-item-tile")
    .querySelector(".price").textContent;
  precio += "00";
  mensaje = "El precio subio a: " + precio + "!";

  event.target.closest(".menu-item-tile").querySelector(".price").innerHTML =
    mensaje;
}

document.querySelectorAll(".menu-item-tile button").forEach((boton) => {
  boton.addEventListener("click", mostrar);
});

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelectorAll(".menu-item-tile button").forEach((boton) => {
    boton.addEventListener("click", mostrar2);
  });

  function mostrar2(event) {
    $ajaxUtils.sendGetRequest("/data/data.json", function (res) {
      var mess =
        res.nombre + " " + res.apellido + " tiene " + res.edad + " años.";

      event.target
        .closest(".menu-item-tile")
        .querySelector(".price").innerHTML = mess;
      console.log(mess);
      console.log(res);
    });
  }
});

$(function () {
  $("#collapsable-nav").on("focusout", function () {
    let screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $(".navbar-collapse").collapse("hide");
    }
  });
});
