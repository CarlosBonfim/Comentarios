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
  if(!req.body.autor || !req.body.texto){
    return res.status(400).send("Err: Está faltando um dos campos")
  }else if(req.body.texto.length > 120 || req.body.autor.length > 15){
    return res.status(400).send('Err: Tamanho maximo de caracteres atingido')
  }
  const autor = req.body.autor;
  const texto = req.body.texto;
  Postagem.create({autor: autor, texto: texto})
    .then(result =>  res.status(201).send(result))
    .catch(err => res.status(500).send(err))
})

app.put('/posts', (req,res) => {
  if(!req.body.texto){
    return res.status(400).send("Err: Está faltando um dos campos")
  }else if(req.body.texto.length > 120){
    return res.status(400).send('Err: Tamanho maximo de caracteres atingido')
  }
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