const mongoose = require('mongoose');
let _dbpath = "mongodb://localhost/editor";

function Connect() {
    mongoose.connect(_dbpath);
}

exports.Connect = Connect;