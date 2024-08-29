console.log('im on the server');

const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public/potential-robot-shows-app-main'))

app.get('/', function (req, res) {
  res.sendFile('index.html')
})

app.get('/ejs', (res, req)=>{
  ``
  res.render('index',{
    myServerVariable : "something from server"
  });

//can you get content from client...to console?

})



app.listen(5000)
