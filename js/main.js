//variables
const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('.carrito__lista tbody');
const ofertas = document.querySelector('.special-offers');
const productos = document.querySelector('.products')
const vaciarCarritoBtn = document.querySelector('.carrito__vaciar');

let articulos = [];

cargarEventListeners();

function cargarEventListeners(){
    ofertas.addEventListener('click', agregarProducto);

    productos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', () => {
        articulos = JSON.parse(localStorage.getItem('carrito')) || [];
        console.log(articulos)
        carritoHTML();

    })

   

}

//Funcion para agregar productos

function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('addtocart')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(productoSeleccionado);
        
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
     }
}

