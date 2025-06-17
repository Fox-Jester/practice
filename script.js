
const bookContainer = document.querySelector(".book-container");
const model = document.querySelector(".model");
const addBtn = document.querySelector("#add-btn");
const closeBtn = document.querySelector("#close-btn");

const modelForm = document.querySelector("#model-form")
const nameInput = document.querySelector("#name-input");
const authorInput = document.querySelector("#author-input");
const genreInput = document.querySelector("#genre-input");
const numberInput = document.querySelector("#number-input");
const colorSelect = document.querySelector("#color-select")

addBtn.addEventListener("click", () => {
    model.showModal();
});

closeBtn.addEventListener("click", () => {
    model.close();
});

modelForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addToLibrary(
        nameInput.value,
        authorInput.value,
        genreInput.value,
        colorSelect.value,
        numberInput.value
        
    )

    refreshInputs();
    model.close();
    refreshDisplay();
})


const myLibrary = [
    new Book({
        name: "the Zapper!",
        author: "moquito 987",
        genre: "thriller",
        color: "purple",
        pages: 24,
        id: "uddiso3"
    }),
    new Book({
        name: "Red Sun",
        author: "smaurai guy",
        genre: "Action",
        color: "red",
        pages: 30,
        id: "rrbgds3345"
    })
]


function Book(props){
    this.name = props.name;
    this.author = props.author;
    this.genre = props.genre;
    this.color = props.color;
    this.pages = props.pages;
    this.id = crypto.randomUUID();
    this.read = false;
};


function addToLibrary(name, author, genre, color, pages){
    const newBook = new Book({name: name, author: author, genre: genre, color: color, pages: pages})
    myLibrary.push(newBook);
    console.log(myLibrary);
};

function refreshDisplay(){
    const books = document.querySelectorAll(".card");
    books.forEach(book => book.remove());
    

    displayLibrary();
}

function refreshInputs(){
    nameInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    numberInput.value = "";
    colorSelect.value = "";
}

function removeBook(id){
    myLibrary.forEach((book) => {
        if(book.id === id){
            myLibrary.splice((myLibrary.indexOf(book)), 1);
            refreshDisplay()
        }
    })
}

function displayLibrary(){
    myLibrary.forEach((book) => {
        const card = document.createElement("div");
       
        card.classList.add("card", book.color);
        card.id = book.id
        
        //Card Header
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        
        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = book.name;
        cardHeader.appendChild(cardTitle);

        
        //Card Body
        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body");

        const author = document.createElement("P");
        author.innerHTML = `Author: ${book.author}`;
        cardBody.appendChild(author);
        
        const genre = document.createElement("p");
        genre.innerHTML = `Genre: ${book.genre}`;
        cardBody.appendChild(genre);
        
        const numberOfPages = document.createElement("p");
        numberOfPages.innerHTML = `Pages: ${book.pages}`;
        cardBody.appendChild(numberOfPages);
        
        const readTag = document.createElement("p");
        readTag.innerHTML = "Read: no"
        if(book.read){
            readTag.innerHTML = "Read: yes"
        }
        cardBody.appendChild(readTag);

        //Card Footer
        const cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        
        const readBtn = document.createElement("button");
        readBtn.classList.add("read-btn");
        readBtn.innerHTML = "Read";
        cardFooter.appendChild(readBtn);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "X";
        cardFooter.appendChild(deleteBtn);
         
      
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);


        bookContainer.appendChild(card);

        deleteBtn.addEventListener("click", () => {
            removeBook(book.id);
        })

        readBtn.addEventListener("click", () => {
            if(book.read){
                book.read = false
            }
            else{
                book.read = true;
            }
            
            refreshDisplay();
        })
    })
};


displayLibrary();