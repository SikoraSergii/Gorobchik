const config = require('./config');
const mongoose = require('mongoose');

module.exports = function () {
    const db = mongoose.connect(config.db)
        .then(
            () => { console.log(`DB connected on ${config.db}`) },
            (err) => { console.log(`Error: ${err.message || err}`) }
        );
    

    require('../server/models/user.model');
    require('../server/models/florist.model');
    require('../server/models/tags.model')

    return db;
}