const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const connection = require('./lib/connection');
//connection.Connect();
app.use(express.static("public"));
const body_parser = require('body-parser');
app.set('view engine', 'pug');
app.use(body_parser.urlencoded({ extended: false }));
app.use(require('./lib/routes')); // public routes
connection.Connect();
app.use(session({
    secret: 'some secret here',
    resave: false,
    saveUninitialized: false
}));
//app.use(session({ secret: "texteditor" }));
app.use(require('./lib/sign_routes')); // sign routes
app.use(require('./lib/panel_routes')); // panel routes
app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('listening on : 3000 port');
});