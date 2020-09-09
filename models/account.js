//modify account collection
const mongoose = require('./db');
mongoose.set('useCreateIndex', true);
const md5 = require('md5');

const AccountSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "common"
    }
});

const AccountModel = mongoose.model('AccountModel', AccountSchema, 'account');

// let rootUser = {
//     username: 'root',
//     email: 'root@gamil.com',
//     password: md5('123'),
//     role: 'admin'
// }

// let root = new AccountModel(rootUser);
// root.save();


module.exports = AccountModel;