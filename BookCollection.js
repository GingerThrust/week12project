//Books. You're doing an API on book logging. Title, genre, author, year read.//
class Book {
    constructor(name, author, year) {
       this.name = name;
       this.author = author;
       this.year = year;
    }
}

class BookLogging {
    static url = https://6351a29bdfe45bbd55c5b59e.mockapi.io/api/wk12/
    
    static getAllBooks() {
        return $.get(this.url);
    }

    static getBook(id) {
        return $.get(this.url + `/${id}`);
    }

    static createBook(book) {
        return $.post(this.url, house);
    }

    static updateBook(book) {
        return $.ajax({
            url: this.url + `/${book._id}`,
            dataType: 'json',
            data: JSON.stringify(book),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteBook(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }

}


class DOMManager {
    static books;


    static getAllBooks() {
        BookLogging.getAllBooks().then(books => this.render(books));
    }

    static deleteBook(id) {
        BookLogging.deleteBook(id)
        .then(() => {
            return BookLogging.getAllBooks();
        })
        .then((books) => this.render(books));
    }

    static createBook(name) {
        BookLogging.createBook(new Book(name))
          .then(() => {
            return BookLogging.getAllBooks();
          })
          .then((books) => this.render(books));
    }

    static render(books) {
        this.books = books;
        $('#app').empty();
        for (let book of books) {
            $('#app').prepend(
                `
                <div id='${book._id}' class="card">
                  <div class="card-header">
                     <h2>${book.name}</h2>
                     <button class="btn btn-danger" onclick="DOMManager.deleteBook('${book._id}')">Delete</button>
                  </div>
                  <div class="card-body">
                    <div class="card">
                        <div class="row">
                           <div class="col-sm">
                              <input type="text" id="${book._id}-book-name" class="form-control" placeholder="Book Name">
                           </div>
                           <div class="col-sm">
                           <input type="text" id="${book._id}-book-author" class="form-control" placeholder="Book Author">
                           </div>
                           <div class="col-sm">
                           <input type="text" id="${book._id}-book-year" class="form-control" placeholder="Year Read">
                           </div>
                        </div>
                        <button id="${book._id}-new-book" onclick="DOMManager.addBook('${book._id}') class="btn btn-primary form-control">Add Book</button>
                    </div>
                  </div>
                </div>   
                `
            )
        }
    }
}

$('#create-new-book').onclick(() => {
    DOMManager.createBook($('#new-book-name').val());
    $('#new-book-name').val('');
}

DOMManager.getAllBooks();