fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productosDiv = document.querySelector('#productos .productos');
        data.forEach(producto => {
            productosDiv.innerHTML += `
                <div class="card">
                    <img src="${producto.image}" alt="${producto.title}">
                    <h3>${producto.title}</h3>
                    <p class="descripcion">${producto.description}</p>
                    <button class="agregarCarrito" data-id="${producto.id}">Añadir al carrito</button>
                </div>
            `;
        });

        document.querySelectorAll('.agregarCarrito').forEach(boton => {
            boton.addEventListener('click', () => {
                const productoId = boton.getAttribute('data-id');
                const producto = data.find(p => p.id === parseInt(productoId));
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                
                carrito.push(producto);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosCarritoDiv = document.getElementById('productosCarrito');
    productosCarritoDiv.innerHTML = '';

    if (carrito.length > 0) {
        carrito.forEach(producto => {
            productosCarritoDiv.innerHTML += `
                <div class="productoCarrito">
                    <p>Nombre: ${producto.title}</p>
                    <p>Precio: $${producto.price}</p>
                    <button class="eliminarProducto" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
        });

        document.querySelectorAll('.eliminarProducto').forEach(boton => {
            boton.addEventListener('click', () => {
                const productoId = boton.getAttribute('data-id');
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                carrito = carrito.filter(producto => producto.id !== parseInt(productoId));
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
        });
    } else {
        productosCarritoDiv.innerHTML = '<p>El carrito está vacío.</p>';
    }
}
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    actualizarCarrito();
});

document.addEventListener('DOMContentLoaded', actualizarCarrito);
