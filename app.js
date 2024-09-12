console.log('im on the server');

require('dotenv').config()
const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
// const { urlencoded } = require('body-parser')
// const { ObjectId } = require('mongodb')
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

//function wtvNameOfIt(params){}
//whatever() =>{}
//iife?

app.get('/mongo', async(req, res) =>{
  console.log("in /mongo");
  //await
  await client.connect();
  console.log("connected");
  // Send a ping to confirm a successful connection
  let result = await client.db("brendasDB").collection("whatever-collection")
  .find({}).toArray();
  console.log(result);

  res.render('mongo', {
    mongoResult: result[0].post
  });
})

app.get('/', function (req, res) {
  res.sendFile('index.html')
})

app.get('/ejs', (res, req)=>{
  ``
  res.render('/index',{
    myServerVariable : "something from server"
  });

//can you get content from client...to console?

})

app.get('/read', async (req,res)=>{

  console.log('in /read');
  await client.connect();
  
  console.log('connected?');
  // Send a ping to confirm a successful connection
  
  let result = await client.db("brendasDB").collection("whatever-collection")
    .find({}).toArray(); 
  console.log(result); 

  res.render('mongo', {
    mongoResult : result
  });

})


app.get('/insert', async(req, res)=>{
  console.log("in /insert");
  //await
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("brendasDB").collection("whatever-collection")
  .insertOne({post:'hardcoded post insert'});

  res.render('insert');
});

// app.get('/update', async(req, res)=>{
//   console.log("in /update");

//   let result = await client.db("brendasDB").collection("whatever-collection")
//     .find({}).toArray(); 

//   res.render('update', {
//     postData: result
//   });
  
//   //await
//   await client.connect();
//   // Send a ping to confirm a successful connection
//   await client.db("brendasDB").collection("whatever-collection")
//   .findOneAndUpdate(
//     {$set: {"post": "another day "}},
//     {$set: {"post": "another another day "}}
  
//   );

  

// })


app.listen(5000)
