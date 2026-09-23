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
        gameBoard.resetBoard();
    }

    function playRound(index){
        
        if(gameOver){
            return {status: "gameOver"};
        }

        const marcoValido = gameBoard.marcarCasilla(index, currentPlayer.marca);
        if(!marcoValido){
            return {status: "invalido"};
        }

        const ganador = gameBoard.revisaGanador();
        if(ganador){
            gameOver = true;
            return { status: "ganador", nombre: currentPlayer.nombre};
        }

        const hayEmpate = gameBoard.empate();
        if(hayEmpate){
            gameOver= true;
            return{ status: "empate"};
        }

       if(currentPlayer === player1){
        currentPlayer = player2;
       } else{
        currentPlayer = player1;
       }
       
       return{ status: "turno", nombre: currentPlayer.nombre, marca: currentPlayer.marca };
    }
    return {
        startGame,
        playRound
    };
})();


const displayController = (()=> {
    const container = document.getElementById("gameboard");
    const setupScreen = document.getElementById("setup-screen");
    const gameContainer = document.getElementById("game-container");
    const resultMessage = document.getElementById("result-message");
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const input1 = document.getElementById("player1-name");
    const input2 = document.getElementById("player2-name");
    
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

    startBtn.addEventListener("click", ()=> {
        const nombre1 = input1.value || "Jugador 1";
        const nombre2 = input2.value || "Jugador 2";

        controlMaestro.startGame(nombre1, nombre2);

        setupScreen.style.display = "none";
        gameContainer.style.display = "block";
        resultMessage.textContent = "";

        render();
    });

    restartBtn.addEventListener("click", ()=> {
        setupScreen.style.display = "block";
        gameContainer.style.display = "none";
        input1.value = "";
        input2.value = "";
    });


    return {
        render
    };
})();


displayController.render();
