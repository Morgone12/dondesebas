

  //evento de click en el carrito:
  const cart = document.getElementById("cart-button");
  const cartList = document.getElementById("cart-list");
  const mainContent = document.getElementById("main-menu-content");

  cart.addEventListener("click", () => {
    cartList.classList.toggle("invisible-cart");
  });

  cart.addEventListener("click", () => {
    cart.classList.toggle("cart-button-light");
  });


  // En Desarrollo

  mainContent.addEventListener("click", (event)=> {
  if(event.target && event.target.id === "menu_item_button") {
    addToCart();
  }
  });

  //AGREGAR CONTADOR PARA CADA ITEM IGUAL AÑADIDO, PISTA: USAR IDS Y VALIDAR SI EL ID === EVENT.TARGET.ID
  function addToCart(event) {
    const newElement = document.createElement("li");
    const itemId = event.target.closest(".menu-item-tile").id;
    const itemData = menuItems.find(item => item.id === itemId);
    newElement.appendChild(); //aqui agregremos la foto, luego el titulo, y luego un contador en caso de que exista un item con el mismo id
    cartList.append(newElement); 
    cartList.classList.remove("invisible-cart");
    cart.classList.add("cart-button-light");
  };

  const menuItems = Array.from(mainContent.querySelectorAll(".menu-item-tile")).map(extractMenuItemData);

  console.log(menuItems);

  //En desarrollo: guardar los menuItems en el local storage

  function extractMenuItemData(item) {
    const id = item.id;
    const title = item.querySelector("h5") ? item.querySelector("h5").textContent.trim() : "Titulo no disponible";
    const description = item.querySelector("p") ? item.querySelector("p").textContent.trim() : "Titulo no disponible";
    const price = item.querySelector(".price") ? item.querySelector(".price").textContent.trim() : "Precio no disponible" 
    const img = item.querySelector("img");
    const imageSrc = img ? img.src : "Imagen no disponible";

    return {
      id: id,
      title: title,
      description: description,
      price: price,
      imageSrc: imageSrc
    };
  }

  //addEventListener("evento", handleEvent, options); esta funcion cuenta con un tercer parametro: options, si solo pones options entonces no hara nada, si pones once: entonces el evento se ejecutara una vez y luego se eliminara del elemento que tenga este evento. si usas capture: Un valor booleano que indica que los eventos de este tipo serán enviados al receptor registrado antes de ser enviados a cualquier EventTarget por debajo de él en el árbol DOM. Si no se especifica, el valor predeterminado es false.

  //usar removeEventListener("click", evento); para eliminar un evento, "click" puede ser reemplazado por cualquier otra cosa

  //usar remove() y removeChild() para el crud

  //usar elementoQueSeClonara.cloneNode(true); y elementoQueSeRemplazara.replaceWith(elementoRemplazador);

  //replaceWith(); ESTE METODO NO CLONA EL ELEMENTO REMPLAZADOR, LO MUEVE DONDE VA A REEMPLAZAR.
  //cloneNode(true OR false); ESTE METODO CLONA EL ELEMENTO Y SUS PARAMETROS, CLASES, ID, ETC. False: NO SE CLONAN LOS HIJOS; true: SE CLONAN LOS HIJOS DEL ELEMENTO.

  //alert("mensaje"); muestra una ventana de alerta con un mensaje.

  //setTimeout(funcionAEjectutar, cuentaAtrasMilisegundos);