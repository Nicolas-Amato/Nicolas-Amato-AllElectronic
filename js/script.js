//---------------------PRODUCTOS-------------------------
document.addEventListener("DOMContentLoaded", () => {
    const productosVenta = [
        {
            nombre: "Teclado Mecánico",
            precio: 1800,
            descripcion: "Teclado mecánico de alta calidad para gamers y programadores.",
            imagen: "img/product1.png"
        },
        {
            nombre: "Mouse Gamer",
            precio: 1500,
            descripcion: "Mouse ergonómico inalámbrico con alta precisión y diseño moderno.",
            imagen: "img/product2.png"
        },
        {
            nombre: "Webcam de Alta Gama",
            precio: 800,
            descripcion: "Laptop de última generación con procesador Intel Core i9, 16 GB de RAM y SSD de 1 TB.",
            imagen: "img/product3.png"
        },
        {
            nombre: "Tablet Android",
            precio: 2500,
            descripcion: "Tablet ligera y potente con pantalla Full HD para todas tus necesidades.",
            imagen: "img/product4.png"
        },
        {
            nombre: "Disco Mecánico",
            precio: 1200,
            descripcion: "Discos duros mecánicos de 1 TB para almacenar todos tus archivos.",
            imagen: "img/product6.png"
        },
        {
            nombre: "Moden Inalámbrico",
            precio: 1500,
            descripcion: "Modelo de alta velocidad para una conexión estable y segura.",
            imagen: "img/product5.png"
        },
        {
            nombre: "Memorias Ram",
            precio: 1500,
            descripcion: "Memoria RAM DDR4 de 16 GB para mejorar el rendimiento de tu PC.",
            imagen: "img/product7.png"
        },
        {
            nombre: "Bateria de Laptop",
            precio: 1500,
            descripcion: "Bateria original para tu laptop con una duración de hasta 8 horas.",
            imagen: "img/product8.png"
        },
        {
            nombre: "Lectora portable",
            precio: 1300,
            descripcion: "Lectora de tarjetas SD y microSD para transferir tus archivos de manera rápida y segura.",
            imagen: "img/product9.png"
        },
    
    ];
    
    let productosHtml = "";
    const productosContainer = document.getElementById("producto");
    print(productosVenta);
    
    for(i = 0; i < productosVenta.length; i++){                                                                                              
        productosHtml += `
        <div class="producto">
            <img src="${productosVenta[i].imagen}">
            <h3>${productosVenta[i].nombre}</h3>
            <p>${productosVenta[i].descripcion}</p>
            <p class="price">Precio: $${productosVenta[i].precio}</p>
            <button class="add-to-cart">Agregar al carrito</button>
        </div>
        `;
    }
    productosContainer.innerHTML = productosHtml;
    });


//------------------------CARRITO---------------------------
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []; 
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
resenaContainer.innerHTML =  resenaHtml;


                                               