import http from 'http'
import config from 'config'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

import app from 'app'

mongoose.connect(config.Api.database)
mongoose.Promise = bluebird

const server = http.Server(app)
const port = process.env.PORT || config.Api.port

server.listen(port, () => {
	console.log('[INFO] Listening on *:' + port)
})
