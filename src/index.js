import Hapi from '@hapi/hapi'
import WebRoute from './routes/web.js'

const initialize = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  })

  WebRoute(server)

  await server.start()
  console.log('Start on %s', server.info.uri)
}

initialize()
