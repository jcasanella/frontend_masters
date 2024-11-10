const books = [];

function addFavoriteBook(bookName) {
    if (!bookName.includes('Great')) {
        books.push(bookName);
    }
}

addFavoriteBook("A Song of Ice and Fire");
addFavoriteBook("The Great Gatsby");
addFavoriteBook("Crime & Punishment");
addFavoriteBook("Great Expectations");
addFavoriteBook("You Don't Know JS");

console.table(books);