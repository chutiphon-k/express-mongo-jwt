import Strategy from 'passport-facebook-token'
import config from 'config'

import { User } from 'models'

let FacebookStrategy = (passport) => {
	passport.use('facebook-token', new Strategy({
		clientID: config.Facebook.clientID,
		clientSecret: config.Facebook.clientSecret,
		profileFields: ['id', 'emails', 'picture', 'verified', 'first_name', 'last_name']
	}, (accessToken, refreshToken, profile, done) => {
		let { verified, id, first_name, last_name } = profile._json
		User.findOne({ facebookid: id }, (err, user) => {
			if (err || !verified) return done(err, false)

			if (!user) {
				let newUser = new User({
					facebookid: id,
					username: `${first_name} ${last_name}`
				})
				newUser.save((err, user) => {
					if (err) return done(err, false)

					done(null, user)
				})
			} else {
				done(null, user)
			}
		})
	}))
}

export default FacebookStrategy
