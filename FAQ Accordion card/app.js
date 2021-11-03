
const tabContainers = document.querySelectorAll(".tab-container");
const faqContainer = document.querySelector('#faq-container');

tabContainers.forEach( e => {
  e.addEventListener("click", () => {
    let question = e.childNodes[1],
        answer = e.childNodes[3],
        result = answer.classList.toggle("hidden-content"),
        arrowBtn = question.childNodes[3];

    if(!result) {
      question.style.fontWeight = 700;
      answer.classList.add("content-display");
      arrowBtn.classList.add("arrow-btn-active");

    }
    else {
      question.style.fontWeight=400;
      arrowBtn.classList.remove("arrow-btn-active");

    }
  });
});
