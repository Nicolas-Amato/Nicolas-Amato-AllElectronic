document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // Recuperar el carrito desde localStorage
  const cartCountElement = document.getElementById('cart-count');
  const cartButton = document.getElementById('cart-button');
  updateCartCount();

  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', event => {
          const productElement = event.target.closest('.producto');

          if (!productElement) {
              console.error('No se encontró el elemento del producto.');
              return;
          }

          const name = productElement.querySelector('h3')?.textContent.trim();
          const priceText = productElement.querySelector('.price')?.textContent.trim();
          const description = productElement.querySelector('p:nth-of-type(2)')?.textContent.trim();

          if (!name || !priceText || !description) {
              console.error('Faltan datos en el producto. Verifica la estructura HTML.');
              return;
          }

          const product = {
              name: name,
              price: parseFloat(priceText.replace('Precio: $', '')),
              description: description,
          };

          Swal.fire({
              title: '¿Deseas agregar este producto?',
              text: `Nombre: "${product.name}"`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Sí, agregar',
              cancelButtonText: 'No, gracias',
          }).then((result) => {
              if (result.isConfirmed) {
                  cart.push(product);
                  localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en localStorage

                  Swal.fire(
                      '¡Agregado!',
                      `${product.name} ha sido añadido a tu carrito.`,
                      'success'
                  );
                  updateCartCount();
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire(
                      'Cancelado',
                      'El producto no fue añadido a tu carrito.',
                      'error'
                  );
              }
          });
      });
  });

  function updateCartCount() {
      if (cartCountElement) {
          cartCountElement.textContent = cart.length;
      }
  }

  if (cartButton) {
      cartButton.addEventListener('click', () => {
          if (cart.length === 0) {
              Swal.fire({
                  title: 'Tu carrito está vacío',
                  text: 'Agrega productos para verlos aquí.',
                  icon: 'info',
                  confirmButtonText: 'Aceptar',
              });
              return;
          }

          const productListHTML = cart.map(product => `
              <li>
                  <strong>${product.name}</strong>
                  <br><small>${product.description}</small>
                  <strong>$ ${product.price}</strong>
              </li>
          `).join('');

          const total = cart.reduce((sum, product) => sum + product.price, 0);

          Swal.fire({
              title: 'Tu carrito de compras',
              html: `
                  <ul style="text-align: left; list-style: none; padding: 0;">
                      ${productListHTML}
                  </ul>
                  <p><strong>Total:</strong> $${total.toFixed(2)}</p>
              `,
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Cerrar',
              cancelButtonText: 'Vaciar carrito',
          }).then((result) => {
              if (result.dismiss === Swal.DismissReason.cancel) {
                  cart.length = 0; // Vacía el contenido del carrito
                  localStorage.setItem('cart', JSON.stringify(cart)); // Actualiza el localStorage
                  Swal.fire(
                      'Carrito vacío',
                      'Todos los productos han sido eliminados de tu carrito.',
                      'success'
                  );
                  updateCartCount(); // Actualizar el contador
              }
          });
      });
  }
});




//-----------------RESENAS-------------------------
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
