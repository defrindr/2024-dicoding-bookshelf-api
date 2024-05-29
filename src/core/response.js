export default function response(h) {
  return {
    notFound: (message) => {
      return h
        .response({
          status: 'fail',
          message,
        })
        .code(404)
    },
    badRequest: (message) => {
      return h
        .response({
          status: 'fail',
          message,
        })
        .code(400)
    },
    created: (message, data) => {
      return h
        .response({
          status: 'success',
          message,
          data,
        })
        .code(201)
    },
    success: (message, data) => {
      return h
        .response({
          status: 'success',
          message,
          data,
        })
        .code(200)
    },
  }
}
