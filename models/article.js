const mongoose = require('./db');

const ArticleSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require:true
    }
});

const ArticleModel = mongoose.model('Article', ArticleSchema,'articles');

module.exports = ArticleModel;