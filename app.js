require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://bjruiz:${process.env.MONGO_PWD}@cluster0.rbl2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; 

app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('./public/potential-robot-shows-app-main'))

console.log(uri);
console.log('im on the server:)')

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

app.get('/', (req, res)=>{
  
  res.render('index',{
    myServerVariable
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

  res.render('read', {
    postData: result
  });

})


app.post('/insert', async(req, res)=>{
  console.log('in /insert');

  console.log('request', req.body);
  console.log('request', req.body.newPost);


  await client.connect();
  await client.db("brendasDB").collection("whatever-collection")
  .insertOne({post: req.body.newPost});

  res.redirect('read');
});

app.post('/update/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("brendasDB").collection("whatever-collection");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"post": "NEW POST" } }
)
.then(result => {
  console.log(result); 
  res.redirect('/read');
})
});

app.post('/delete/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("brendasDB").collection("whatever-collection");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)})

.then(result => {
  console.log(result); 
  res.redirect('/read');
})


})

//app.listen(5000);

app.listen(PORT, () =>{
  console.log(`Server is running & listening on port ${PORT}`);
});