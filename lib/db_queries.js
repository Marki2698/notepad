const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model');
mongoose.Promise = global.Promise;

function createUser(body) {
    userModel.find((err, doc) => {
        if (err) console.log(err);
        userModel.create(
            [{
                id: doc.length + 1,
                email: body.up_email,
                password: body.up_pass,
                name: body.name,
                surname: body.surname,
                folder: body.up_email,
                secret: body.secret_word,
                block: false
            }],
            (err, docs) => {
                if (err) {
                    console.log(err);
                    res.send('Something went wrong! Try again.');
                }
                console.log(docs);
            });
    });
}

exports.createUser = createUser;