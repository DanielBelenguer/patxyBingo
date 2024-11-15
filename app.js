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
