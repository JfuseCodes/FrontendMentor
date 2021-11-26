const emailContainer = document.querySelector('.email-container');
const emailInput = document.querySelector('.email-input');
const errorMessage = document.querySelector('.error-message');
const submitBtn = document.querySelector('.email-btn');
const errorIcon = document.querySelector('.error-icon');

const emailUpdate = () => {
  emailInput.addEventListener('change', () => {
    console.log(emailInput.value);
  });
};

let validateEmail = (element) =>{
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(element.value);
}

const submit = () => {
  submitBtn.addEventListener('click', () => {
    const email = validateEmail(emailInput);
    if(email == true){
      emailInput.value='';
      errorMessage.textContent = 'Thank you! Check your email for verification.'
      errorMessage.style.color = 'green';
      emailInput.classList.remove('is-invalid');
      emailInput.classList.remove('show-hidden-icon');
      errorIcon.classList.add('hide-icon');
    }
    else{
      emailInput.classList.add('is-invalid');
      errorIcon.classList.add('show-hidden-icon');
      errorIcon.classList.remove('hide-icon');
      errorMessage.style.color = 'red';
      errorMessage.textContent = 'Please provide a valid email'
    }
  })
}
const runApp = () => {
  emailUpdate();
  submit();
};

runApp();
