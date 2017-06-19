import express from 'express'
import bodyParser from 'body-parser'
import nodeNotifier from 'node-notifier'
import errorhandler from 'errorhandler'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'

import routes from 'routes'
import { JwtStrategy, FacebookStrategy } from 'strategies'

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler({ log: errorNotification }))
}

function errorNotification (err, str, req) {
	if (err) {
		let title = 'Error in ' + req.method + ' ' + req.url

		nodeNotifier.notify({
			title: title,
			message: str
		})
	}
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(cors())
app.use(passport.initialize())
app.use(morgan('dev'))

JwtStrategy(passport)
FacebookStrategy(passport)

app.use('/', routes)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

export default app
