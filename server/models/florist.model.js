const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FloristSchema = new Schema({
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
    isAdmin: {
        type: Boolean
    }

});

const Florist = module.exports = mongoose.model('Florist', FloristSchema);


module.exports.getUserById = function (ID, callback) {
    Florist.findById(ID, callback)
}