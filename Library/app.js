const main = document.querySelector('.main');
const list = document.querySelector('.book-list');
const addBtn = document.querySelector('.add--button');
const form = document.querySelector('.form'),
      bookNameInput = form.childNodes[1].childNodes[3],
      authorNameInput = form.childNodes[3].childNodes[3],
      bookPageInput = form.childNodes[5].childNodes[3];
const elementInput = element => element.target.value;

let myLibrary = [];
function Book(name, author, numberOfPages, hasBeenRead){
  this.name = name
  this.author = author
  this.numberOfPages = numberOfPages
  this.hasBeenRead = null
}

const addBookToLibrary = (object, array) => array.push(object);
const displayLibraryBooks = array => {
  array.forEach( book => {
    //create element for each
    console.log('list created')
    let listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.textContent += `${book.name} || ${book.author} || ${book.numberOfPages}`
    main.append(listItem);
  });
};

bookNameInput.addEventListener('change', e => {
  e.target.value = elementInput(e);
});

authorNameInput.addEventListener('change', e => {
  e.target.value = elementInput(e);
});

bookPageInput.addEventListener('change', e => {
  e.target.value = elementInput(e);
});

addBtn.addEventListener('click', e => {
  e.preventDefault();
  let theBookName = bookNameInput.value,
      theAuthorName = authorNameInput.value,
      thePageNumber = bookPageInput.value;
  if(theBookName === '' && theAuthorName === '' && thePageNumber === ''){
    console.log('please fill out all fields');
  }

  if(theBookName && theAuthorName && thePageNumber){
    let newBook = new Book(theBookName, theAuthorName, thePageNumber);
    addBookToLibrary(newBook, myLibrary);
    displayLibraryBooks(myLibrary);
  }
  [bookNameInput.value,authorNameInput.value, bookPageInput.value] = ['','',''];
});
