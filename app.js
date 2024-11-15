// Traemos del DOM
const $numBola = document.getElementById("numBola");
const $btnSacarBola = document.getElementById("btnSacarBola");
const $listaNumeros = document.getElementById("listaNumeros");

// Variables Generales
let registroBolas = [];

function sacarBola() {
    // Comprueba si se han sacado todas las bolas
    if (registroBolas.length >= 90) {
        throw new Error("Todas las bolas han sido sacadas");
    }

    let bola;
    // Sacamos bolas hasta que saquemos una que no haya salido
    do {
        bola = Math.floor(Math.random() * 90) + 1;
    } while (registroBolas.includes(bola));
    
    // Registramos la bola
    registroBolas[bola] = bola;

    // Devolvemos la bola
    return bola;
}

function actualizarListaNumeros() {
    $listaNumeros.textContent = registroBolas.join(", ");
}

// Llamamos a la función para sacar una bola y actualizamos la lista de números
$btnSacarBola.addEventListener("click", () => {
        $numBola.textContent = sacarBola();
        actualizarListaNumeros();
});


