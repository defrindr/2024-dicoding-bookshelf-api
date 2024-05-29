import BookController from '../controllers/book.controller.js'

export default function WebRoute(server) {
  server.route({
    method: 'GET',
    path: '/books',
    handler: BookController.index,
  })
  server.route({
    method: 'GET',
    path: '/books/{bookId}',
    handler: BookController.show,
  })
  server.route({
    method: 'POST',
    path: '/books',
    handler: BookController.store,
  })
  server.route({
    method: 'PUT',
    path: '/books/{bookId}',
    handler: BookController.update,
  })
  server.route({
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: BookController.destroy,
  })

  // Handling error page
  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return h.response('404 Error! Page Not Found!').code(404)
    },
  })
}
