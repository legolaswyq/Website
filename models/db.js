//connect to database
const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/treehole";

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

module.exports = mongoose;

