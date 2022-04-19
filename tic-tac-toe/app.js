const markerSwitchBox = document.querySelector('input[type=checkbox'),
      menuContainer = document.querySelector('.menu-container'),
      menu = document.querySelector('.menu'),
      main = document.querySelector('main'),
      gameDecisionBanner = document.querySelector('.game-decision-section'),
      cpuButton = document.querySelector('.cpu-btn'),
      playerButton = document.querySelector('.player-btn'),
      restartButton = document.createElement('button'),
      restartButtonContainer = document.createElement('div'),
      turnHolderContainer = document.createElement('div'),
      turnHolderText = document.createElement('p'),
      turnHolderLogo = document.createElement('div'),
      gamePlayLogoContainer = document.createElement('div'),
      gamePlaySectionHeader = document.createElement('div'),
      gamePlaySection = document.createElement('section'),
      gameBoardContainer = document.createElement('div'),
      gameBoardSection = document.createElement('div'),
      gameBoardFooter = document.createElement('div'),
      gameBoardFooterOne = document.createElement('div'),
      gameBoardFooterTwo = document.createElement('div'),
      gameBoardFooterThree = document.createElement('div'),
      decisionOutcomeText = document.querySelector('.decision--outcome'),
      decisionMarkerText = document.querySelector('.decision--player'),
      decisionMarkerLogo = document.querySelector('.decision--marker-logo'),
      decisionButtons= document.querySelector('.decision--buttons'),
      quitButton = decisionButtons.childNodes[1],
      nextRoundButton = decisionButtons.childNodes[3],
      cancelButton = decisionButtons.childNodes[5],
      confirmationButton = decisionButtons.childNodes[7];
      


document.onload = 
    gamePlaySection.classList.add('hidden'),
    gamePlaySection.classList.add('gameplay-section'),
    restartButtonContainer.classList.add('restart-btn-container'),
    restartButton.classList.add('restart-btn'),
    gameBoardContainer.classList.add('game-board-container'),
    gameBoardSection.classList.add('game-board-section'),
    gamePlaySectionHeader.classList.add('gameplay-section-header'),
    gamePlayLogoContainer.classList.add('gameplay-section-logo-container'),
    gamePlayLogoContainer.innerHTML = `<img src='main/assets/logo.svg'>`,
    gameBoardFooter.classList.add('gameboard-footer-container'),
    restartButtonContainer.classList.add('restart-btn-container'),
    restartButton.innerHTML = `<img src=main/assets/icon-restart.svg alt='restart-logo'>`,
    turnHolderContainer.classList.add('turnholder-container'),
    turnHolderText.classList.add('turnholder-text'),
    turnHolderLogo.classList.add('turnholder-logo'),
    turnHolderText.textContent = 'TURN',
    main.append(gamePlaySection),
    restartButtonContainer.append(restartButton),
    turnHolderContainer.append(turnHolderLogo, turnHolderText),
    gamePlaySectionHeader.append(gamePlayLogoContainer, turnHolderContainer, restartButtonContainer),
    gamePlaySection.append(gamePlaySectionHeader, gameBoardContainer),
    gameBoardFooter.append(gameBoardFooterOne, gameBoardFooterTwo, gameBoardFooterThree),
    gameBoardContainer.append(gameBoardSection,gameBoardFooter);

    gameBoardFooterItems = [gameBoardFooterOne, gameBoardFooterTwo, gameBoardFooterThree];

        gameBoardFooterItems.forEach( item => {
            let paraContainer = document.createElement('div'),
                p1 = document.createElement('p'),  
                p2 = document.createElement('p');
            
            paraContainer.classList.add('footer-item-p-container');
            item.classList.add('footer-item-container');
            p1.classList.add('footer-item-p1');
            p2.classList.add('footer-item-p2');

            paraContainer.append(p1,p2);
            item.append(paraContainer);
        });

        let footerItemOne = gameBoardFooterOne.childNodes[0],
            footerItemTwo = gameBoardFooterTwo.childNodes[0],
            footerItemThree = gameBoardFooterThree.childNodes[0];

        let itemOneParaOne = footerItemOne.childNodes[0],
            itemOneParaTwo = footerItemOne.childNodes[1],
            
            itemTwoParaOne = footerItemTwo.childNodes[0],
            itemTwoParaTwo = footerItemTwo.childNodes[1],
            
            itemThreeParaOne = footerItemThree.childNodes[0],
            itemThreeParaTwo = footerItemThree.childNodes[1];

        footerItemOne.classList.add('x-score-container');
        footerItemTwo.classList.add('tie-score-container');
        footerItemThree.classList.add('o-score-container');

        itemOneParaOne.classList.add('one-header', 'p-header')
        itemOneParaTwo.classList.add('one-score', 'p-score')

        itemTwoParaOne.classList.add('two-header', 'p-header')
        itemTwoParaTwo.classList.add('two-score', 'p-score')

        itemThreeParaOne.classList.add('three-header','p-header')
        itemThreeParaTwo.classList.add('three-score','p-score');
        itemTwoParaOne.textContent = 'TIES';

