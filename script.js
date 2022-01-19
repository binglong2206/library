const addBookButton = document.querySelector('.submitButton');
addBookButton.addEventListener('click', newBook);

const displayContainer = document.querySelector('.displayContainer');
const bookDiv = document.createElement('div');
const bookDetailDiv = document.createElement('p');
const removeBookButton = document.createElement('button');
const toggleReadButton = document.createElement('button');
bookDiv.classList.add('book');
removeBookButton.classList.add('removeBookButton');
toggleReadButton.classList.add('toggleReadButton');

removeBookButton.innerText = 'Remove!!!';
toggleReadButton.innerText = 'Read';

bookDiv.appendChild(bookDetailDiv);
bookDiv.appendChild(removeBookButton);
bookDiv.appendChild(toggleReadButton);

const library = [];

// FORM VALIDATION PRACTICE
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const isRead = document.getElementById('isRead');
const formErrorSpan = document.getElementById('formError');

const allInputs = Array.from(document.querySelectorAll('form input'));


allInputs.map((input) =>
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      formErrorSpan.innerText = '';
    } else {
      formErrorSpan.innerText = 'invalid';
    }
  })
);

class bookClass {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (isRead === true) {
      this.isRead = 'Yep, read already';
    } else {
      this.isRead = 'Nope, havent read yet';
    }
  }
}

function newBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  const tempBook = new bookClass(title, author, pages, isRead);

  library.push(tempBook);
  displayBook();
  console.log(library);
}

function displayBook() {
  if (library === []) return;

  while (displayContainer.lastChild) {
    // stops at null, when the container is compeltely empty
    displayContainer.removeChild(displayContainer.lastChild);
  }

  let cloneBookDiv;
  let i = 0;
  library.forEach((book) => {
    bookDetailDiv.innerText = `${book.title} ${book.author} ${book.pages} ${book.isRead}`;
    removeBookButton.setAttribute('data-index', `${i}`);
    toggleReadButton.setAttribute('data-index', `${i}`);

    cloneBookDiv = bookDiv.cloneNode(true);
    cloneBookDiv
      .querySelector('button.removeBookButton')
      .addEventListener('click', removeBook);
    cloneBookDiv
      .querySelector('button.toggleReadButton')
      .addEventListener('click', toggleRead);
    displayContainer.appendChild(cloneBookDiv);
    i++;
  });
}

function removeBook(e) {
  // e represent the output of the 'click' event
  const bookIndex = e.target.getAttribute('data-index');
  library.splice(bookIndex, 1);
  displayBook();
}

function toggleRead(e) {
  const bookIndex = e.target.getAttribute('data-index');
  const book = library[bookIndex];

  if (book.isRead == 'Yep, read already') {
    book.isRead = 'Nope, havent read yet';
    return displayBook();
  }
  book.isRead = 'Yep, read already';
  return displayBook();
}
