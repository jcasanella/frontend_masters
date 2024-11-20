class Bookshelf {
    constructor() {
        this.favoriteBooks = [];
    }

    addFavoriteBook(bookName) {
        if (!bookName.includes("Great")) {
            this.favoriteBooks.push(bookName);
        }
    }

    printFavoriteBooks() {
        console.log(`Favorite Books: ${String(this.favoriteBooks.length)}`);
        for (let bookName of this.favoriteBooks) {
            console.log(bookName);
        }
    }

}

const BOOK_API = "https://some.url/api";

function loadBooks(bs) {
    // TODO: call fakeAjax( .. );
    fakeAjax(BOOK_API, function (books) {
        for (let bookName of books) {
            bs.addFavoriteBook(bookName);
        }

        bs.printFavoriteBooks();
    });
}

const bs = new Bookshelf();

loadBooks(bs);


// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url,cb) {
    setTimeout(function fakeLoadingDelay(){
        cb([
            "A Song of Ice and Fire",
            "The Great Gatsby",
            "Crime & Punishment",
            "Great Expectations",
            "You Don't Know JS"
        ]);
    },500);
}
