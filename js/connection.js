const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/posts'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

const Schema = mongoose.Schema;

const postagemSchema = new Schema({
  autor: String,
  texto: String
})

const Postagem = mongoose.model('Postagem', postagemSchema, 'postagem')


module.exports = {db, Postagem};