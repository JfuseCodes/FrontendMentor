const html = document.documentElement,
      themeOne = document.querySelector('#theme1'),
      themeTwo = document.querySelector('#theme2'),
      themeThree = document.querySelector('#theme3'),
      themeButtons = document.querySelectorAll('input[type=radio]');

const calculator = document.querySelector(".calculator-container"),
      display = document.querySelector(".result"),
      deleteBtn = document.querySelector(".del-btn"),
      resetBtn = document.querySelector("#reset-btn"),
      numberButtons = document.querySelectorAll(".number-btn"),
      decimalBtn = document.querySelector('#decimal-btn'),
      equalBtn = document.querySelector("#equal-btn"),
      operatorButtons = document.querySelectorAll(".operation-btn"),
      allButtons = document.querySelectorAll("button");

//THEME SWITCHING
const updateThemeOne = () => {
    html.classList.remove('two', 'three');
    html.classList.add('one','theme-transition');
  };
const updateThemeTwo = () => {
    html.classList.remove('one','three');
    html.classList.add('two','theme-transition');
  }
const updateThemeThree = () => {
    html.classList.remove('two','three');
    html.classList.add('three','theme-transition');
  }
const switchTheme = () => {
  themeButtons.forEach( btn => {
    btn.addEventListener('click', e => {
      if(e.target.id === 'theme1') updateThemeOne();
      if(e.target.id === 'theme2') updateThemeTwo();
      if(e.target.id === 'theme3') updateThemeThree();
    });
  });
};

//VALUE TO BUTTONS
const valueToNumberButtons = () => {
  for (let i = 0; i <= 9; i++) {
    numberButtons[i].value = numberButtons[i].innerHTML;
  }
};
const valueToOperatorButtons = () => {
  for (let i = 0; i <= 4; i++) {
    operatorButtons[i].value = operatorButtons[i].innerHTML;
  }
};
const valueToDecimalButton = () => decimalBtn.value = decimalBtn.innerHTML;
const valueToButtons = () => {
  valueToNumberButtons();
  valueToDecimalButton();
  valueToOperatorButtons();
};

//FUNCTION FOR DELETE BUTTON
const deleteLastDigit = element => {
  let holder = element.value,
      splitHolder = holder.split('');
  splitHolder.pop();
  display.value = splitHolder.join('');
  if(splitHolder.length === 0) resetDisplay(display);
};

//FUNCTION FOR RESET BUTTON
const resetDisplay = element => {
  element.value = '';
  element.placeholder = '0';
}
const reset = () => {
  symbol = '';
  previousNumber = 0,currentNumber = 0;
  resetDisplay(display);
}

//FUNCTION FOR TOGGLING OPERATOR
const removeActiveOperator = () => {
  for(let i = 0; i<= operatorButtons.length - 1; i++){
    operatorButtons[i].classList.remove('active');
  }
}
const toggleActiveOperator = element => {
  removeActiveOperator;
  element.currentTarget.classList.toggle('active');
}

//FUNCTIONS FOR CALCULATING
// const updateOperation = element => element.dataset.function;
const add = (x, y) => parseFloat(x) + parseFloat(y);
const subtract = (x, y) => parseFloat(x) - parseFloat(y);
const multiply = (x, y) => parseFloat(x) * parseFloat(y);
const divide = (x, y) => parseFloat(x)/parseFloat(y);
const operate = (operation, x, y) => {
  let result = ''
  switch(operation) {
    case 'add':
      console.log(`add ${x} and ${y} is ${add(x,y)}`);
      display.value = add(x,y).toLocaleString();
      break;
    case 'subtract':
      display.value = subtract(x,y);
      console.log(`subtract ${x} by ${y}`);
      break;
    case 'multiply':
      display.value = multiply(x,y);
      console.log(`multiply ${x} and ${y}`);
      break;
    case 'divide':
      display.value = divide(x,y);
      console.log(`divide ${x} by ${y}`);
      break;
  }
}



let previousNumber = 0;
let currentNumber = 0;
let symbol;
//Listening to key-presses
allButtons.forEach( btn => {
  btn.addEventListener('click', e => {
    if( e.target.matches('button') ) {
      let button = e.target,
          buttonAction = button.dataset.function,
          buttonValue = button.innerHTML;
      let displayValue = display.value;

      if(!buttonAction){
        if(display === ''){display = buttonValue}
        if(e.target.value === '.' && display.value.includes('.'))return;
        else {
          display.value += buttonValue;
        }
      }
      if( buttonAction === 'add' || buttonAction === 'subtract' || buttonAction === 'multiply' || buttonAction === 'divide'){
        previousNumber = display.value,
        symbol = buttonAction;
        resetDisplay(display);
      }

      if(buttonAction === 'equals'){
        currentNumber = display.value;
        if(!currentNumber){ currentNumber = 0 };
        if(!previousNumber){ previousNumber = 0 };
        operate(symbol, previousNumber, currentNumber);
        previousNumber = display.value;
      }
      if(buttonAction === 'delete') deleteLastDigit(display);
      if(buttonAction === 'reset') reset();

    }
  })
});

const runApp = () => {
  switchTheme();
  valueToButtons();
};

runApp();
