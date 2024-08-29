console.log('im on the server');

const express = require('express')
const app = express()

app.use(express.static('./public/potential-robot-shows-app-main'))

app.get('/', function (req, res) {
  res.sendFile('index.html')
})


app.listen(5000)
