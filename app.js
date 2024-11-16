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
        throw new Error("Todas las bolas han sido sacadas");
    }

    let bola;
    
    do {
        bola = Math.floor(Math.random() * 90) + 1;
    } while (registroBolas.includes(bola));
    
    registroBolas.push(bola);
    
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

function carton(num){
    var cartonesEnJuego=[];
    for (let index = 0; index < num; index++) { //Generamos un bucle para crear la cantidad de cartones
        var tabla=document.createElement("table"); //Creamos el elemento tabla para html
        tabla.setAttribute("border","1px");
        var carton=[];
        for(var cantFilas=0;cantFilas<3;cantFilas++){ //Generamos 3 filas para nuestra tabla
            var fila=document.createElement("tr");
            filaCarton=[];
            for(var cantColumnas=0;cantColumnas<9;cantColumnas++){ //Generamos 9 columnas para nuestra tabla
                var columna= document.createElement("td");
                var aleatorio= parseInt(Math.random()*90+1);
                switch (cantColumnas) {
                    case 0:
                        var aleatorio = parseInt(Math.random() * 10 + 1); // 1 al 10
                        break;
                    case 1:
                        var aleatorio = parseInt(Math.random() * 10 + 11); // 11 al 20
                        break;
                    case 2:
                        var aleatorio = parseInt(Math.random() * 10 + 21); // 21 al 30
                        break;
                    case 3:
                        var aleatorio = parseInt(Math.random() * 10 + 31); // 31 al 40
                        break;
                    case 4:
                        var aleatorio = parseInt(Math.random() * 10 + 41); // 41 al 50
                        break;
                    case 5:
                        var aleatorio = parseInt(Math.random() * 10 + 51); // 51 al 60
                        break;
                    case 6:
                        var aleatorio = parseInt(Math.random() * 10 + 61); // 61 al 70
                        break;
                    case 7:
                        var aleatorio = parseInt(Math.random() * 10 + 71); // 71 al 80
                        break;
                    case 8:
                        var aleatorio = parseInt(Math.random() * 10 + 81); // 81 al 90
                        break;
                }
                columna.textContent=aleatorio;
                filaCarton.push(aleatorio)
                fila.appendChild(columna); //Agrega el elemento celda a la fila
            }
            carton.push(filaCarton);
            tabla.appendChild(fila); //Agrega la fila a la tabla
        }
        cartonesEnJuego.push(carton);
        $carton.appendChild(tabla); //agrega la tabla al body
    }
    cartonesEnJuego=espaciosFila(cartonesEnJuego);
    /* for (let index = 0; index < cartonesEnJuego.length; index++) {
        for(let j=0;j<cartonesEnJuego[index].length;j++){
            document.write(cartonesEnJuego[index][j]+"<br>");
        }
    }*/
}

function espaciosFila(cartonesEnJuego){
    for (let index = 0; index < cartonesEnJuego.length; index++) {
        for(let j=0;j<cartonesEnJuego[index].length;j++){
            let aleatorio=parseInt(Math.random()*(cartonesEnJuego[index].length-1)+1);
            //document.write(aleatorio+"<br>");
            //document.write(cartonesEnJuego[index][aleatorio]+"<br>");
            cartonesEnJuego[index][aleatorio]="";
        }
    }
    return cartonesEnJuego;
}

// Llamamos a la función para sacar una bola y actualizamos la lista de números


// EMPEZAMOS EL JUEGO
let jugar = confirm("¿Quieres jugar al bingo?");
if (jugar) {
    carton(parseInt(prompt("Dime la cantidad de cartones")));
    plantillaRegistroBolas();

    $btnSacarBola.addEventListener("click", () => {
        $numBola.textContent = sacarBola();
        actualizarListaNumeros();
    });
    
}else{
    alert("Gracias vuelve pronto");
}
