// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");


// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Add product to cart
document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }

        saveCart();
        renderCart();

    });

});


// Display cart
function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }

    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const itemInfo = document.createElement("div");
        itemInfo.className = "item-info";

        const itemName = document.createElement("h3");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("p");
        itemPrice.textContent =
            `₹${item.price.toLocaleString("en-IN")} × ${item.quantity}`;

        itemInfo.append(itemName, itemPrice);

        const quantityControls = document.createElement("div");
        quantityControls.className = "quantity-controls";

        const decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "−";

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";

        decreaseBtn.addEventListener("click", () => {
            changeQuantity(item.id, -1);
        });

        increaseBtn.addEventListener("click", () => {
            changeQuantity(item.id, 1);
        });

        quantityControls.append(
            decreaseBtn,
            quantity,
            increaseBtn
        );

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", () => {
            removeProduct(item.id);
        });

        cartItem.append(
            itemInfo,
            quantityControls,
            removeBtn
        );

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


// Change quantity
function changeQuantity(id, change) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeProduct(id);
        return;
    }

    saveCart();
    renderCart();

}


// Remove product
function removeProduct(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    renderCart();

}


// Checkout demo
checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(`Your total is ${cartTotal.textContent}`);

});


// Display previously saved cart on page load
renderCart();