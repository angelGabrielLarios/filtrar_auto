/* variables */

/* objeto para sincronizar la respuesta */
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

/* seleccionar los select del formulario */
const marca = document.getElementById('marca')
const year = document.getElementById('year')
const minimo = document.getElementById('minimo')
const maximo = document.getElementById('maximo')
const puertas = document.getElementById('puertas')
const transmision = document.getElementById('transmision')
const color = document.getElementById('color')
/* 
variable "resultado", aqui se incrustan parrafos sobre info de los autos
*/
const resultado = document.getElementById('resultado')
/* año actual */
const maxYear = new Date().getFullYear()
/* año minimo */
const minYear = maxYear - 12


/* funciones */
/* funcion para  eliminar el contenido html*/
const limpiarHTML = referenciaHTML => {
    [...referenciaHTML.children].forEach(elementoHTML => elementoHTML.remove())
}
/* funcion para mostrar los autos del arreglo en html */
const mostrarAutos = arrAutos => {
    limpiarHTML(resultado)
    arrAutos.forEach(auto => {
        /*
        realizar un destructuring del objeto auto
        */
        const { marca, year, precio, puertas, transmision, color } = auto
        const autoParrafoInfo = 
        `
        <p class="p-3 border-bottom mb-0 fs-5">
            ${marca} - ${year} - ${puertas} puertas - transmisión: ${transmision} - precio: ${precio} - color: ${color}
        </p>
        `
        resultado.insertAdjacentHTML('beforeend', autoParrafoInfo)

    })
}

/* funcion para llenar dinamicamente las opciones del select year */
const llenarSelectYear = () => {
    for (let i = maxYear; i >= minYear; i--) {
        year.insertAdjacentHTML('beforeend',
            `
            <option value = "${i}">${i}</option>
        `)
    }
}
/* funcion para mostrar una alerta si, el arreglo tiene 0 elementos */
const mostrarError = texto => {
    limpiarHTML(resultado)
    const alerta = `
    <div class="error fs-5 text-white py-2">
        ${texto}
    </div
    `
    resultado.insertAdjacentHTML('beforeend', alerta)
}

const filtrarMarca = auto => datosBusqueda.marca ? (auto.marca === datosBusqueda.marca) : auto

const filtrarYear = auto => datosBusqueda.year ? (auto.year === datosBusqueda.year) : auto

const filtrarMinimo = auto => datosBusqueda.minimo ? (auto.minimo >= datosBusqueda.minimo) : auto

const filtrarMaximo = auto => datosBusqueda.maximo ? (auto.maximo >= datosBusqueda.maximo) : auto

const filtrarPuertas = auto => datosBusqueda.puertas ? (auto.puertas === datosBusqueda.puertas) : auto 

const filtrarTransmision = auto => datosBusqueda.transmision ? (auto.transmision === datosBusqueda.transmision) : auto 

const filtrarColor = auto => datosBusqueda.color ? (auto.color === datosBusqueda.color) : auto 

/* funcion quen filtra los autos datos los parametros */
const filtrarAutos = () => {
    const autosFiltrados = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor)
    console.log(autosFiltrados)
    if(autosFiltrados.length === 0) {
        mostrarError(`NO HAY RESULTADOS, INTENTA CON OTROS TERMINOS DE BUSQUEDA`)
        return
    }
    mostrarAutos(autosFiltrados)   
}
/*
esta funcion convierte un string a numero y si no se pueden
devuevel el string normalmente
*/
const esNumero = numeroStr => {
    const parseado = parseFloat(numeroStr)
    return parseado || numeroStr
}
/* event listener */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hola desde app2.js')
    mostrarAutos(autos)
    llenarSelectYear()
})
document.addEventListener('change', event => {
    const select = event.target
    if(select.tagName === `SELECT`) {
        const value = select.value
        datosBusqueda[select.id] = esNumero(value) 
        filtrarAutos()
    }
})
