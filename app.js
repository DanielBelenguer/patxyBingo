// Traemos del DOM
const $numBola = document.getElementById("numBola");
const $btnSacarBola = document.getElementById("btnSacarBola");
const $listaNumeros = document.getElementById("listaNumeros");
const $carton = document.getElementById("carton");

// Variables Generales
let registroBolas = [];

function sacarBola() {
    // Comprueba si se han sacado todas las bolas
    if (registroBolas.length >= 90) {
        alert("¡Ya no quedan más bolas!");
    }

    let bola;

    do {
        bola = Math.floor(Math.random() * 90) + 1;
    } while (registroBolas.includes(bola));

    registroBolas.push(bola);

    return bola;
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
    registroBolas.forEach((bola) => {
        const span = document.getElementById(`bola-${bola}`);
        if (span) {
            span.style.color = "#39FF14"; // Color verde fosforito
        }
    });

}

function crearCarton(num) {
    let cartonesEnJuego = [];

    for (let index = 0; index < num; index++) {
        // Generamos un bucle para crear la cantidad de cartones
        let tabla = document.createElement("table"); // Creamos el elemento tabla para html
        tabla.setAttribute("border", "1px");
        tabla.classList.add("carton");

        let carton = [];
        let numerosUsados = new Set();

        for (var cantFilas = 0; cantFilas < 3; cantFilas++) {
            // Generamos 3 filas para nuestra tabla
            let fila = document.createElement("tr");

            let filaCarton = [];

            for (var cantColumnas = 0; cantColumnas < 9; cantColumnas++) {
                // Generamos 9 columnas para nuestra tabla
                let columna = document.createElement("td");
                let aleatorio;

                switch (cantColumnas) {
                    case 0:
                        aleatorio = generarNumeroUnico(1, 10, numerosUsados);
                        break;
                    case 1:
                        aleatorio = generarNumeroUnico(11, 20, numerosUsados);
                        break;
                    case 2:
                        aleatorio = generarNumeroUnico(21, 30, numerosUsados);
                        break;
                    case 3:
                        aleatorio = generarNumeroUnico(31, 40, numerosUsados);
                        break;
                    case 4:
                        aleatorio = generarNumeroUnico(41, 50, numerosUsados);
                        break;
                    case 5:
                        aleatorio = generarNumeroUnico(51, 60, numerosUsados);
                        break;
                    case 6:
                        aleatorio = generarNumeroUnico(61, 70, numerosUsados);
                        break;
                    case 7:
                        aleatorio = generarNumeroUnico(71, 80, numerosUsados);
                        break;
                    case 8:
                        aleatorio = generarNumeroUnico(81, 90, numerosUsados);
                        break;
                }

                columna.textContent = aleatorio;
                filaCarton.push(aleatorio);
                fila.appendChild(columna); // Agrega el elemento celda a la fila
            }

            carton.push(filaCarton);
            tabla.appendChild(fila); // Agrega la fila a la tabla
        }

        cartonesEnJuego.push(carton);
        $carton.appendChild(tabla); // Agrega la tabla al body
    }

    // Ordenar las columnas de los cartones
    for (let i = 0; i < cartonesEnJuego.length; i++) {
        ordenaColumnas(
            cartonesEnJuego[i],
            document.getElementsByTagName("table")[i]
        );
    }

    // Generar los espacios en blanco
    generarEspaciosBlanco(cartonesEnJuego);

    return cartonesEnJuego;
}

function ordenaColumnas(carton, tabla) {
    let columnas = carton[0].length; // Siempre 9 columnas
    let filas = carton.length; // Siempre 3 filas

    for (let columna = 0; columna < columnas; columna++) {
        let columnaValores = [];
        for (let fila = 0; fila < filas; fila++) {
            if (carton[fila][columna] !== " ") {
                // Ignoramos los espacios
                columnaValores.push(carton[fila][columna]);
            }
        }

        columnaValores.sort((a, b) => a - b); // Orden ascendente

        // Reinsertamos los valores en el cartón y actualizamos la tabla HTML
        let valorIndex = 0;
        for (let fila = 0; fila < filas; fila++) {
            if (carton[fila][columna] !== " ") {
                carton[fila][columna] = columnaValores[valorIndex];
                tabla.rows[fila].cells[columna].textContent =
                    columnaValores[valorIndex];
                valorIndex++;
            }
        }
    }
} 

