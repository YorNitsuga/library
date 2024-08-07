// Storage for all the books
const myLibrary = [];

// Constructor for the books
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
};

// Takes user's input and stores it into the storage/array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// For the dialog section
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show-dialog");
const closeButton = document.querySelector(".close-dialog");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  document.getElementById('bookForm').reset();
});

// Displays the book input in the page
function displayLibrary() {
    const libraryContainer = document.getElementById('library');
    libraryContainer.innerHTML = ''; // Clear previous content
  
    myLibrary.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button class="on-read" onclick="toggleReadStatus(${index})">Mark as ${book.read ? 'Unread' : 'Read'}</button>
        <br>
        <button class="remove" onclick="removeBook(${index})">Remove</button>
      `;
      libraryContainer.appendChild(bookDiv);
    });
  }
  
// Function that removes the book using the "Remove" button
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
  }

// Functionality of the "Add Book" button in the form
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    // Adds the input in the storage array
    addBookToLibrary(title, author, pages, read);
    // Displays the book
    displayLibrary();
  
    // Clears the form and closes the dialog
    document.getElementById('bookForm').reset();
    dialog.close();
  });

  function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    displayLibrary();
  }
  