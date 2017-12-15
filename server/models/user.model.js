const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    florist: {
        type: Schema.Types.ObjectId,
        ref: 'Florist'
    },
    isAdmin: {
        type: Boolean
    }

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}

module.exports.getUserById = function (ID, callback) {
    User.findById(ID, callback)
}

module.exports.getUserByEmail = function (email, callback) {
    User.findOne({ 'email': email }, callback)
}

module.exports.comparePassword = function (checkPassword, hash, callback) {
    bcrypt.compare(checkPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch)
    });
}