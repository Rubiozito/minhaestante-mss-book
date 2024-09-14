import { Book } from "../../domain/entities/book.js";
import { GENRES } from "../../domain/enums/genresEnum.js";
import { Bookshelf } from "../../domain/entities/bookshelf.js";
import { MongoClient } from "mongodb";
import { enviroments } from "../enviroments.js";

export class bookRepositoryMongo {
  constructor() {
    const uri = enviroments.connectStr;
    const client = new MongoClient(uri);
    const db = client.db(enviroments.db_name);
    const booksCollection = db.collection("books");
    const bookshelfCollection = db.collection("bookshelf");
  }

  async getBook(id) {
    const book = await this.booksCollection.findOne({ bookId: id });

    if (!book) {
      return null;
    }

    const bookDTO = new Book(
      book.bookId,
      book.title,
      book.edition,
      book.autor,
      book.pages,
      book.genre,
      book.publishDate,
      book.publisher,
      book.rating
    );

    return bookDTO;
  }

  async getBookshelf(userID) {
    const bookshelf = await this.bookshelfCollection.findOne({
      userID: userID,
    });

    if (!bookshelf) {
      return null;
    }

    const bookshelfDTO = new Bookshelf(
      bookshelf.userID,
      bookshelf.read,
      bookshelf.reading,
      bookshelf.willRead,
      bookshelf.reReading,
      bookshelf.dropped,
      bookshelf.favorites
    );

    return bookshelfDTO;
  }
  //olhar esses abaixo
  async getAllBooks() {
    const allBooks = await this.booksCollection;

    return allBooks;
  }

  async createBook(book) {
    const book = await this.booksCollection.insertOne({
      bookId: book.id,
      title: book.title,
      edition: book.edition,
      autor: book.autor,
      pages: book.pages,
      genre: book.genre,
      publishDate: book.publishDate,
      publisher: book.publisher,
      rating: book.rating,
    });

    return book;
  }

  async updateBook(
    id,
    {
      title = null,
      edition = null,
      autor = null,
      pages = null,
      genre = null,
      publishDate = null,
      publisher = null,
      rating = null,
    } = {}
  ) {
    const checkBook = await this.getBook(id);
    if (!checkBook) {
      return null;
    }

    if (bookId !== null) {
      const book_id = await this.booksCollection.updateOne({ bookId: book.id });
    }
    if (title !== null) {
      const book_title = await this.booksCollection.updateOne({
        title: book.title,
      });
    }
    if (edition !== null) {
      const book_edition = await this.booksCollection.updateOne({
        edition: book.edition,
      });
    }
    if (autor !== null) {
      const book_autor = await this.booksCollection.updateOne({
        autor: book.autor,
      });
    }
    if (pages !== null) {
      const book_pages = await this.booksCollection.updateOne({
        pages: book.pages,
      });
    }
    if (genre !== null) {
      const book_genre = await this.booksCollection.updateOne({
        genre: book.genre,
      });
    }
    if (publishDate !== null) {
      const book_publishDate = await this.booksCollection.updateOne({
        publishDate: new Date(publishDate),
      });
    }
    if (rating !== null) {
      const book_rating = await this.booksCollection.updateOne({
        rating: book.rating,
      });
    }

    const book = await this.booksCollection.getBook(id);
    return book;
  }

  async deleteBook(id) {
    const checkBook = await this.getBook(id);
    if (!checkBook) {
      return null;
    }

    const book = await this.booksCollection.findOne({ bookId: id });
    this.booksCollection.deleteOne({ bookId: id });

    return book;
  }

  async createBookshelf(bookshelf) {
    const bookshelf = await this.bookshelfCollection.insertOne({
      userID: bookshelf.userID,
      read: bookshelf.read,
      reading: bookshelf.reading,
      willRead: bookshelf.willRead,
      reReading: bookshelf.reReading,
      dropped: bookshelf.dropped,
      favorites: bookshelf.favorites,
    });

    return bookshelf;
  }

  async deleteBookshelf(userID) {
    const checkBookshelf = await this.getBookshelf(userID);
    if (!checkBookshelf) {
      return null;
    }

    const bookshelf = await this.bookshelfCollection.findOne({
      userID: bookshelf.userID,
    });
    this.bookshelfCollection.deleteOne({ userID: bookshelf.userID });

    return bookshelf;
  }

  async updateBookshelf(
    userID,
    {
      read = null,
      reading = null,
      willRead = null,
      reReading = null,
      dropped = null,
      favorites = null,
    } = {}
  ) {
    if (userID !== null) {
      const bookshelf_userId = await this.bookshelfCollection.updateOne({
        userID: bookshelf.userID,
      });
    }
    if (read !== null) {
      const bookshelf_read = await this.bookshelfCollection.updateOne({
        read: bookshelf.read,
      });
    }
    if (reading !== null) {
      const bookshelf_reading = await this.bookshelfCollection.updateOne({
        reading: bookshelf.reading,
      });
    }
    if (willRead !== null) {
      const bookshelf_willRead = await this.bookshelfCollection.updateOne({
        willRead: bookshelf.willRead,
      });
    }
    if (reReading !== null) {
      const bookshelf_reReading = await this.bookshelfCollection.updateOne({
        reReading: bookshelf.reReading,
      });
    }
    if (dropped !== null) {
      const bookshelf_dropped = await this.bookshelfCollection.updateOne({
        dropped: bookshelf.dropped,
      });
    }
    if (favorites !== null) {
      const bookshelf_favorites = await this.bookshelfCollection.updateOne({
        favorites: bookshelf.favorites,
      });
    }
    const bookshelf = await this.bookshelfCollection.getBookshelf(userID);

    return bookshelf;
  }
}
