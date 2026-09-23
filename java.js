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

function resetBoard(){
    tablero = ["", "", "", "", "", "", "", "", ""];
}

    return {
        marcarCasilla, 
        revisaGanador, 
        empate,
        resetBoard,
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
    let player1;
    let player2;
    let currentPlayer = player1;
    let gameOver = false;


    function startGame(nombre1, nombre2){
        player1 = crearPlayer(nombre1, "X");
        player2 = crearPlayer(nombre2, "O");
        currentPlayer = player1;
        gameOver = false;
    }

    function playRound(index){
        
        if(gameOver){
            console.log("El juego ya termino. Reinicia el juego");
            return;
        }

        const marcoValido = gameBoard.marcarCasilla(index, currentPlayer.marca);
        if(!marcoValido){
            console.log("Esta casilla ya esta ocupada!! intenta otra.");
            return;
        }

        const ganador = gameBoard.revisaGanador();

        if(ganador){
            console.log(`${currentPlayer.nombre} gano la partida!!🎉`);
            gameOver = true;
            return;
        }

        const hayEmpate = gameBoard.empate();

        if(hayEmpate){
            console.log("Empate! Nadie gana esta vez.🤝");
            gameOver= true;
            return;
        }

       if(currentPlayer === player1){
        currentPlayer = player2;
       } else{
        currentPlayer = player1;
       }
       console.log(`Turno de ${currentPlayer.nombre} (${currentPlayer.marca})`);
    }
    return {
        startGame,
        playRound
    };
})();


const displayController = (()=> {


    const container = document.getElementById("gameboard");
    
    function render(){
        container.innerHTML = "";

        const tableroActual = gameBoard.getTablero();

        tableroActual.forEach((valor,index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = valor;
            cell.dataset.index = index;

            cell.addEventListener("click", ()=> {
                controlMaestro.playRound(index);
                render();
        });

            container.appendChild(cell);
        });
    }
    return {
        render
    };
})();


displayController.render();
