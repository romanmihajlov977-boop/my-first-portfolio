
let cart = [];

function addToCart(name, price, sizeId) {
    const size = document.getElementById(sizeId).value;

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            size: size,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function updateCart() {
    const items = document.getElementById("cart-items");
    const count = document.getElementById("cart-count");
    const total = document.getElementById("cart-total");

    items.innerHTML = "";

    let sum = 0;
    let totalCount = 0;

    if (cart.length === 0) {
        items.innerHTML = `
            <div class="empty-cart">
                Корзина пока пустая 🛒
                <p>Добавь что-нибудь из коллекции!</p>
            </div>
        `;
    }

    cart.forEach((item, index) => {
        sum += item.price * item.quantity;
        totalCount += item.quantity;

        items.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-top">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <p>Размер: ${item.size}</p>
                        <p>${item.price.toLocaleString("ru-RU")} ₽ за шт.</p>
                    </div>

                    <button class="remove-button"
                        onclick="removeFromCart(${index})">
                        Удалить
                    </button>
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    count.textContent = totalCount;
    total.textContent = sum.toLocaleString("ru-RU") + " ₽";
}

function openCart() {
    document.getElementById("cart-panel").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
    document.getElementById("cart-overlay").classList.toggle("active");
}

function checkout() {
    if (cart.length === 0) {
        alert("Сначала добавь товары в корзину!");
        return;
    }

    alert("Это демонстрационный магазин. Настоящие заказы и оплата пока не подключены.");
}
