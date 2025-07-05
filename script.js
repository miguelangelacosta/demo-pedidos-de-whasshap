// script.js completo con generación de QR para cada mesa y Swiper funcional

const productos = [
  // 🥘 Platos fuertes
  { categoria: 'platos', nombre: '🍔 Hamburguesa', precio: 15000, imagen: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg', ingredientes: ['Queso', 'Lechuga', 'Tomate', 'Tocineta', 'Cebolla'] },
  { categoria: 'platos', nombre: '🍕 Pizza', precio: 18000, imagen: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg', ingredientes: ['Queso', 'Pepperoni', 'Champiñones', 'Pimentón'] },
  { categoria: 'platos', nombre: '🌮 Taco', precio: 13000, imagen: 'https://cdn.pixabay.com/photo/2022/07/13/01/43/mexican-food-7318767_960_720.jpg', ingredientes: ['Carne', 'Queso', 'Tomate'] },
  { categoria: 'platos', nombre: '🥙 Arepa Rellena', precio: 10000, imagen: 'https://cdn.pixabay.com/photo/2020/10/06/02/07/arepa-5631301_960_720.jpg', ingredientes: ['Queso', 'Carne', 'Huevo'] },
  { categoria: 'platos', nombre: '🍛 Arroz Chino', precio: 12000, imagen: 'https://cdn.pixabay.com/photo/2017/05/07/08/56/rice-2294365_960_720.jpg', ingredientes: ['Verduras', 'Huevo', 'Pollo'] },

  // 🥤 Bebidas
  { categoria: 'bebidas', nombre: '🥭 Jugo de Mango', precio: 5000, imagen: 'https://cdn.pixabay.com/photo/2020/08/07/04/09/mango-5469969_960_720.jpg', ingredientes: ['Azúcar', 'Hielo'] },
  { categoria: 'bebidas', nombre: '🍊 Jugo de Naranja', precio: 5000, imagen: 'https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995079_960_720.jpg', ingredientes: ['Naranja', 'Azúcar'] },
  { categoria: 'bebidas', nombre: '🥤 Gaseosa', precio: 4000, imagen: 'https://cdn.pixabay.com/photo/2016/05/05/19/43/soda-1373682_960_720.jpg', ingredientes: ['Fría', 'Con gas'] },
  { categoria: 'bebidas', nombre: '🍵 Té Helado', precio: 4500, imagen: 'https://cdn.pixabay.com/photo/2017/07/30/12/40/iced-tea-2559221_960_720.jpg', ingredientes: ['Té', 'Hielo'] },

  // 🍰 Postres
  { categoria: 'postres', nombre: '🍦 Helado', precio: 6000, imagen: 'https://cdn.pixabay.com/photo/2016/07/22/07/27/ice-cream-1536830_960_720.jpg', ingredientes: ['Chocolate', 'Vainilla'] },
  { categoria: 'postres', nombre: '🍮 Flan', precio: 5500, imagen: 'https://cdn.pixabay.com/photo/2016/05/10/16/53/flan-1383774_960_720.jpg', ingredientes: ['Huevo', 'Caramelo'] },
  { categoria: 'postres', nombre: '🍰 Pastel', precio: 7000, imagen: 'https://cdn.pixabay.com/photo/2014/04/22/02/56/cake-329881_960_720.jpg', ingredientes: ['Frutas', 'Crema'] },
  { categoria: 'postres', nombre: '🥧 Pie de Limón', precio: 6500, imagen: 'https://cdn.pixabay.com/photo/2015/03/26/09/41/lemon-pie-690040_960_720.jpg', ingredientes: ['Limón', 'Merengue'] },

  // 🥃 Licores
  { categoria: 'licores', nombre: '🍺 Cerveza', precio: 8000, imagen: 'https://cdn.pixabay.com/photo/2017/05/23/22/36/beer-2330718_960_720.jpg', ingredientes: ['Fría'] },
  { categoria: 'licores', nombre: '🥃 Ron', precio: 9000, imagen: 'https://cdn.pixabay.com/photo/2016/03/27/17/04/rum-1283797_960_720.jpg', ingredientes: ['Con hielo'] },
  { categoria: 'licores', nombre: '🍸 Vodka', precio: 10000, imagen: 'https://cdn.pixabay.com/photo/2017/05/19/18/25/vodka-2329229_960_720.jpg', ingredientes: ['Con limón'] },
  { categoria: 'licores', nombre: '🥂 Aguardiente', precio: 9500, imagen: 'https://cdn.pixabay.com/photo/2016/11/18/21/15/wine-1836419_960_720.jpg', ingredientes: ['Fría'] }
];

let carrito = [];

function crearProductoHTML(p, index) {
  const checkboxes = p.ingredientes.map((ing, i) => `
    <label><input type="checkbox" id="prod-${index}-ing-${i}" checked /> ${ing}</label>`).join("<br>");

  const slideClass = ['bebidas', 'licores'].includes(p.categoria) ? 'swiper-slide' : '';

  return `
    <div class="producto ${slideClass}">
      <div style="position: relative; border-radius: 8px; overflow: hidden;">
        <img src="${p.imagen}" alt="${p.nombre}" class="imagen-producto">
        <div class="overlay-info">${p.ingredientes.join(', ')}</div>
      </div>
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <div class="ingredientes">
        <strong>Ingredientes:</strong><br>
        ${checkboxes}
      </div>
      <button onclick="agregar(${index})">Agregar</button>
    </div>`;
}

function renderizarProductos() {
  productos.forEach((p, index) => {
    const html = crearProductoHTML(p, index);
    const contenedor = document.getElementById(p.categoria);
    if (contenedor) contenedor.innerHTML += html;
  });

  new Swiper('.bebidas-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: { nextEl: '.bebidas-next', prevEl: '.bebidas-prev' }
  });

  new Swiper('.licores-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: { nextEl: '.licores-next', prevEl: '.licores-prev' }
  });
}

