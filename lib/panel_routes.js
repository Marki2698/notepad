const express = require('express');
const mongoose = require('mongoose');
const user = require('./model');
const stream = require('./streams');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.get('/getList', upload.array(), (req, res, next) => {
    console.log(req.query.folder);
    let tree = stream.GetList(req.query.folder);
    tree.then(function(onfulfilled) {
        res.send(onfulfilled);
    }, function(reason) {
        console.error(reason);
    });
});

router.get('/getUserFile', upload.array(), (req, res, next) => {
    console.log(req.query);
    let content = stream.GetUserFile(req.query.filename, req.query.folder);
    content.then((onfulfilled) => {
        res.send(onfulfilled);
    }, (reason) => {
        console.error(reason);
    });
});

router.post('/modify', upload.array(), (req, res, next) => {
    let name = req.body.name;
    console.log(name, req.body.folder);
    let modify = stream.Create(req.body.name, req.body.folder, req.body.text);
    modify.then(function(fulfilled) {
        res.send(fulfilled);
    }, function(reason) {
        console.error(reason);
    });
    //console.log(path, name);
    //res.send([path, name]);
});

router.post('/createUserFile', upload.array(), (req, res, next) => {
    let filename = req.body.filename;
    let clientfolder = req.body.folder;
    let created = stream.Create(filename, clientfolder);
    created.then(function(fulfilled) {
        res.send(fulfilled);
    }, function(reason) {
        console.error(reason);
    });
    //let cre = stream.AnotherCreate(filename, clientfolder);
});

router.post("/rename-file", upload.array(), (req, res, next) => {
    let status = stream.RenameFile(req.body.old, req.body.new, req.body.folder);
    status.then(function(fulfilled) {
        res.send(fulfilled);
    }, function(reason) {
        console.error(reason);
    });
});

router.delete("/remove-file", (req, res, next) => {
    let status = stream.RemoveFile(req.body.folder, req.body.name);
    status.then(function(fulfilled) {
        res.send(fulfilled);
    }, function(reason) {
        console.error(reason);
    });
});

module.exports = router;