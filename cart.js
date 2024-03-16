const cart = {};

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    if (!cart[productId]) {
      cart[productId] = { quantity: 1, price: price };
    } else {
      cart[productId].quantity++;
    }
    updateCartDisplay();
  });
});
document.querySelectorAll(".remove-from-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    if (cart[productId]) {
      if (cart[productId].quantity > 1) {
        cart[productId].quantity--;
      } else {
        delete cart[productId];
      }
      updateCartDisplay();
    }
  });
});

function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    const productContainer = document.createElement("div");
    productContainer.classList.add("cart-item");

    const productName = document.createElement("p");
    productName.textContent = `Product ${productId}`;
    productName.classList.add("cart-item-name");
    productContainer.appendChild(productName);

    const productDetails = document.createElement("div");
    productDetails.classList.add("cart-item-details");

    const productQuantity = document.createElement("p");
    productQuantity.textContent = `Quantity: ${item.quantity}`;
    productQuantity.classList.add("cart-item-quantity");
    productDetails.appendChild(productQuantity);

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: ฿${item.price} each`;
    productPrice.classList.add("cart-item-price");
    productDetails.appendChild(productPrice);

    const productTotalPrice = document.createElement("p");
    productTotalPrice.textContent = `Total Price: $${itemTotalPrice}`;
    productTotalPrice.classList.add("cart-item-total-price");
    productDetails.appendChild(productTotalPrice);

    productContainer.appendChild(productDetails);
    cartElement.appendChild(productContainer);
  }

  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: ฿${totalPrice}`;
    totalPriceElement.classList.add("cart-total-price");
    cartElement.appendChild(totalPriceElement);
  }
}