function generarNumeroUnico(min, max, numerosUsados) {
    let numero;
    do {
        numero = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (numerosUsados.has(numero));
    numerosUsados.add(numero);
    return numero;
} 

function generarEspaciosBlanco(cartonesEnJuego) {
    cartonesEnJuego.forEach((carton, cartonIndex) => {
        let tabla = document.getElementsByTagName("table")[cartonIndex];

        // Array para llevar el conteo de espacios en blanco por columna
        let espaciosPorColumna = new Array(9).fill(0);

        for (let fila = 0; fila < 3; fila++) {
            let espaciosEnFila = 0;
            let columnasDisponibles = [...Array(9).keys()];

            while (espaciosEnFila < 4) {
                // Filtrar columnas que ya tienen 2 espacios en blanco
                let columnasValidas = columnasDisponibles.filter(
                    (col) => espaciosPorColumna[col] < 2
                );

                if (columnasValidas.length === 0) break; // Evitar bucle infinito

                let indiceAleatorio = Math.floor(
                    Math.random() * columnasValidas.length
                );
                let columnaElegida = columnasValidas[indiceAleatorio];

                if (carton[fila][columnaElegida] !== " ") {
                    carton[fila][columnaElegida] = " ";
                    tabla.rows[fila].cells[columnaElegida].textContent = " ";
                    espaciosEnFila++;
                    espaciosPorColumna[columnaElegida]++;
                    columnasDisponibles = columnasDisponibles.filter(
                        (col) => col !== columnaElegida
                    );
                }
            }
        }

        // Asegurar que no haya columnas completamente vacías
        for (let columna = 0; columna < 9; columna++) {
            if (espaciosPorColumna[columna] === 3) {
                let filaAleatoria = Math.floor(Math.random() * 3);
                carton[filaAleatoria][columna] = "X"; // Marcador temporal
                tabla.rows[filaAleatoria].cells[columna].textContent = "X";
            }
        }

        // Reemplazar marcadores temporales con números válidos
        for (let fila = 0; fila < 3; fila++) {
            for (let columna = 0; columna < 9; columna++) {
                if (carton[fila][columna] === "X") {
                    let min = columna * 10 + 1;
                    let max = columna === 8 ? 90 : (columna + 1) * 10;
                    let numero = Math.floor(Math.random() * (max - min + 1)) + min;
                    carton[fila][columna] = numero;
                    tabla.rows[fila].cells[columna].textContent = numero;
                }
            }
        }
    });
}

function checkNum(numeroSacado) {
    const cartones = document.querySelectorAll("table");

    cartones.forEach((carton) => {
    const filas = carton.rows;
    for (let i = 0; i < filas.length; i++) {
    for (let j = 0; j < filas[i].cells.length; j++) {
        const celda = filas[i].cells[j];
        if (celda.textContent === numeroSacado) {
            celda.style.backgroundColor = "lightgreen"; // Color de fondo verde claro
            celda.style.color = "white"; // Color de texto blanco para mejor contraste
        }
    }
    }
});
}

// EMPEZAMOS EL JUEGO

    let cantidadCartones = parseInt(prompt("¿Cuantos cartones quieres jugar(MAX. 50)?"));
    
    if (cantidadCartones <= 50) {
        crearCarton(cantidadCartones);
    } else {
        alert("El número de cartones no puede ser mayor a 50");
    }

    plantillaRegistroBolas();
    
    $btnSacarBola.addEventListener("click", () => {
        $numBola.textContent = sacarBola();
        actualizarListaNumeros();
        checkNum($numBola.textContent);
        if (verificarLinea()) {
            alert("¡Línea! ");
        }
        if (verificarBingo()) {
            alert("¡Bingo! ");
        }
    });