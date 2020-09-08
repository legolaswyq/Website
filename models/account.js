//modify account collection
const mongoose = require('./db');
mongoose.set('useCreateIndex', true);

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
    }
});

const AccountModel = mongoose.model('AccountModel', AccountSchema, 'account');



module.exports = AccountModel;