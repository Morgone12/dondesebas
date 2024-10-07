// Este archivo se encarga del evento de click en el carrito, mapear a local storage, y mapear las peticiones AJAX

const cart = document.getElementById("cart-button");
const cartList = document.getElementById("cart-list");
const mainContent = document.getElementById("main-menu-content");
let menuItems = [];
let cartListItems = [];

// Evento de click en el carrito
cart.addEventListener("click", (event) => {
  event.stopPropagation();
  cartList.classList.toggle("invisible-cart");
});

cart.addEventListener("click", () => {
  cart.classList.toggle("cart-button-light");
});


// Función para mapear los elementos del menú
window.mapMenuItems = function () {
  menuItems = Array.from(document.querySelectorAll(".menu-item-tile")).map(
    extractMenuItemData
  );

  document.querySelectorAll(".menu-item-tile button").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
};

// Función para agregar al carrito
window.addToCart = function (event) {
  const itemId = event.target.closest(".menu-item-tile").id;
  const itemData = menuItems.find((item) => item.id === itemId);
  
  // Buscamos si existe un item en los hijos de cartList con el id === a itemId
  const existingItem = Array.from(cartList.children).find(
    (li) => li.dataset.id === itemId
  );

  if (existingItem) {
    const counter = existingItem.querySelector(".item-count");
    const count = parseInt(counter.textContent, 10);
    counter.textContent = count + 1;
  } else {
    const newElement = document.createElement("li");
    createCartListItem(newElement, itemData);
    cartList.append(newElement);
    cartListItems.push(newElement);
  }

  cartList.classList.remove("invisible-cart");
  cart.classList.add("cart-button-light");
  const advise = document.getElementById("temporal-advise");
  if (advise) {
    advise.remove();
  }

  console.log("Item agregado al carrito:", itemData);
};

// Función para crear un elemento en la lista del carrito
function createCartListItem(item, itemData) {
  if (!itemData) {
    console.error("Datos del item no encontrados");
    return;
  }

  const image = document.createElement("img");
  image.src = itemData.imageSrc;
  image.classList.add("cart-item-img");

  const title = document.createElement("span");
  title.textContent = itemData.title;
  title.classList.add("title");

  const counter = document.createElement("span");
  counter.classList.add("item-count");
  counter.textContent = "1";

  const deleteButton = document.createElement("span");
  deleteButton.textContent = "X";
  deleteButton.classList.add("cart-delete-button");

  const minusButton = document.createElement("span");
  minusButton.textContent = "-";
  minusButton.classList.add("cart-minus-button");

  const plusButton = document.createElement("span");
  plusButton.textContent = "+";
  plusButton.classList.add("cart-plus-button");

  item.dataset.id = itemData.id;
  item.appendChild(image);
  item.appendChild(minusButton);
  item.appendChild(counter);
  item.appendChild(plusButton);
  item.appendChild(title);
  item.appendChild(deleteButton);
  item.classList.add("cart-item");
}

// Evento de click para: eliminar elemento del cartList, sumar, y restar elemento del cartList.
cartList.addEventListener("click", (event) => {
  if (event.target && event.target.closest("span").classList.contains("cart-delete-button")) {
    deleteCartListItem(event.target.parentElement);
  } else if (event.target && event.target.closest("span").classList.contains("cart-minus-button")) {
    const itemData = menuItems.find((item) => item.id === event.target.parentElement.id);
    decreaseCartListItem(event.target, itemData);
  }
});

function decreaseCartListItem(item, itemData) {
  const itemCounter = itemData.counter;
  let counter = itemCounter.textContent.parseInt;
  counter -= 1;
  itemData.counter = counter;
  item.textContent = itemData.counter;
  console.log(`menos 1 elemento ${itemData.title}`);
}

function deleteCartListItem(cartListItem) {
  cartListItem.remove();
}

// En desarrollo: guardar los menuItems en el local storage
cartListItems = Array.from(document.querySelectorAll(".cart-item")).map(extractCartListItemData);
console.log(cartListItems);
// localStorage.setItem.JSON.stringify(cartListItems);


// Función para extraer los datos de los elementos del menú
function extractMenuItemData(item) {
  const id = item.id;
  const title = item.querySelector("h5")
    ? item.querySelector("h5").textContent.trim()
    : "Título no disponible";
  const description = item.querySelector("p")
    ? item.querySelector("p").textContent.trim()
    : "Descripción no disponible";
  const price = item.querySelector(".price")
    ? item.querySelector(".price").textContent.trim()
    : "Precio no disponible";
  const img = item.querySelector("img");
  const imageSrc = img ? img.src : "Imagen no disponible";

  return {
    id: id,
    title: title,
    description: description,
    price: price,
    imageSrc: imageSrc,
  };
}

function extractCartListItemData(item) {
  const id = item.id;
  const title = item.querySelector(".title") ? item.querySelector(".title").textContent : "Titulo no disponible";
  const itemCounter = item.querySelector(".item-count") ? item.querySelector(".item-count").textContent.parseInt : "Contador de item no disponible";

  return {
    id: id,
    title: title,
    count: count
  };
}
