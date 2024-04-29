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
  $(".navbar-toggler").on("focusout", function () {
    let screenWidth = window.innerWidth;
    if (screenWidth < 992) {
      $(".navbar-collapse").collapse("hide");
    }
  });
});

(function (global) {
  let ds = {};
  const homeHtml = "snippets/home-snippet.html";

  let insertHtml = function (selector, html) {
    let target = document.querySelector(selector);
    target.innerHTML = html;
  };
  //Mandamos la peticion get para cargar dinamicamente en la página el contenido html en el selector
  document.addEventListener("DOMContentLoaded", function () {
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      },
      false
    );
  });

  const menuHtml = "snippets/menu-snippet.html";

  //Mandamos la peticion get para cargar dinamicamente en la página el contenido html en el selector
  document.addEventListener("DOMContentLoaded", function () {
    $ajaxUtils.sendGetRequest(
      menuHtml,
      function (responseText) {
        document.querySelector("#main-menu-content").innerHTML = responseText;
      },
      false
    );
  });
  //exponemos el objeto ds (d onde s ebas, por eso es ds) al global
  global.$ds = ds;
})(window);
