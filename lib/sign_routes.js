const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userModel = require('./model');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const crypto = require('crypto'); // should make crypted passwords
const db = require('./db_queries');
const stream = require('./streams');
let user = userModel;
let user_session;
router.post('/signIn', upload.array(), (req, res, next) => {
    console.log(req.url);
    user.find((err, docs) => {
        if (err) console.log(err);
        if (docs.length == 0) res.render('error', {
            title: "error",
            message: "there are no users. Please sign Up"
        });
        else if (docs.length != 0) {
            //sign in
            user_session = req.session;
            user.findOne({ email: req.body.email }, (err, doc) => {
                if (err) {
                    res.render('error', {
                        title: "error",
                        message: "you should sign up before"
                    });
                }
                if (typeof doc.password === null) {
                    res.send('password or email not matched');
                } else if (doc.password != req.body.pass) {
                    res.send('password or email not matched');
                } else if (doc.password == req.body.pass) {
                    user_session.email = req.body.email;
                    user_session.fullname = doc.name + " " + doc.surname;
                    user_session.folder = doc.folder;
                    console.log('start session');
                    res.redirect('/panel');
                }
            });
        }
    });
});

router.post('/signUp', upload.array(), (req, res, next) => {
    user_session = req.session;
    console.log(req.url);
    delete req.body.repeat_pass;
    delete req.body.up;
    user_session.email = req.body.up_email;
    user_session.folder = req.body.up_email;
    user_session.fullname = req.body.name + " " + req.body.surname;
    stream.CreateDir(req.body.up_email);
    db.createUser(req.body);
    console.log('start session');
    res.redirect('/panel');
});

router.post('/logout', (req, res, next) => {
    console.log(req.url);
    user_session = undefined;
    console.log('end session');
    res.redirect('/');
});

router.get('/panel', (req, res, next) => {
    if ("undefined" === typeof user_session) {
        res.render('error', {
            title: "error",
            message: "you should login or sign up"
        });
    } else if (user_session.email) {
        res.render("user", {
            title: user_session.email,
            name: "Hello, " + user_session.fullname,
            folder: user_session.folder
        });
    }
});

module.exports = router;