function agregar(index) {
  const p = productos[index];
  const ingredientesSeleccionados = p.ingredientes.filter((_, i) => {
    const checkbox = document.getElementById(`prod-${index}-ing-${i}`);
    return checkbox && checkbox.checked;
  });
  carrito.push({ nombre: p.nombre, precio: p.precio, ingredientes: ingredientesSeleccionados });
  mostrarCarrito();
}

function mostrarCarrito() {
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  const contenido = carrito.map(p =>
    `• ${p.nombre} - $${p.precio}\n   Ingredientes: ${p.ingredientes.join(', ')}`
  ).join('\n\n');
  document.getElementById("carrito").innerText = contenido + (total > 0 ? `\n\n💰 Total: $${total}` : '');
}

function generarTextoFinal() {
  const nombre = document.getElementById("nombreCliente").value.trim();
  const direccion = document.getElementById("direccionCliente").value.trim();
  const notas = document.getElementById("notasCliente").value.trim();
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  const pedido = carrito.map(p =>
    `• ${p.nombre} - $${p.precio}\n   Ingredientes: ${p.ingredientes.join(', ')}`
  ).join('\n\n');

  let texto = `Hola, quiero pedir:\n\n${pedido}\n\n💰 Total: $${total}`;
  if (nombre || direccion || notas) {
    texto += `\n\nDatos del cliente:`;
    if (nombre) texto += `\nNombre: ${nombre}`;
    if (direccion) texto += `\nDirección/Mesa: ${direccion}`;
    if (notas) texto += `\nNotas: ${notas}`;
  }
  return texto;
}

function enviarPedido() {
  if (carrito.length === 0) return alert("Tu carrito está vacío.");
  const mensaje = generarTextoFinal();
  const telefono = '573175533775';
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function generarPDF() {
  if (carrito.length === 0) return alert("Tu carrito está vacío.");
  const texto = generarTextoFinal();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text(texto, 10, 20);
  doc.save("pedido.pdf");
}

function vaciarPedido() {
  carrito = [];
  mostrarCarrito();
  document.getElementById("nombreCliente").value = '';
  document.getElementById("direccionCliente").value = '';
  document.getElementById("notasCliente").value = '';
}

function cargarUbicacion() {
  if (!navigator.geolocation) return alert("Geolocalización no disponible.");
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      document.getElementById("direccionCliente").value = url;
    },
    error => alert("No se pudo obtener la ubicación: " + error.message)
  );
}

function generarQRParaMesa(numeroMesa) {
  if (!numeroMesa) return alert("Ingresa un número de mesa válido.");
  const url = `https://magical-belekoy-05f637.netlify.app/?mesa=${numeroMesa}`;
  const qrContainer = document.getElementById("qrContainer");
  qrContainer.innerHTML = '';
  new QRCode(qrContainer, url);
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const mesa = params.get('mesa');
  if (mesa) {
    document.getElementById("direccionCliente").value = `Mesa ${mesa}`;
  }

  renderizarProductos();
});
