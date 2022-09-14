//pelo fato do nosso javascrip ser invocado no inicio do html, ele é lido antes mesmo do próprio código. Por isso, preciso invocar a função abaixo

window.addEventListener('DOMContentLoaded', () =>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

//agora as variáveis
    let board= [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    let currentPlayer = 'X';
    let isGameActive = true;

//as constantes
    const PLAYERX_WON="PLAYERX_WON";
    const PLAYERO_WON="PLAYERO_WON";
    const TIE="TIE";

    /* esse é um mapa da "posições" de cada ladrilho
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    */

//essas são as condições necessárias para se ter um vencedor
    const winningConditions = [
        [0,1,2],  //primeira linha completa
        [3,4,5],  //segunda linha completa
        [6,7,8], 
        [0,3,6],   //primeira coluna completa
        [1,4,7],
        [2,5,8], //primeira diagonal completa
        [0,4,8],
        [2,4,6]
    ];

//função que confere se temos um vencedor
    function handleResultValidation(){
        let roundWon = false;
        for (let i=0; i <= 7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if(a === ' ' || b === ' ' || c === ' '){
                continue;
            }
            if(a===b && b===c){
                roundWon = true;
                break;
            }
        }

    if(roundWon){
        announce(currentPlayer==='X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
         }

    if(!board.includes(''))
    announce(TIE);
     }


//função que anuncia os resultados do jogo
    const announce = (type) =>{
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = 'Tie';
                break;
        }
        announcer.classList.remove('hide');
    };

//garantir que o ladrilho só seja usado se estiver vazio
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

const updateBoard = (index) => {
    board[index] = currentPlayer;
}

//função que muda a vez do jogador
    const changePlayer = () =>{
        playerDisplay.classList.remove('player${currentPlayer}'); //remove a classe do jogador
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //se for x muda pra o se for o muda pra x
        playerDisplay.innerText = currentPlayer; //a variável assume o novo valor e símbolo
        playerDisplay.classList.add('player${currentPlayer}');

    }

//agora precisamos registar a jogada do jogador
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) { //primeiro precisamos verificar se é uma jogada válida
            tile.innerText = currentPlayer;  //se o jogo está ativo, indicamos través da vez do jogador com o símbolo que vai ser mostrado
            tile.classList.add('player${currentPlayer}'); //dependendo do valor do currentPlayer o sinal vai ser X ou O
            updateBoard(index); //atualizar o placar
            handleResultValidation(); //confere se já temos um vencedor
            changePlayer(); //troca o jogador (símbolo)
        }
    }

//reiniciar o jogo
    const resetBoard = () =>{
        board= ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');

        if(currentPlayer ==='O'){
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText ='';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

//agora precisamos começar a registrar os eventos dos cliques
    tiles.forEach((tile,index) =>{
        tile.addEventListener('click',() => userAction(tile,index)); //ele registra o click do jogador e registra o index do ladrilho clicado
    });


    resetButton.addEventListener('click', resetBoard);
});