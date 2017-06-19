import { Strategy } from 'passport-facebook'

import { User } from 'models'

let facebookStrategy = (passport) => {
	passport.use('facebook', new Strategy({
		clientID: '1559210274103122',
		clientSecret: '4a0a4715b7bd94d12b3409c6ce872bb3',
		callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
		profileFields: ['id', 'emails', 'picture', 'verified', 'first_name', 'last_name']
	}, (accessToken, refreshToken, profile, cb) => {
		User.findOne({ facebookid: profile._json.id }, (err, user) => {
			if (err) return cb(err, false)

			if (!user && profile._json.verified) {
				let newUser = new User({
					facebookid: profile._json.id,
					username: `${profile._json.first_name} ${profile._json.last_name}`
				})
				newUser.save((err, user) => {
					if (err) return cb(err, false)
					cb(null, user)
				})
			} else {
				cb(null, user)
			}
		})
	}))
}

export default facebookStrategy
