const express = require('express');
const path = require('path')
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport')

module.exports = function () {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport')(passport);

    app.use(methodOverride());
    app.use(cors())

    // Static Folder
    //app.use(express.static(path.join(__dirname,'public')));
    app.use(express.static('./public'));
    

    return app



}