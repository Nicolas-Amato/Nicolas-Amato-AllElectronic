document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Recuperar el carrito desde localStorage
    const cartCountElement = document.getElementById('cart-count');
    updateCartCount();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.producto');
            const product = {
                name: productElement.querySelector('h3').textContent,
                price: parseFloat(productElement.querySelector('p:nth-of-type(1)').textContent.replace('Precio: $', '').trim()),
                description: productElement.querySelector('p:nth-of-type(2)').textContent,
            };
            cart.push(product); // Agregar el producto al carrito

            localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en localStorage
            alert(`Agregado al carrito: ${product.name}`);

            updateCartCount(); // Actualizar el contador del carrito
            console.log(cart); // Verificar el carrito en la consola
        });
    });

    function updateCartCount() {
        cartCountElement.textContent = cart.length; // Actualiza el número de productos en el carrito
    }
});
