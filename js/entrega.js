let carrito = [];

class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const productosDisponibles = [
    new Producto("Remera 1", 15000, "imagen1.jpg"),
    new Producto("Remera 2", 13000, "imagen2.jpg"),
    new Producto("Remera 3", 14000, "imagen3.jpg"),
    new Producto("Zapatillas 1", 35000, "imagen4.jpg"),
    new Producto("Zapatillas 2", 33000, "imagen5.jpg"),
    new Producto("Zapatillas 3", 34000, "imagen6.jpg"),
    new Producto("Jean 1", 25000, "imagen7.jpg"),
    new Producto("Jean 2", 23000, "imagen8.jpg"),
    new Producto("Jean 3", 24000, "imagen9.jpg")
];

function mostrarProductosDisponibles() {
    alert("Productos disponibles:");
    productosDisponibles.forEach((producto, index) => {
        alert(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio}`);
    });
}

function agregarProducto() {
    mostrarProductosDisponibles();
    const seleccion = parseInt(prompt("Ingrese el número del producto que desea agregar:")) - 1;

    if (seleccion >= 0 && seleccion < productosDisponibles.length) {
        const productoSeleccionado = productosDisponibles[seleccion];
        carrito.push(productoSeleccionado);

        alert(`¡${productoSeleccionado.nombre} se ha agregado al carrito!`);
    } else {
        alert("Selección inválida. Por favor, elija un producto válido.");
    }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    console.log("Productos en el carrito:");
    if( carrito.length === 0){
        alert('No hay productos en el carrito');
        return;
    }
    alert("Productos en el carrito:");
    
    carrito.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio}`);
        alert(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio}`);
    });
}

// Función para calcular el total de la compra
function calcularTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    alert(`Total de la compra: $${total}`);
}

const borrarProducto = () => {
    mostrarCarrito();
    const seleccion = parseInt(prompt("Ingrese el número del producto que desea eliminar:")) - 1;
    if (seleccion >= 0 && seleccion < carrito.length) {
        const productoSeleccionado = carrito[seleccion];
        carrito.splice(seleccion, 1);

        alert(`¡${productoSeleccionado.nombre} se ha eliminado del carrito!`);
       
    } else {
        alert("Selección inválida. Por favor, elija un producto válido.");
    }
}
// Función principal
function main() {
    while (true) {
        const opcion = prompt(`¿Qué deseas hacer?\n1. Agregar producto al carrito\n2. Ver carrito\n3. Calcular total\n4. Borrar producto del carrito\n5. Salir`);

        switch (opcion) {
            case "1":
                agregarProducto();
                break;
            case "2":
                mostrarCarrito();
                break;
            case "3":
                calcularTotal();
                break;
            case "4":
                borrarProducto();    
                break;
            case "5":
                alert("Gracias por usar nuestro sistema de compra.");
                return;
            default:
                alert("Opción no válida. Por favor, selecciona una opción válida.");
                break;
        }
    }
}

// Iniciar la función principal
main();