//modify account collection
const mongoose = require('./db');

const AccountSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const AccountModel = mongoose.model('AccountModel', AccountSchema,'account');

module.exports = AccountModel;