let importe = prompt("Ingrese importe de venta");

let importeTotal;

const descuento = (importe, descuento) => {
    let totalDescuento = importe * descuento;
    return totalDescuento
}

const interesCuotas = (cuotas, importe) => {
    let importeTotal

    if(cuotas === 3){
         importeTotal = importe * 1.05
    }
    if(cuotas === 6){
         importeTotal = importe * 1.15
    }

    return importeTotal
}


while (parseFloat(importe)!== 0) {
    let metodoDePago = prompt("Ingrese metodo de pago: 1-Efectivo 2-Tarjeta de credito");
    switch (parseInt(metodoDePago)) {
        case 1:
            if (importe < 5000) {
                importeTotal = importe;
                alert(`El importe a pagar es: ${importeTotal}`);
            } else if (importe >= 5000 && importe < 10000) {
                let descuentoTotal = descuento(importe, 0.05);
                importeTotal = importe - descuentoTotal;
                alert(`El importe a pagar es: ${importeTotal}`);
            } else if (importe >= 10000 && importe < 20000) {
                let descuentoTotal = descuento(importe, 0.1);
                importeTotal = importe - descuentoTotal;
                alert(`El importe a pagar es: ${importeTotal}`);
            } else {
                let descuentoTotal = descuento(importe, 0.15);
                importeTotal = importe - descuentoTotal;
                alert(`El importe a pagar es: ${importeTotal}`);
            }
            break;
        case 2:
            let cuotas = prompt("Ingrese cantidad de cuotas: 3 o 6");
            if (cuotas === "3") {
                importeTotal = interesCuotas(3, importe);
                alert(`El importe a pagar es: ${importeTotal}`);
            } else if (cuotas === "6") {
                importeTotal = interesCuotas(6, importe);
                alert(`El importe a pagar es: ${importeTotal}`);
            } else {
                alert("Cantidad de cuotas incorrecta");
            }
            break;
        default:
            alert("Ingreso un número incorrecto");
            break;
    }

    importe = prompt("Ingrese importe de venta");
   
}
alert("adios")