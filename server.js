process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose')
const configureExpress = require('./config/express');

const express = require('express');

const users = require('./server/routes/users.routes');
const items = require('./server/routes/items.routes');

const db = configureMongoose();
const app = configureExpress();

// Port Number
const port = 3000

// Static Folder
//app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static('./public'));

app.use('/users', users);
app.use('/items', items);

app.listen(port, () => {
    console.log('Server running on localhost:3000')    
});

module.exports = app;

