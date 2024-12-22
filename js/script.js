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


//-------------------RESENAS-------------------------
const resenas = [
  {
    producto: "Laptop de Alta Gama",
    estrellas: 5,
    comentario: "La laptop superó mis expectativas. Es rápida, ligera y perfecta para el trabajo remoto. La batería dura todo el día.",
    autor: "José Marcos."
  },
  {
    producto: "Auriculares Inalámbricos",
    estrellas: 3,
    comentario: "Buen sonido y muy cómodos para largas sesiones. La conexión Bluetooth es estable, aunque me gustaría un poco más de duración en la batería.",
    autor: "Carla Roselin."
  },  
  {
    producto: "Mouse Gamer",
    estrellas: 4,
    comentario: "Muy preciso y ergonómico. Las luces RGB son un toque genial. Solo le faltaría ser un poco más silencioso al hacer clic.",
    autor: "Ana Laura Mtri."
  },
  {
    producto: "Teclado Mecánico",
    estrellas: 5,
    comentario: "Me encanta el sonido de las teclas y la retroiluminación personalizable. Ideal para largas jornadas de programación.",
    autor: "Pedro Caseres."
  },
];

let resenaHtml = "";

// Asegúrate de que el contenedor esté definido antes de usarlo
const resenaContainer = document.getElementById("resenas");

for (let i = 0; i < resenas.length; i++) {
  let estrellasHtml = '';
    
    // Generar las estrellas llenas y vacías usando Font Awesome
    for (let j = 0; j < 5; j++) {
      if (j < resenas[i].estrellas) {
        // Estrella llena
        estrellasHtml += `<i class="fas fa-star"></i>`;
      } else {
        // Estrella vacía
        estrellasHtml += `<i class="far fa-star"></i>`;
      }
    }

  resenaHtml += `
  <div class="card-review"> 
    <div class="estrellas">${estrellasHtml}</div>    
    <h3 class="review-info-card">${resenas[i].autor}</h3>
    <p class="review-info-card">${resenas[i].comentario}</p>
</div>
  `;
  
};
// Asigna el contenido generado al contenedor
resenaContainer.innerHTML = resenaHtml;
