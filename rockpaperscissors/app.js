const scoreNumber = document.querySelector('.score-banner--digit');
const gameContainer = document.querySelector('.game-container');
const rulesInfo = document.querySelector('.rules-info--container');
const rulesButton = document.querySelector('.rules--button');
const exitButton = document.querySelector('.info-close-button');


const appStart = () => {
  scoreNumber.textContent = 0;
  rulesInfo.classList.add('is--hidden');
}

rulesButton.addEventListener('click', e => {
  rulesInfo.classList.remove('is--hidden');
});

exitButton.addEventListener('click', e => {
  rulesInfo.classList.add('is--hidden');
})

appStart();
