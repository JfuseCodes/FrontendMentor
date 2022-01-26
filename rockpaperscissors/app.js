const scoreNumber = document.querySelector('.score-banner--digit'),
      gameContainer = document.querySelector('.game-container'),
      rulesInfo = document.querySelector('.rules-info--container'),
      rulesButton = document.querySelector('.rules--button'),
      exitButton = document.querySelector('.info-close-button'),
      playAgainButton = document.querySelector('.gameplay--play-again'),
      gameplayContainer = document.querySelector('.gameplay-container'),
      roundDecisionContainer = document.querySelector('.round-outcome--parent');
      roundDecision = document.querySelector('.gameplay--round-outcome'),
      userWinner = document.querySelector('.user--border-win'),
      houseWinner = document.querySelector('.house--border-win');

const gameItems = document.querySelectorAll('.game--item');
const scissors = document.querySelector('.game--item-scissors');
const paper = document.querySelector('.game--item-paper');
const rock = document.querySelector('.game--item-rock');
const lizard = document.querySelector('.game--item-lizard');
const spock = document.querySelector('.game--item-spock');
const pentagon = document.querySelector('.pentagon');


const scissorsChoice = gameContainer.childNodes[3],
      paperChoice = gameContainer.childNodes[5],
      rockChoice = gameContainer.childNodes[7],
      lizardChoice = gameContainer.childNodes[9],
      spockChoice = gameContainer.childNodes[11];

const scissorsImg = scissorsChoice.childNodes[1],
      paperImg = paperChoice.childNodes[1],
      rockImg = rockChoice.childNodes[1],
      lizardImg = lizardChoice.childNodes[1],
      spockImg = spockChoice.childNodes[1];

gameItems.forEach( div => {
  let image = div.childNodes[1];
  image.classList.add('game--item');
});

const appStart = () => {
  rulesInfo.classList.add('is--hidden');
  gameplayContainer.classList.add('is--hidden');
  playAgainButton.classList.add('is--hidden');
  scoreNumber.textContent = localStorage.setItem('score','0');
};

const removeActiveChoice = () => {
  for(let i = 0; i <= gameItems.length - 1; i++){
    gameItems[i].classList.remove('user--choice');
    gameItems[i].childNodes[1].classList.remove('user--choice');
  }
}
const toggleActiveChoice = element => {
  removeActiveChoice();
  if(element.tagName == 'DIV'){
    element.classList.add('user--choice');
    element.childNodes[1].classList.add('user--choice');
  }
  if(element.tagName == 'IMG'){
    element.classList.add('user--choice');
    element.parentElement.classList.add('user--choice');
  }
};

//COMPUTER CHOICE
const removeActiveHouseChoice = () => {
  for(let i = 0; i <= houseSelection.length - 1; i++){
    houseSelection[i].classList.remove('house--choice');
    let houseSelectionImg = houseSelection[i].childNodes[1];
    houseSelectionImg.classList.remove('house--choice');
  }
};
//function for randomization for houses' choice
const randomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
}
const toggleHouseChoice = list => {
  removeActiveHouseChoice();
  let computerChoice = randomNumber(0,5),
      listElement = list[computerChoice],
      listElementImg = listElement.childNodes[1],
      listElementParent = listElement.parentElement;

  listElement.classList.add('house--choice');
  listElementImg.classList.add('house--choice');
  listElementParent.classList.remove('is--hidden');
};

//COMPUTER SELECTIONS
const houseScissors = document.querySelector('.house--item-scissors'),
      housePaper = document.querySelector('.house--item-paper'),
      houseRock = document.querySelector('.house--item-rock'),
      houseLizard = document.querySelector('.house--item-lizard'),
      houseSpock = document.querySelector('.house--item-spock');
//SELECTIONS FOR THE HOUSE
let houseSelection = [ houseScissors, housePaper, houseRock, houseLizard, houseSpock ];

const displayHouseChoice = list => {
  list.forEach( element => {
    if(element.classList.contains('house--choice')){
      element.classList.remove('is--hidden');
    }
  })
}

const houseChoice = () => {
  removeActiveHouseChoice();
  toggleHouseChoice(houseSelection);
  displayHouseChoice(houseSelection);
};

//USER CHOICE
//DISPLAY USER'S CHOICE
const displayUserChoice = list => {
  list.forEach( ele => {
    if(!ele.classList.contains('user--choice')){
      ele.classList.add('is--hidden');
      ele.childNodes[1].classList.add('is--hidden');
      pentagon.classList.add('is--hidden');
      let gameName = ele.classList[1];
      ele.classList.remove(gameName);
      gameplayContainer.classList.remove('is--hidden');
    }
  })
};

let userChoice;
const getUserPick = user => {
  switch (user) {
    case scissors : case scissors.childNodes[1] :
      userPick = 1;  return userPick;
    case paper : case paper.childNodes[1] :
      userPick = 2;
      return userPick;
    case rock : case rock.childNodes[1] :
      userPick = 3;
      return userPick;
    case lizard : case lizard.childNodes[1] :
      userPick = 4;
      return userPick;
    case spock : case spock.childNodes[1] :
      userPick = 5;
      return userPick;
  }
};

