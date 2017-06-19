import jwt from 'jsonwebtoken'
import config from 'config'

const generateToken = (user) => {
	let { _id, username } = user
	let token = jwt.sign({ _id, username }, config.Api.secret, {
		expiresIn: 60 * 60 * 24 * 30
	})
	return token
}

export {
	generateToken
}
