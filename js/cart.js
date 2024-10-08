const cart = document.getElementById("cart-button");
const cartList = document.getElementById("cart-list");
const temporalAdvise = document.getElementById("temporal-advise");
let menuItems = [];
let cartListItems = [];

// Evento de click en el carrito
cart.addEventListener("click", (event) => {
  event.stopPropagation();
  cartList.classList.toggle("invisible-cart");
  cart.classList.toggle("cart-button-light");
});

// Evento de click para: eliminar, sumar y restar elementos del cartList
cartList.addEventListener("click", (event) => {
  event.stopPropagation();
  if (event.target && event.target.classList.contains("cart-delete-button")) {
    deleteCartListItem(event.target.parentElement);
  } else if (
    event.target &&
    event.target.classList.contains("cart-minus-button")
  ) {
    decreaseCartListItem(event.target.closest("li"));
    updateCartToLocalStorage();
  } else if (
    event.target &&
    event.target.classList.contains("cart-plus-button")
  ) {
    increaseCartListItem(event.target.closest("li"));
    updateCartToLocalStorage();
  }
});

// Función para mapear los elementos del menú despues de inyectarlos al main-content
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

  const existingItem = Array.from(cartList.children).find(
    (li) => li.id === itemId
  );

  if (existingItem) {
    const counter = existingItem.querySelector(".item-count");
    counter.textContent = parseInt(counter.textContent, 10) + 1;
    updateCartToLocalStorage();
  } else {
    const newElement = document.createElement("li");
    const itemData = menuItems.find((item) => item.id === itemId);
    createCartListItem(newElement, itemData);
    cartList.append(newElement);
    saveCartToLocalStorage(newElement);
    updateCartToLocalStorage();
  }

  cartList.classList.remove("invisible-cart");
  cart.classList.add("cart-button-light");

  temporalAdvise.remove();
  // console.log("Item agregado al carrito:", itemData);
};

function loadExistingItems(item, itemData) {
  temporalAdvise.remove();
  const image = document.createElement("img");
  image.src = itemData.imageSrc;
  image.classList.add("cart-item-img");

  const title = document.createElement("span");
  title.textContent = itemData.title;
  title.classList.add("title");

  const counter = document.createElement("span");
  counter.classList.add("item-count");
  counter.textContent = itemData.count;

  const deleteButton = document.createElement("span");
  deleteButton.textContent = "X";
  deleteButton.classList.add("cart-delete-button");

  const minusButton = document.createElement("span");
  minusButton.textContent = "-";
  minusButton.classList.add("cart-minus-button");

  const plusButton = document.createElement("span");
  plusButton.textContent = "+";
  plusButton.classList.add("cart-plus-button");

  item.id = itemData.id;
  item.appendChild(image);
  item.appendChild(minusButton);
  item.appendChild(counter);
  item.appendChild(plusButton);
  item.appendChild(title);
  item.appendChild(deleteButton);
  item.classList.add("cart-item");
}

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

  item.id = itemData.id;
  item.appendChild(image);
  item.appendChild(minusButton);
  item.appendChild(counter);
  item.appendChild(plusButton);
  item.appendChild(title);
  item.appendChild(deleteButton);
  item.classList.add("cart-item");
}

function decreaseCartListItem(item) {
  const itemCounter = item.querySelector(".item-count");
  let counter = parseInt(itemCounter.textContent, 10);

  if (counter > 1) {
    itemCounter.textContent = counter - 1;
  } else {
    deleteCartListItem(item);
  }

  updateCartToLocalStorage();
}

function increaseCartListItem(item) {
  const itemCounter = item.querySelector(".item-count");
  const counter = parseInt(itemCounter.textContent, 10);
  itemCounter.textContent = counter + 1;

  updateCartToLocalStorage();
  console.log(cartListItems);
}

function saveCartToLocalStorage(item) {
  const itemData = extractCartListItemData(item);
  const cartItems = JSON.parse(localStorage.getItem("cartListItems") || "[]");
  cartItems.push(itemData);
  localStorage.setItem("cartListItems", JSON.stringify(cartItems));
}

function updateCartToLocalStorage() {
  const cartListToUpdate = Array.from(cartList.querySelectorAll("li")).map(
    extractCartListItemData
  );
  localStorage.setItem("cartListItems", JSON.stringify(cartListToUpdate));
}

window.onload = function () {
  const savedCart = localStorage.getItem("cartListItems");
  if (savedCart) {
    cartListItems = JSON.parse(savedCart);
    cartListItems.forEach((itemData) => {
      const newElement = document.createElement("li");
      loadExistingItems(newElement, itemData);
      cartList.append(newElement);
    });
  }
};

function deleteCartListItem(cartListItem) {
  cartListItem.remove();
  updateCartToLocalStorage();
}

// Función para extraer los datos de los elementos del menú
function extractMenuItemData(item) {
  const id = item.id;
  const title =
    item.querySelector("h5")?.textContent.trim() || "Título no disponible";
  const description =
    item.querySelector("p")?.textContent.trim() || "Descripción no disponible";
  const price =
    item.querySelector(".price")?.textContent.trim() || "Precio no disponible";
  const imageSrc = item.querySelector("img")?.src || "Imagen no disponible";

  return { id, title, description, price, imageSrc };
}

function extractCartListItemData(item) {
  const id = item.id;
  const title =
    item.querySelector(".title")?.textContent.trim() || "Título no disponible";
  const count =
    item.querySelector(".item-count")?.textContent.trim() ||
    "Contador no disponible";
  const imageSrc = item.querySelector("img")?.src || "Imagen no disponible";

  return { id, title, count, imageSrc };
}

// console.log(localStorage.getItem("cartListItems"));
