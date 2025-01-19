let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");
let totalPriceHTML = document.querySelector(".total-price"); // New element to display total price

let listProducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showcart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showcart");
});

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <img src="${product.image} " alt=""/>
        <h3>${product.name}</h3>
        <div class="">${product.price}</div> 
        <button class="addcart">Add to Cart</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addcart")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0; // Variable to hold the total price of the cart
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProducts[positionProduct];
      let itemTotalPrice = info.price * cart.quantity; // Calculate total price for this item

      totalPrice += itemTotalPrice; // Add item price to the total price

      newCart.innerHTML = `
        <div class="image">
          <img src="${info.image}  "/>
        </div>
        <div class="name">${info.name}</div>
        <div class="totalPrice">${itemTotalPrice}</div>
        <div class="quantity">
          <span class="minus">➖</span>
          <span> ${cart.quantity} </span>
          <span class="plus">➕</span>
        </div>
      `;
      listCartHTML.appendChild(newCart);
    });
  }

  iconCartSpan.innerHTML = totalQuantity;

  // Update the total price display
  if (totalPriceHTML) {
    totalPriceHTML.innerHTML = `Total: $${totalPrice.toFixed(2)}`; // Display total price with 2 decimals
  }
};

listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains("minus") || positionClick.classList.contains("plus")) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if(positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
  if(positionItemInCart >= 0){
    switch(type){
      case "plus": 
        carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1; 
        break;
      default: 
        let valueChange = carts[positionItemInCart].quantity - 1;
        if(valueChange > 0){
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};

const initApp = () => {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();

      if(localStorage.getItem("cart")){
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML(); 
      }
    });
};

initApp();
