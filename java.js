const gameBoard = (() => {
    let tablero = ["", "", "", "", "", "", "", "", ""];

    function marcarCasilla(index, marker){
    if(tablero[index] !== ""){
        return false;
    }
    tablero[index] = marker;
    return true;
}

function revisaGanador(){
    const combinacionesGanadoras = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6],
    ];
    for(let combo of combinacionesGanadoras){
        const [a,b,c] = combo;
        if(tablero[a] !== "" && tablero[a] === tablero[b] && tablero[a] === tablero[c]){
            return tablero[a]
        }
    }
    return null;
}

function empate(){
    return tablero.every(cell => cell !=="");
}

    return {
        marcarCasilla, 
        revisaGanador, 
        empate,
        getTablero: ()=> [...tablero]

    };
})();


function crearPlayer(nombre, marca){
return{
    nombre,
    marca
}
};

const controlMaestro = (()=> {
    const player1 = crearPlayer("Ana", "X");
    const player2 = crearPlayer("Gustavo", "O");

    let currentPlayer = player1;

    function playRound(index){
        gameBoard.marcarCasilla(index, currentPlayer.marca);
    }
    return {
        playRound
    }
})