class Player {

    constructor(number, marker, type){
            this.number = number
            this.marker = null
            this.type = type
        }
        
        chooseMarker(){
            markerSwitchBox.checked ? this.marker = 'O' : this.marker = 'X'
        }
        
        placeMarker(){
            let x = "<img src='main/assets/icon-x.svg'>", 
                o = "<img src='main/assets/icon-o.svg'>";
                    
            if(this.type == 'human') return this.marker == 'X' ? x : o;
            if(this.type == 'cpu') return this.marker == 'X' ? x : o;
        }
};

(
    function(){
        'use strict';
        //instances of player class
        let player1 = new Player(1, null,'human'),
            player2 = new Player(2, null, null);
        
        let game = {
            board: [],
            x_moves: 5,
            o_moves : 4,
            turn: 0,
            currentTurn : ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X',]
        }
        
        cpuButton.addEventListener('click', () => {
            player1.chooseMarker();
            player2.type = 'cpu';
            player1.marker == 'X' ? player2.marker = 'O' : player2.marker = 'X';
            menuContainer.classList.add('hidden');
            menu.classList.add('hidden');
            restartButton.classList.remove('hidden');
            gamePlaySection.classList.remove('hidden');
            createBoard();
        });
        
        const pvcStorage = () => {
            if(!localStorage.getItem('cpuScore')){
                if(player2.marker == 'X'){
                    itemOneParaOne.textContent = 'X (CPU)'
                    itemOneParaTwo.textContent = localStorage.setItem('cpuScore', 0);
                }
                if(player2.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (CPU)'
                    itemThreeParaTwo.textContent = localStorage.setItem('cpuScore', 0);
                }
            }else{
                if(player2.marker == 'X'){
                    itemOneParaOne.textContent = 'X (CPU)';
                    itemOneParaTwo.textContent = localStorage.getItem('cpuScore');
                }
                if(player2.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (CPU)';
                    itemThreeParaTwo.textContent = localStorage.getItem('cpuScore');
                }
            }
            if(!localStorage.getItem('cpuTies')){
                itemTwoParaTwo.textContent = localStorage.setItem('cpuTies', 0);
            }
            else{
                itemTwoParaTwo.textContent = localStorage.getItem('cpuTies')
            }
            
            if(!localStorage.getItem('player1Score')){
                if(player1.marker == 'X'){
                    itemOneParaOne.textContent = 'X (YOU)';
                    itemOneParaTwo.textContent = localStorage.setItem('player1Score',0);
                }

                if(player1.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (YOU)';
                    itemThreeParaTwo.textContent = localStorage.setItem('player1Score', 0);
                }

            }
            else{
                if(player1.marker == 'X'){
                    itemOneParaOne.textContent = 'X (YOU)';
                    itemOneParaTwo.textContent = localStorage.getItem('player1Score');
                }
                if(player1.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (YOU)';
                    itemThreeParaTwo.textContent = localStorage.getItem('player1Score');
                }
            }
        }

        playerButton.addEventListener('click', () => {
            player1.chooseMarker();
            player2.type = 'human';
            player1.marker == 'X' ? player2.marker = 'O' : player2.marker = 'X';
            menuContainer.classList.add('hidden');
            menu.classList.add('hidden');
            gamePlaySection.classList.remove('hidden');
            createBoard();
        })

        const pvpStorage = () => {
            if(!localStorage.getItem('player2Score')){
                if(player2.marker == 'X'){
                    itemOneParaOne.textContent = 'X (P2)'
                    itemOneParaTwo.textContent = localStorage.setItem('player2Score', 0);
                }
                if(player2.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (P2)'
                    itemThreeParaTwo.textContent = localStorage.setItem('player2Score', 0);
                }
            }else{
                if(player2.marker == 'X'){
                    itemOneParaOne.textContent = 'X (P2)';
                    itemOneParaTwo.textContent = localStorage.getItem('player2Score');
                }
                if(player2.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (P2)';
                    itemThreeParaTwo.textContent = localStorage.getItem('player2Score');
                }
            }
            if(!localStorage.getItem('playerTies')){
                itemTwoParaTwo.textContent = localStorage.setItem('playerTies', 0);
            }
            else{
                itemTwoParaTwo.textContent = localStorage.getItem('playerTies')
            }
            
            if(!localStorage.getItem('player1Score')){
                if(player1.marker == 'X'){
                    itemOneParaOne.textContent = 'X (P1)';
                    itemOneParaTwo.textContent = localStorage.setItem('player1Score',0);
                }

                if(player1.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (P1)';
                    itemThreeParaTwo.textContent = localStorage.setItem('player1Score', 0);
                }
            }
            else{
                if(player1.marker == 'X'){
                    itemOneParaOne.textContent = 'X (P1)';
                    itemOneParaTwo.textContent = localStorage.getItem('player1Score');
                }
                if(player1.marker == 'O'){
                    itemThreeParaOne.textContent = 'O (P1)';
                    itemThreeParaTwo.textContent = localStorage.getItem('player1Score');
                }
            }
        }
        
        restartButton.addEventListener('click', () => {
            gameDecisionBanner.classList.remove('hidden');
            decisionOutcomeText.textContent = '';
            decisionMarkerLogo.textContent = '';
            decisionMarkerText.textContent = 'RESTART GAME?';
            decisionMarkerText.style.width = 'auto';
            decisionMarkerText.style.color = '#A8BFC9';
            cancelButton.classList.remove('hidden');
            confirmationButton.classList.remove('hidden');
            quitButton.classList.add('hidden');
            nextRoundButton.classList.add('hidden');
        });

        cancelButton.addEventListener('click', e => {
            gameDecisionBanner.classList.add('hidden');
        })

        confirmationButton.addEventListener('click', e => {
            wipeBoard();
            createBoard();
            gameDecisionBanner.classList.add('hidden');
        })


        const createBoard = () => {
            turnHolderLogo.innerHTML = `<img src='main/assets/turnholder-x-logo.svg'>`;

            for(let i = 1; i <= 9; i++){
                game.board[i] = document.createElement('div');
                game.board[i].classList.add('board-tile');
                gameBoardSection.append(game.board[i]);
                playerMove(i);
            }
            if(player2.type == 'cpu'){
                pvcStorage();
                if(player2.marker == 'X'){
                    if(turnHolderLogo.innerHTML == `<img src="main/assets/turnholder-x-logo.svg">`){
                        cpuMove();
                        turnHolderLogo.innerHTML = `<img src='main/assets/turnholder-o-logo.svg'>`;
                    }
                }
            }
            if(player2.type == 'human')pvpStorage();
        }
        
        const wipeBoard = () => {
            for(let i = 1; i <= 9; i++){
                game.board[i].remove();
            }
            game.x_moves = 5;
            game.o_moves = 4;
            game.turn = 0;
            game.currentTurn = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X',];
        }
 
        const gameTurn = event => {
            if(player1.marker == game.currentTurn[0]){
                event.target.innerHTML = player1.placeMarker()
                player2.marker == 'O' ? turnHolderLogo.innerHTML = turnHolderLogo.innerHTML = `<img src='main/assets/turnholder-o-logo.svg'>` : turnHolderLogo.innerHTML = turnHolderLogo.innerHTML = `<img src='main/assets/turnholder-x-logo.svg'>`;
                displayGameDecision(player2.type);
            }
            if(player2.marker == game.currentTurn[0] && player2.type == 'human'){
                event.target.innerHTML = player2.placeMarker()
                player1.marker == 'X' ? turnHolderLogo.innerHTMl = turnHolderLogo.innerHTML = `<img src='main/assets/turnholder-x-logo.svg'>` : turnHolderLogo.innerHTML = turnHolderLogo.innerHTML = `<img src='main/assets/turnholder-o-logo.svg'>`;
                displayGameDecision(player2.type);
            }
        }
        const playerMove = num => {
            game.board[num].addEventListener('click', e => {
                if((player1.type && player2.type) == 'human'){
                    if(e.target.innerHTML == ''){
                        gameTurn(e)
                        game.currentTurn.splice(0,1);
                        game.turn++;
                    }
                }

                if( (player2.type == 'cpu') ) {
                    if(e.target.innerHTML == '') {
                        gameTurn(e)
                        game.currentTurn.splice(0,1);
                        game.turn++;
                        e.target.removeEventListener('click', e);
                    }   
                    setTimeout( () => cpuMove(), 750 );   
                }
            }, {once: true});
        }
  
        const cpuMove = () => {
            let availableSquares = moveChecker().availableSquares,
                updatedGameBoard = moveChecker().gameBoardCopy,
                randomNum = () => Math.floor(Math.random() * (availableSquares - 1 ) + 1),
                choice = randomNum();
            if(availableSquares == 1) {
                updatedGameBoard[0].innerHTML = player2.placeMarker();
                game.turn++;
                displayGameDecision(player2.type);
            }
            if(updatedGameBoard[choice].innerHTML == '') {
                if(player2.marker == game.currentTurn[0]){
                    updatedGameBoard[choice].innerHTML = player2.placeMarker();
                    game.turn++;
                }
            }
            game.currentTurn.splice(0,1);
            displayGameDecision(player2.type);
        }
        
        const moveChecker = () => {
            let availableSquares = 0,
                gameBoardCopy = [];
            for(let i = 1; i <= 9; i++){
                if(game.board[i].innerHTML == ''){     
                    gameBoardCopy.push(game.board[i]);
                    availableSquares++;
                }
                let decision = checkWinner();
                if(decision == 'O' || decision == 'X') return availableSquares = 0;
            }
            displayGameDecision(player2.type);
            return {availableSquares, gameBoardCopy}
        }
        const checkWinner = () => {
            let x = '<img src="main/assets/icon-x.svg">', 
                o = '<img src="main/assets/icon-o.svg">',
                winner = null;
            
            if( game.board[1].innerHTML == x && game.board[2].innerHTML == x && game.board[3].innerHTML == x ) winner = 'X';
            if( game.board[1].innerHTML == x && game.board[4].innerHTML == x && game.board[7].innerHTML == x ) winner = 'X';
            if( game.board[1].innerHTML == x && game.board[5].innerHTML == x && game.board[9].innerHTML == x ) winner = 'X';
            if( game.board[2].innerHTML == x && game.board[5].innerHTML == x && game.board[8].innerHTML == x ) winner = 'X';
            if( game.board[3].innerHTML == x && game.board[6].innerHTML == x && game.board[9].innerHTML == x ) winner = 'X';
            if( game.board[3].innerHTML == x && game.board[5].innerHTML == x && game.board[7].innerHTML == x ) winner = 'X';
            if( game.board[4].innerHTML == x && game.board[5].innerHTML == x && game.board[6].innerHTML == x ) winner = 'X';
            if( game.board[7].innerHTML == x && game.board[8].innerHTML == x && game.board[9].innerHTML == x ) winner = 'X';
            
            if( game.board[1].innerHTML == o && game.board[2].innerHTML == o && game.board[3].innerHTML == o ) winner = 'O';
            if( game.board[1].innerHTML == o && game.board[4].innerHTML == o && game.board[7].innerHTML == o ) winner = 'O';
            if( game.board[1].innerHTML == o && game.board[5].innerHTML == o && game.board[9].innerHTML == o ) winner = 'O';
            if( game.board[2].innerHTML == o && game.board[5].innerHTML == o && game.board[8].innerHTML == o ) winner = 'O';
            if( game.board[3].innerHTML == o && game.board[6].innerHTML == o && game.board[9].innerHTML == o ) winner = 'O';            
            if( game.board[3].innerHTML == o && game.board[5].innerHTML == o && game.board[7].innerHTML == o ) winner = 'O';
            if( game.board[4].innerHTML == o && game.board[5].innerHTML == o && game.board[6].innerHTML == o ) winner = 'O';
            if( game.board[7].innerHTML == o && game.board[8].innerHTML == o && game.board[9].innerHTML == o ) winner = 'O';

            if(game.turn == 9 && winner == null) return 'TIE';

            return winner;
        };
        
        const displayGameDecision = playerTwoType => {
            const chooseWinningDisplay = (playerTwo, decision)  => {
                if((playerTwo == 'cpu' || playerTwo == 'human') && decision == 'TIE'){
                        decisionOutcomeText.textContent = '';
                        decisionMarkerLogo.innerHTML = '';
                        decisionMarkerText.textContent = 'ROUND TIED';
                        decisionMarkerText.style.width= 'auto';
                        decisionMarkerText.style.color = '#A8BFC9';
                }
                if(playerTwo == 'cpu'){
                    if(player1.marker == 'X' && player2.marker == 'O'){
                        if(decision == 'X') {
                            decisionOutcomeText.textContent = 'YOU WON!';
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-x.svg">`;
                            decisionMarkerText.innerHTML = decisionMarkerLogo.innerHTML + 'TAKES THE ROUND';
                            decisionMarkerText.style.color = '#31C3BD';
                        }
                        if(decision == 'O'){
                            decisionOutcomeText.textContent = 'OH NO, YOU LOST...';
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-o.svg">`;
                            decisionMarkerText.innerHTML = decisionMarkerLogo.innerHTML + 'TAKES THE ROUND';
                        }

                    }

                    if(player1.marker == 'O' && player2.marker == 'X'){
                        if(decision == 'X') {
                            decisionOutcomeText.textContent = 'OH NO, YOU LOST...';
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-x.svg">`;
                            decisionMarkerText.style.color = '#31C3BD';
                        }
                        if(decision == 'O'){
                            decisionOutcomeText.textContent = 'YOU WON!';
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-o.svg">`;
                            decisionMarkerText.style.color = '#F2B137';
                        }
                    }
                }

                if(playerTwo == 'human'){
                    if(player1.marker == 'X'){
                        if(decision == 'X'){
                            decisionOutcomeText.textContent = 'PLAYER 1 WINS!'
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-x.svg">`;
                            decisionMarkerText.style.color = '#31C3BD';
                        }
                        if(decision == 'O'){
                            decisionOutcomeText.textContent = 'PLAYER 2 WINS!'
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-o.svg">`
                        }
                    }

                    if(player2.marker == 'X'){
                        if(decision == 'X'){
                            decisionOutcomeText.textContent = 'PLAYER 2 WINS!'
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-x.svg">`;
                            decisionMarkerText.style.color = '#31C3BD';
                        }
                        if(decision == 'O'){
                            decisionOutcomeText.textContent = 'PLAYER 1 WINS!'
                            decisionMarkerLogo.innerHTML = `<img src="main/assets/icon-o.svg">`;
                        }
                    }
                }
            }

            const displayGameOverButtons = () => {
                quitButton.classList.remove('hidden');
                nextRoundButton.classList.remove('hidden');
                cancelButton.classList.add('hidden')
                confirmationButton.classList.add('hidden');
            }

            let decision = checkWinner();
            switch (decision) {
               
                case null:
                    break;
                case 'O':
                    chooseWinningDisplay(playerTwoType, decision);
                    gameDecisionBanner.classList.remove('hidden');
                    displayGameOverButtons()
                    break;
                case 'X':
                    
                    
                    chooseWinningDisplay(playerTwoType, decision);
                    gameDecisionBanner.classList.remove('hidden');
                    displayGameOverButtons()
                    break;
                case 'TIE':
                    chooseWinningDisplay(playerTwoType, decision);
                    gameDecisionBanner.classList.remove('hidden');
                    displayGameOverButtons()
                    break;
            }
        };
        
        const incrementScores = playerTwo => {
            let decision = checkWinner(),
                player1Score = (parseInt(localStorage.getItem('player1Score')) +1),
                cpuScore = (parseInt(localStorage.getItem('cpuScore')) +1),
                player2Score = (parseInt(localStorage.getItem('player2Score')) +1),
                cpuTieScore = (parseInt(localStorage.getItem('cpuTies')) +1),
                playerTieScore = (parseInt(localStorage.getItem('playerTies')) +1);

            if( (playerTwo == 'cpu' || playerTwo == 'human') && decision == 'TIE') playerTwo == 'cpu' ? localStorage.setItem('cpuTies', +cpuTieScore) : localStorage.setItem('playerTies', +playerTieScore);
            
            if(playerTwo == 'cpu'){
                if(player1.marker == 'X' && player2.marker == 'O') decision == 'X' ? localStorage.setItem('player1Score', +player1Score) : localStorage.setItem('cpuScore', +cpuScore);
                if(player1.marker == 'O' && player2.marker == 'X') decision == 'X' ? localStorage.setItem('cpuScore', +cpuScore) : localStorage.setItem('player1Score', +player1Score);
            }

            if(playerTwo == 'human'){
                if(player1.marker == 'X') decision == 'X' ? localStorage.setItem('player1Score', +player1Score) : localStorage.setItem('player2Score', +player2Score)
                if(player2.marker == 'X') decision == 'X' ? localStorage.setItem('player2Score', +player2Score) : localStorage.setItem('player1Score', +player1Score)
            }
        }
        quitButton.addEventListener('click', e => {
            menuContainer.classList.remove('hidden');
            gamePlaySection.classList.add('hidden');
            gameDecisionBanner.classList.add('hidden');
            wipeBoard();
        })  
        
        nextRoundButton.addEventListener('click', e => {
            incrementScores(player2.type);
            wipeBoard();
            createBoard();
            gameDecisionBanner.classList.add('hidden');
        });
    }
    ()
)
