import { nanoid } from 'nanoid'

// let DB_NAME = "books";
let books = []

const create = (book) => {
  book.id = nanoid()
  book.insertedAt = new Date().toISOString()
  book.updatedAt = new Date().toISOString()
  books.push(book)

  return book
}

const fetchAll = (reading = null, finished = null, name = null) => {
  let displayBook = [...books]

  if (reading) displayBook = displayBook.filter((b) => b.reading == reading)
  if (finished) displayBook = displayBook.filter((b) => b.finished == finished)
  if (name)
    displayBook = displayBook.filter((b) =>
      b.name.toLowerCase().includes(name.toLowerCase())
    )

  return displayBook.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }))
}

const fetchById = (bookId) => {
  let book = books.filter((b) => b.id == bookId)

  if (book.length == 0) return false
  return book[0]
}

const update = (bookId, payloads) => {
  let bookExist = fetchById(bookId)
  if (!bookExist) throw new Error('Gagal memperbarui buku. Id tidak ditemukan')

  let bookUpdate = Object.assign(bookExist, payloads)
  bookUpdate.updatedAt = new Date().toISOString()

  books = books.map((b) => (b.id === bookId ? bookUpdate : b))

  return bookUpdate
}

const destroy = (bookId) => {
  let bookExist = fetchById(bookId)
  if (!bookExist) throw new Error('Buku gagal dihapus. Id tidak ditemukan')

  books = books.filter((b) => b.id !== bookId)

  return bookExist
}

export default { create, fetchAll, fetchById, update, destroy }
