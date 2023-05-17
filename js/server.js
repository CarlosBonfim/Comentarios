const {db, Postagem} = require('./connection')
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;

app.use(bodyParser.json());
app.use(cors());


app.get('/posts', (req,res) => {
  Postagem.find()
    .then(postagens => res.send(postagens))
    .catch(err => res.status(500).send(err))
})

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  Postagem.findById(id)
    .then(postagens => res.send(postagens))
    .catch(err => res.status(500).send(err))
})

app.post('/posts', (req, res) => {
  const autor = req.body.autor;
  const texto = req.body.texto;
  Postagem.create({autor: autor, texto: texto})
    .then(result =>  res.status(201).send(result))
    .catch(err => res.status(500).send(err))
})

app.put('/posts', (req,res) => {
  const texto = req.body.texto;
  const _id = req.body.id
  Postagem.findByIdAndUpdate(_id, {texto})
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).send(err))
})

app.delete('/posts', (req, res) => {
  const id = req.body._id;
  Postagem.findByIdAndDelete(id)
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).send(err))
})

app.listen(port, () => {
  console.log(`Esta executando na porta ${port}`)
})