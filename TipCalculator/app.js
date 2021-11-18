const billInput = document.querySelector("#bill-input");
const tipButtons = document.querySelectorAll(".btn");
const customInput = document.querySelector("#custom-input");
const errorMessage = document.querySelector("#error-message");
const showPeopleNum = document.querySelector("#tip-person-result");
const peopleInput = document.querySelector("#people-amount");
const soloTipPersonResult = document.querySelector("#tip-person-result");
const tipPersonResult = document.querySelector("#total-tip-person-result");
const resetBtn = document.querySelector("#reset-btn");

const appStart = () => {

  soloTipPersonResult.textContent = `$${(Math.round(0 * 100) / 100).toFixed(
    2
  )}`;
  tipPersonResult.textContent = `$${(Math.round(0 * 100) / 100).toFixed(2)}`;
};
window.onload = appStart();

const removeActiveBtn = () => {
  for (let i = 0; i <= tipButtons.length - 1; i++) {
    tipButtons[i].classList.remove("active");
  }
};
const billInputValue = (element) => element.value;
const totalBill = (x, y) => +(x + y);
const percentValue = element => element.value/100;
const peopleInputValue = element => element.value;
const toggleClass = (element) => {
  removeActiveBtn();
  element.currentTarget.classList.toggle("active");
};

const percentofBill = (percentage, bill) => percentage * bill;
const calculateTipPerPerson = (tip, numPeople) => tip/numPeople;
const calculateTotalTipPerPerson = (finalBill, numPeople) => finalBill / numPeople;
const roundDec = num => (Math.round(num * 100) / 100).toFixed(2);

const checkActiveBtn = () => {
  for (let i = 0; i < tipButtons.length; i++) {
    if (tipButtons[i].classList.contains("active")) {
      return tipButtons[i].value/100;
    }
  }
};
const billWarning = () => {
  if(billInput.value < 0){
    billInput.classList.add('is-invalid');
    soloTipPersonResult.textContent = `$${roundDec(0)}`;
    tipPersonResult.textContent = `$${roundDec(0)}`;
  }
  else{
    billInput.classList.remove('is-invalid');

  }
}
const errorWarning = () => {
  if(peopleInput.value <= 0){
    peopleInput.classList.add('is-invalid');
    errorMessage.style.focus = 'rgb(218,55,73)';
    errorMessage.textContent = `Cant be ${peopleInputValue(peopleInput)}`;
    errorMessage.style.color = 'rgb(218,55,73)';
    soloTipPersonResult.textContent = `$${roundDec(0)}`;
    tipPersonResult.textContent = `$${roundDec(0)}`;
  }
  else{
    peopleInput.classList.remove('is-invalid');
    peopleInput.classList.add('is-valid');
    errorMessage.textContent = '';
  }
}
const customInputWarning = () => {
  if(customInput.value < 0){
    customInput.classList.add('is-invalid');
    soloTipPersonResult.textContent = `$${roundDec(0)}`;
    tipPersonResult.textContent = `$${roundDec(0)}`;
  }
  else{
    customInput.classList.remove('is-invalid');
  }
}
const noTipBill = () => {
  let totalAmount = billInputValue(billInput),
    personAmount = +peopleInput.value,
    soloTip = +calculateTipPerPerson(0,personAmount),
    totalBill = +calculateTotalTipPerPerson(totalAmount, personAmount);
  soloTipPersonResult.textContent = `$${roundDec(soloTip)}`
  tipPersonResult.textContent = `$${roundDec(totalBill)}`;

  // soloTipPersonResult.textContent = `${totalAmount}`;
  return totalBill;
};
const billWithCustomTip = () => {
  let billBeforeTip = +billInputValue(billInput),
      customTipPercentage = percentValue(customInput),
      personAmount = peopleInputValue(peopleInput),
      tipAmount = percentofBill(customTipPercentage,billBeforeTip);

  let billAfterTip = totalBill(billBeforeTip,tipAmount),
      tipPerPerson = roundDec(calculateTipPerPerson(tipAmount,personAmount)),
      totalTipPerPerson = roundDec(calculateTotalTipPerPerson(billAfterTip, personAmount));

  soloTipPersonResult.textContent = `$${tipPerPerson}`;
  tipPersonResult.textContent = `$${totalTipPerPerson}`;
}
const billWithBtnTip = () => {
  let billBeforeTip = +billInputValue(billInput),
      tipPercentage = checkActiveBtn(),
      personAmount = peopleInputValue(peopleInput),
      tipAmount = percentofBill(tipPercentage,billBeforeTip);
  let billAfterTip = totalBill(billBeforeTip,tipAmount),
      tipPerPerson = roundDec(calculateTipPerPerson(tipAmount,personAmount)),
      totalTipPerPerson = roundDec(calculateTotalTipPerPerson(billAfterTip, personAmount));

  soloTipPersonResult.textContent = `$${tipPerPerson}`;
  tipPersonResult.textContent = `$${totalTipPerPerson}`;
}

const billInputUpdate = () => {
  billInput.addEventListener('change', e => {
    if(customInput.value == "" && checkActiveBtn()){
      billWithBtnTip();
    }
    if(!customInput.value && !checkActiveBtn()){
      noTipBill();
    }
    else if(customInput.value > 0){
      removeActiveBtn();
      billWithCustomTip();
    }
    else if(customInput.value < 0){
      customInput.classList.add('is-invalid');
    };
    errorWarning();
    billWarning();
    customInputWarning();
  });
};
const tipButtonUpdate = () => {
  tipButtons.forEach( btn => {
    btn.addEventListener('click', e => {
      toggleClass(e);
      customInput.value = '';
      customInput.classList.remove('is-invalid');
      if(billInput.value < 0){
        billWarning();
      }
      else{

      billWithBtnTip();
      if(peopleInput.value <= 0) showError();
      if(peopleInput.value >0)removeError();

      }
    })
  })
};
const customInputUpdate = () => {
  customInput.addEventListener('change', e => {
    removeActiveBtn();
    if(!checkActiveBtn()){

      billWithCustomTip();
    }
     errorWarning();
     billWarning();
     customInputWarning();
  });
};
const peopleNumUpdate = () => {
  peopleInput.addEventListener('change' , e => {
    if(customInput.value == "" && checkActiveBtn()){
      billWithBtnTip();
    }
    if(!customInput.value && !checkActiveBtn()){
      noTipBill();
    }
    else if(customInput.value > 0){
      removeActiveBtn();
      billWithCustomTip();
    }
    errorWarning();
    billWarning();
  })
}

const updateTotal = () => {
  billInputUpdate();
  tipButtonUpdate();
  customInputUpdate();
  peopleNumUpdate();

}
updateTotal();
resetBtn.addEventListener("click", (e) => {
  customInput.value = "";
  removeActiveBtn();
  billInput.value = 1;
  peopleInput.value = 1;
  soloTipPersonResult.textContent = `${roundDec(0)}`;
  tipPersonResult.textContent = `$${roundDec(0)}`;
});