const getHousePick = house => {
  house.forEach( item => {
    if(item.classList.contains('house--item-scissors') && item.classList.contains('house--choice'))housePick = 1;
    if(item.classList.contains('house--item-paper') && item.classList.contains('house--choice')) housePick = 2;
    if(item.classList.contains('house--item-rock') && item.classList.contains('house--choice')) housePick = 3;
    if(item.classList.contains('house--item-lizard') && item.classList.contains('house--choice')) housePick = 4;
    if(item.classList.contains('house--item-spock') && item.classList.contains('house--choice')) housePick = 5;
  })
  return housePick;
};

const decision = winner =>{
  if(winner == 'user'){
    let score = (parseInt(localStorage.getItem('score'))+1);
    localStorage.setItem('score', +score); // should BE 1
    roundDecision.textContent = 'YOU WIN';
    roundDecisionContainer.classList.remove('is--hidden');
    userWinner.classList.remove('is--hidden');
    scoreNumber.textContent = score;
  }

  if (winner == 'house'){
    let score = (parseInt(localStorage.getItem('score'))-1);
    localStorage.setItem('score', +score);
    roundDecision.textContent = 'YOU LOSE';
    roundDecisionContainer.classList.remove('is--hidden');
    houseWinner.classList.remove('is--hidden');
    roundWinner = 'house';
    scoreNumber.textContent = score;
  }
  if(winner == 'tie') {
    roundDecision.textContent = 'TIE';
    roundDecisionContainer.classList.remove('is--hidden');
  }
}


const gameplay = (userPick) => {
  userPick = getUserPick(userPick);
  let housePick = getHousePick(houseSelection);
  if(userPick == housePick){decision('tie');}
  // user wins
  if(userPick == 1 && housePick == 2) decision('user');
  if(userPick == 1 && housePick == 4) decision('user');
  if(userPick == 2 && housePick == 3) decision('user');
  if(userPick == 2 && housePick == 5) decision('user');
  if(userPick == 3 && housePick == 1) decision('user');
  if(userPick == 3 && housePick == 4) decision('user');
  if(userPick == 4 && housePick == 5) decision('user');
  if(userPick == 4 && housePick == 2) decision('user');
  if(userPick == 5 && housePick == 1) decision('user');
  if(userPick == 5 && housePick == 3) decision('user');

  //user loses
  if(userPick == 1 && housePick == 3) decision('house');
  if(userPick == 1 && housePick == 5) decision('house');
  if(userPick == 2 && housePick == 1) decision('house');
  if(userPick == 2 && housePick == 4) decision('house');
  if(userPick == 3 && housePick == 2) decision('house');
  if(userPick == 3 && housePick == 5) decision('house');
  if(userPick == 4 && housePick == 1) decision('house');
  if(userPick == 4 && housePick == 3) decision('house');
  if(userPick == 5 && housePick == 2) decision('house');
  if(userPick == 5 && housePick == 4) decision('house');
}


gameContainer.addEventListener('click', e => {
  let target = e.target;
  if(!target.classList.contains('game--item') || target.classList.contains('user--choice') ) return;
  userChoice = target;
  toggleActiveChoice(target);
  displayUserChoice(gameItems);
  houseChoice();
  gameplay(userChoice);
  playAgainButton.classList.remove('is--hidden');

});

rulesButton.addEventListener('click', e => {
  rulesInfo.classList.remove('is--hidden');
});
exitButton.addEventListener('click', e => {
  rulesInfo.classList.add('is--hidden');
});

const gameChoiceList = [scissorsChoice, paperChoice, rockChoice, lizardChoice, spockChoice];
const imageChoiceList = [scissorsImg, paperImg , rockImg, lizardImg, spockImg];
const gameChoiceStrings = ['scissors', 'paper', 'rock', 'lizard', 'spock'];

const resetUserItems = (list1, list2, list3) => {
  for(let i = 0; i <= list1.length - 1; i++){
    if(!list1[i].classList.contains(`game--item-${list3[i]}`)){
      list1[i].classList.add(`game--item-${list3[i]}`);
      list1[i].classList.remove(`is--hidden`);
      list2[i].classList.remove(`is--hidden`);
    }
  }
};

const resetHouseItems = list => {
  for(let elementIndex = 0; elementIndex <= list.length -1; elementIndex++){
    if(list[elementIndex].classList.contains(`house--choice`)){
      removeActiveHouseChoice();
      let elementParent = list[elementIndex].parentNode;
      elementParent.classList.add('is--hidden');
    };
  }
  pentagon.classList.remove('is--hidden');
};

playAgainButton.addEventListener('click', e => {
  gameplayContainer.classList.add('is--hidden');
  playAgainButton.classList.add('is--hidden');
  roundDecisionContainer.classList.add('is--hidden');
  userWinner.classList.add('is--hidden');
  houseWinner.classList.add('is--hidden');
  removeActiveChoice();
  resetUserItems(gameChoiceList, imageChoiceList, gameChoiceStrings);
  resetHouseItems(houseSelection);
})

window.onload = appStart();
