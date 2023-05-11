const {db, Postagem} = require('./connection')
const express = require('express')
const app = express()

const cors = require("cors");

const port = 3000;

app.use(cors());


app.get('/posts', (req,res) => {
  Postagem.find()
    .then(postagens => res.send(postagens))
    .catch(err => res.status(500).send(err))
})

app.listen(port, () => {
  console.log(`Esta executando na porta ${port}`)
})