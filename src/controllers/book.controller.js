import response from '../core/response.js'
import db from '../db/db.js'

const index = (r, h) => {
  let { reading, finished, name } = r.query
  let books = db.fetchAll(reading, finished, name)

  return response(h).success('List buku', { books })
}

const show = (r, h) => {
  let book = db.fetchById(r.params.bookId)
  if (!book) return response(h).notFound('Buku tidak ditemukan')
  return response(h).success('List buku', { book })
}

const store = (r, h) => {
  let { name, year, author, summary, publisher, pageCount, readPage, reading } =
    r.payload

  year = Number(r.payload.year)
  pageCount = Number(r.payload.pageCount)
  readPage = Number(r.payload.readPage)
  reading = Boolean(r.payload.reading)

  let finished = pageCount === readPage

  if (!name)
    return response(h).badRequest('Gagal menambahkan buku. Mohon isi nama buku')

  if (readPage > pageCount)
    return response(h).badRequest(
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    )

  let book = db.create({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
  })

  return response(h).created('Buku berhasil ditambahkan', { bookId: book.id })
}

const update = (r, h) => {
  let { name, year, author, summary, publisher, pageCount, readPage, reading } =
    r.payload
  let { bookId } = r.params

  year = Number(r.payload.year)
  pageCount = Number(r.payload.pageCount)
  readPage = Number(r.payload.readPage)
  reading = Boolean(r.payload.reading)
  let finished = pageCount === readPage

  if (!name)
    return response(h).badRequest('Gagal memperbarui buku. Mohon isi nama buku')

  if (readPage > pageCount)
    return response(h).badRequest(
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    )

  try {
    let book = db.update(bookId, {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
    })

    return response(h).success('Buku berhasil diperbarui', { book })
  } catch (error) {
    return response(h).notFound(error.message)
  }
}

let destroy = (r, h) => {
  let { bookId } = r.params

  try {
    let book = db.destroy(bookId)
    return response(h).success('Buku berhasil dihapus', { book })
  } catch (error) {
    return response(h).notFound(error.message)
  }
}

export default { index, show, store, update, destroy }
