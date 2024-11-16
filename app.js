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
    registroBolas.push(bola);
    

    // Devolvemos la bola
    return bola;
}

function actualizarListaNumeros() {
    $listaNumeros.textContent = registroBolas.join(", ");
}

function plantillaRegistroBolas() {
    for (let i = 1; i <= 90; i++) {
        const span = document.createElement("span");
        span.textContent = i;
        span.style.color = "gray"; // Color apagado
        span.id = `bola-${i}`;
        $listaNumeros.appendChild(span);
        $listaNumeros.innerHTML += " "; // Añadir espacio entre números
    }
}

function actualizarListaNumeros() {
    registroBolas.forEach(bola => {
        const span = document.getElementById(`bola-${bola}`);
        if (span) {
            span.style.color = "#39FF14"; // Color verde fosforito
        }
    });
}

// EMPEZAMOS EL JUEGO
plantillaRegistroBolas();

// Llamamos a la función para sacar una bola y actualizamos la lista de números
$btnSacarBola.addEventListener("click", () => {
        $numBola.textContent = sacarBola();
        actualizarListaNumeros();
});


