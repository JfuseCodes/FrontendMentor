const html = document.querySelector("html"),
  main = document.querySelector(".main"),
  iconParent = document.querySelector(".theme-switch-container"),
  moonIcon = iconParent.childNodes[1],
  sunIcon = iconParent.childNodes[3],
  addBtn = document.querySelector(".add--button"),
  form = document.querySelector(".form"),
  bookNameInput = form.childNodes[1].childNodes[1],
  authorNameInput = form.childNodes[3].childNodes[1],
  bookPageInput = form.childNodes[5].childNodes[1],
  checkBox = form.childNodes[7].childNodes[3].childNodes[1],
  elementInput = (element) => element.target.value,
  icons = [moonIcon, sunIcon];

const bookListContainer = document.createElement("div"),
  bookList = document.createElement("table"),
  bookListHeader = document.createElement("tr"),
  bookNameHeader = document.createElement("th"),
  authorHeader = document.createElement("th"),
  pageAmountHeader = document.createElement("th"),
  toggleReadHeader = document.createElement("th"),
  deleteRowHeader = document.createElement("th");

const applyTextContent = (element, text) => element.textContent = text;
const applyClassName = (element) => element.classList.add('table-header');
const appendToRow = (row, element) => row.append(element);
const tableHeaderElements = [
  bookNameHeader,
  authorHeader,
  pageAmountHeader,
  toggleReadHeader,
  deleteRowHeader,
];
const tableHeaderText = ["Book", "Author", "Page", "Read", ""];
for (let i = 0; i < tableHeaderElements.length; i++) {
  appendToRow(bookListHeader, tableHeaderElements[i]);
  applyTextContent(tableHeaderElements[i], tableHeaderText[i]);
  applyClassName(tableHeaderElements[i])
}

bookList.append(bookListHeader);
bookListContainer.append(bookList);
main.append(bookListContainer);
bookListContainer.classList.add("book-list-container");
bookList.classList.add("book-list");

const themeSwitch = (icon) => {
  for (let i = 0; i < icon.length; i++) {
    icon[i].style.cursor = "pointer";
    icon[i].addEventListener("click", (e) => {
      if (icon[i] === moonIcon) {
        html.classList.remove("light");
        html.classList.add("dark");
        toggleIcon();
      }
      if (icon[i] === sunIcon) {
        html.classList.remove("dark");
        html.classList.add("light");
        toggleIcon();
      }
    });
  }
};
const toggleIcon = () => {
  if (html.classList.contains("light")) {
    sunIcon.hidden = true;
    moonIcon.hidden = false;
  }
  if (html.classList.contains("dark")) {
    moonIcon.hidden = true;
    sunIcon.hidden = false;
  }
};
toggleIcon();
themeSwitch(icons);

let myLibrary = localStorage.getItem("myLibrary");
const appStart = () => {
  if (!localStorage.getItem("myLibrary")) {
    myLibrary = [];
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  } else displayExistingLibrary(existingLibrary);

};

function Book(name, author, numberOfPages, hasBeenRead) {
  this.name = name;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasBeenRead = hasBeenRead;
}

let existingLibrary = JSON.parse(localStorage.getItem("myLibrary"));

const addBookToLibrary = (object) => {
  if (existingLibrary == null) existingLibrary = [];

  let [entryTitle, entryAuthor, numberOfPages, hasBeenRead] = [
    object.name,
    object.author,
    object.numberOfPages,
    object.hasBeenRead,
  ];
  let entry = {
    title: entryTitle,
    author: entryAuthor,
    numberOfPages: numberOfPages,
    hasBeenRead: hasBeenRead,
  };
  localStorage.setItem("bookEntry", JSON.stringify(entry));
  existingLibrary.push(entry);
  localStorage.setItem("myLibrary", JSON.stringify(existingLibrary));
};
const deleteBookFromLibrary = (object, index) => {
  const removeObject = (array, arrayIndex) => array.splice(arrayIndex, arrayIndex + 1);
  let currentBook = object[index];
  removeObject(existingLibrary, index);
  localStorage.setItem("myLibrary", JSON.stringify(existingLibrary));
};
const toggleRead = (object,index) => {
  let [entryTitle, entryAuthor, numberOfPages, hasBeenRead] = [
    object.name,
    object.author,
    object.numberOfPages,
    object.hasBeenRead,
  ];
  let entry = {
    title: entryTitle,
    author: entryAuthor,
    numberOfPages: numberOfPages,
    hasBeenRead: hasBeenRead,
  };
  if(object[index].hasBeenRead == 'true') {
    object[index].hasBeenRead = "false";
    localStorage.setItem('myLibrary', JSON.stringify(existingLibrary));
  }
  else{
    object[index].hasBeenRead = 'true';
    localStorage.setItem('myLibrary', JSON.stringify(existingLibrary));
  }
}

