const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    folder: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true,
        unique: true
    },
    block: {
        type: Boolean,
        required: true
    },
    log: {
        type: [String],
        required: false
    }
});

const UserModel = mongoose.model("users", UserSchema);
//exports.user = UserModel;
module.exports = UserModel;