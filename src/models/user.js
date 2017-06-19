import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
	facebookid: {
		type: String,
		unique: true,
		default: null
	},
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String
	},
	role: {
		type: String,
		enum: ['Client', 'Manager', 'Admin'],
		default: 'Client'
	}
}, {
	timestamps: true
})

UserSchema.pre('save', function (next) {
	if (this.password) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				return next(err)
			}
			bcrypt.hash(this.password, salt, (err, hash) => {
				if (err) {
					return next(err)
				}
				this.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.methods.comparePassword = function (pw, cb) {
	bcrypt.compare(pw, this.password, (err, isMatch) => {
		if (err) {
			return cb(err)
		}
		cb(null, isMatch)
	})
}

export default mongoose.model('User', UserSchema)