const displayLibraryBooks = (array) => {
  if (bookList.childNodes[0] !== null || bookList.childNodes[0] !== undefined) {
    lastItemRow = array[array.length - 1];

    let title = lastItemRow.title,
      author = lastItemRow.author,
      numberOfPages = lastItemRow.numberOfPages,
      hasBeenRead = lastItemRow.hasBeenRead;
    console.log(numberOfPages);
    let listItemRow = bookList.insertRow(-1),
      cell1 = listItemRow.insertCell(0),
      cell2 = listItemRow.insertCell(1),
      cell3 = listItemRow.insertCell(2),
      cell4 = listItemRow.insertCell(3),
      cell5 = listItemRow.insertCell(4);
    listItemRow.classList.add("list-item");
    let cells = [cell1, cell2, cell3, cell4, cell5];
    let cellText = [
      `${title}`,
      `${author}`,
      `${numberOfPages}`,
      `${hasBeenRead}`,
      `<img src='images/icon-cross.svg'>`,
    ];
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = cellText[i];
      if (cells[3].innerHTML == "true") cells[3].innerHTML = "&#10004";
      if (cells[3].innerHTML == "false") cells[3].innerHTML = "";
      if (cells[4]) cells[4].innerHTML = cellText[4];
    }
    cells[3].style.cursor = "pointer";
    cell5.style.cursor = "pointer";
    cell5.classList.add('delete-icon');

    cells[3].addEventListener("click", (e) => {
      const getCurrentRowNum = (element) => element.target.parentNode.rowIndex;
      let currentRow = getCurrentRowNum(e);
      e.currentTarget.innerHTML === '✔' ? e.currentTarget.innerHTML = '' : e.currentTarget.innerHTML = "&#10004";
      currentBook = currentRow - 1;
      toggleRead(existingLibrary,currentBook);
    });

    cells[4].addEventListener("click", (e) => {
      const getCurrentRowNum = (element) =>
        element.target.parentNode.parentNode.rowIndex;
      let currentRow = getCurrentRowNum(e);
      deleteBookFromLibrary(existingLibrary, currentRow - 1);
      bookList.deleteRow(currentRow);
    });
  }
};

const displayExistingLibrary = (array) => {
  for (let i = 0; i < array.length; i++) {
    let title = array[i].title,
      author = array[i].author,
      numberOfPages = array[i].numberOfPages,
      hasBeenRead = array[i].hasBeenRead;

    let listItemRow = bookList.insertRow(-1),
      cell1 = listItemRow.insertCell(0),
      cell2 = listItemRow.insertCell(1),
      cell3 = listItemRow.insertCell(2),
      cell4 = listItemRow.insertCell(3),
      cell5 = listItemRow.insertCell(4),
      cells = [cell1, cell2, cell3, cell4, cell5];
    listItemRow.classList.add("list-item");

    let cellText = [
      `${title}`,
      `${author}`,
      `${numberOfPages}`,
      `${hasBeenRead}`,
      `<img src='images/icon-cross.svg'>`,
    ];
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = cellText[i];
      cells[3].style.cursor = "pointer";
      cells[4].style.cursor = "pointer";
      if (cells[3].innerHTML == "true") cells[3].innerHTML = "&#10004";
      if (cells[3].innerHTML == "false") cells[3].innerHTML = "";
      if (cells[4]) cells[4].innerHTML = cellText[4];
    }
    cells[3].addEventListener("click", e => {
      const getCurrentRowNum = (element) => element.target.parentNode.rowIndex;
      let currentRow = getCurrentRowNum(e);
      e.currentTarget.innerHTML === '✔' ? e.currentTarget.innerHTML = '' : e.currentTarget.innerHTML = "&#10004";
      currentBook = currentRow - 1;
      toggleRead(existingLibrary,currentBook);
    });
    cells[4].addEventListener("click", (e) => {
      const getCurrentRowNum = (element) => element.target.parentNode.parentNode.rowIndex;

      let currentRow = getCurrentRowNum(e);
      deleteBookFromLibrary(existingLibrary, currentRow - 1);
      bookList.deleteRow(currentRow);
    });
  }
};

