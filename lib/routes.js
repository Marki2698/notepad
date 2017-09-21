const express = require('express');
const session = require("express-session");
const router = express.Router();
const multer = require('multer');
const upload = multer();
const stream = require('./streams');
const fs = require("fs");

let user_sess;
router.get('/', (req, res, next) => {
    res.render('welcome');
});

router.post('/create', upload.array(), (req, res, next) => {
    let text = req.body.text;
    let name = req.body.name;
    let clientF = req.body.folder;
    console.log(name, clientF);
    let file = stream.Create(name, clientF, text);
    file.then(function(fulfilled) {
        res.send(fulfilled);
    }, function(reason) {
        console.error(reason + " is a reason ");
    });
});

router.get('/files/:folder/:file', upload.array(), (req, res, next) => {
    let folder = './files/';
    let path = "." + req.originalUrl;
    res.download(path, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("downloaded");
            if (req.params.folder == "temp") {
                stream.RemoveFile(req.params.folder, req.params.file).then(function(fulfilled) {
                    console.log(fulfilled);
                }, function(reason) {
                    console.error(reason);
                });
            }
        }
    });
});

router.post('/upload', upload.single('file-5'), (req, res, next) => {
    let file = {
        filename: req.file.originalname,
        data: req.file.buffer.toString("utf-8")
    };
    res.send(file);
});

module.exports = router;