//variables
const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('.carrito__lista tbody');
const ofertas = document.querySelector('.special-offers');
const productos = document.querySelector('.products')
const vaciarCarritoBtn = document.querySelector('#carrito__vaciar');
const productoSwiper = document.querySelector('.swiper-wrapper');
const specialOferts = document.querySelector('.special-offers__container');
const carouselItem = document.querySelector('.carousel-inner');
let articulos = [];
let productHTML = document.createElement('div');

cargarEventListeners();

function cargarEventListeners(){
    ofertas.addEventListener('click', agregarProducto);

    productos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', () => {
        articulos = JSON.parse(localStorage.getItem('carrito')) || [];
       
        carritoHTML();

    })
    
    document.addEventListener('DOMContentLoaded', function () {
    
        async function fetchProducts(url) {
            let data = await fetch(url);
            let response = await data.json();
    
            for (let i = 0; i < 4; i++) {
                specialOferts.innerHTML += `
                <article class="special-offers__card">
                    <div class="special-offers__card__texts">
                        <h3>${response[i].title}</h3>
                        <div class="special-offers__card__texts__price">
                            <span>${response[i].price + 100}</span>
                            <span class="price">${response[i].price}</span>
                        </div>
                        <a href="" class="addtocart" data-id="${response[i].id}">Agregar al carrito</a>
                    </div>
                    <img src="${response[i].image}" alt="">
                </article>
                `;
            }
    
            for (let index = 14; index < 20; index++) {
                productoSwiper.innerHTML += `
                <div class="swiper-slide">
                    <article class="product">
                        <img src="${response[index].image}" class="product__img" alt="">
                        <div class="product__texts">
                            <h3 class="product__name">${response[index].title}</h3>
                            <p class="product__info">Excelente calidad</p>
                            <p class="product__price price">${response[index].price}</p>
                        </div>
                        <a href="" class="addtocart" data-id="${response[index].id}">Agregar Carrito</a>
                    </article>
                </div>
                `;
            }
        }
    
        fetchProducts('https://fakestoreapi.com/products');
    });
}
   



//Funcion para agregar productos

function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('addtocart')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(productoSeleccionado);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado',
            showConfirmButton: false,
            timer: 1000
          })
        
    }  
   
}
// Elimina el producto del carrito en el DOM
function eliminarProducto(e){
    if(e.target.classList.contains('borrar-curso')){
        const productoId = e.target.getAttribute('data-id');

        articulos = articulos.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}
// Lee los datos del producto
function leerDatos(producto){

    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.price').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    const productoRepetido = articulos.some(producto => producto.id === infoProducto.id);

    if(productoRepetido){
        const productos = articulos.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                producto.precio = (parseFloat(producto.precio) + parseFloat(infoProducto.precio)).toFixed(2);
                return producto;
            }else{
                return producto;
            }
        })
        articulos = [...productos]
    }else{
        articulos = [...articulos, infoProducto];
    }
    
    carritoHTML();
    
}
// Muestra el producto seleccionado en el Carrito
function carritoHTML(){

    vaciarCarrito();
    
    articulos.forEach(producto => {
        const {imagen, nombre, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${imagen}" width=100>
               </td>
               <td>${nombre}</td>
               <td>${precio}</td>
               <td>${cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
    })

    sincronizarStorage();
    
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulos));
}
// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {

    
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        localStorage.removeItem('carrito');

    }
   
}

