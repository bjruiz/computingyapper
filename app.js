console.log('im on the server');

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Node from express on local dev box')
})

app.listen(5000)