bookNameInput.addEventListener("change", (e) => e.target.value = elementInput(e));
authorNameInput.addEventListener("change", (e) => e.target.value = elementInput(e));
bookPageInput.addEventListener("change", (e) => e.target.value = elementInput(e));
checkBox.addEventListener("click", (e) => checkBox.checked == true ? checkBox.value = 'true' : checkBox.value = 'false');
const setInputFilter = (textbox, inputFilter) => {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach( event => {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}
setInputFilter(bookPageInput, value => /^\d*\.?\d*$/.test(value))

let inputs = [bookNameInput, authorNameInput, bookPageInput];
inputs.forEach((input) => {
  input.addEventListener("keypress", (e) => {
    let newBook;
    let theBookName = bookNameInput.value,
      theAuthorName = authorNameInput.value,
      thePageNumber = bookPageInput.value,
      hasBeenRead = checkBox.value;
    if (e.key == "Enter") {
      e.preventDefault();
      if (theBookName && theAuthorName && thePageNumber) {
        newBook = new Book(
          theBookName,
          theAuthorName,
          thePageNumber,
          hasBeenRead
        );
        addBookToLibrary(newBook);
        displayLibraryBooks(existingLibrary);
        [
          bookNameInput.value,
          authorNameInput.value,
          bookPageInput.value,
          checkBox.value,
        ] = ["", "", "", false];
      }
      if (theBookName === "" || theAuthorName === "" || thePageNumber === "") alert("Please double check everything");
    }
  });
});

// const updateFormOnEnter = () => {
//   let theBookName = bookNameInput.value,
//       theAuthorName = authorNameInput.value,
//       thePageNumber = bookPageInput.value;
//       // console.log(theBookName);
//       // console.log(bookNameInput.value);
//   inputs.forEach( input => {
//     input.addEventListener('keypress', e => {
//       if(e.key == "Enter"){
//         e.preventDefault();
//         if(theBookName && theAuthorName && thePageNumber){
//           newBook = new Book(theBookName, theAuthorName, thePageNumber);
//           addBookToLibrary(newBook);
//           displayLibraryBooks(existingLibrary);
//         }
//         if(theBookName === '' && theAuthorName === '' && thePageNumber === ''){
//           console.log('please fill out all fields... add error message');
//           console.log(bookNameInput.value);
//           console.log(bookNameInput);
//           console.log(e);
//         }
//
//       }
//     })
//   })
//   // if(theBookName && theAuthorName && thePageNumber){
//   //   for(let i = 0; i < inputs.length; i++){
//   //     inputs[i].addEventListener('keypress', e => {
//   //       // e.preventDefault();
//   //       console.log(e.key);
//   //     //   if (e.key === 13){
//   //     //     newBook = new Book(theBookName, theAuthorName, thePageNumber);
//   //     //     addBookToLibrary(newBook);
//   //     //     displayLibraryBooks(existingLibrary);
//   //     //     console.log('enter pressed')
//   //     // };
//   //
//   //     })
//   //   }
//   // }
// }

// addBtn.addEventListener('click', e => {
//   e.preventDefault();
//   let newBook;
//   let theBookName = bookNameInput.value,
//       theAuthorName = authorNameInput.value,
//       thePageNumber = bookPageInput.value;
//   if(theBookName === '' && theAuthorName === '' && thePageNumber === ''){
//     console.log('please fill out all fields... add error message');
//   }
//   if(theBookName && theAuthorName && thePageNumber){
//     newBook = new Book(theBookName, theAuthorName, thePageNumber);
//     addBookToLibrary(newBook);
//     displayLibraryBooks(existingLibrary);
//   }
//   [bookNameInput.value,authorNameInput.value, bookPageInput.value] = ['','',''];
// });

window.onload = appStart();
