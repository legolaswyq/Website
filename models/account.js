//modify account collection
const mongoose = require('./db');

const AccountSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const AccountModel = mongoose.model('AccountModel', AccountSchema,'account');

module.exports = AccountModel;