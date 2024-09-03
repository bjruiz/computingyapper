console.log('im on the server');

const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public/potential-robot-shows-app-main'))


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.uri;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


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
