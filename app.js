require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://bjruiz:${process.env.MONGO_PWD}@cluster0.rbl2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('./public/potential-robot-shows-app-main'))

console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (req, res) => {

  const shows = await client.db("brendasDB").collection("shows-collection").find().toArray();
  console.log("Shows fetched from DB:", shows);
  res.render('index', {
    showsApp: { title: 'Shows to Watch App' },
    showsList: shows
  });
});

app.post('/insert', async (req, res) => {
  console.log('in /insert');
  const newShow = {
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    platform: req.body.platform,
    watched: req.body.watched === 'true'
  };
  await client.connect();
  await client.db("brendasDB").collection("shows-collection")
    .insertOne(newShow);
  res.redirect('/');
});

app.post('/update/:id', async (req, res) => {
  const showId = req.params.id;
  const updatedShow = {
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    platform: req.body.platform,
    watched: req.body.watched
  };
  client.connect();
  const collection = client.db("brendasDB").collection("shows-collection");
  let result = await collection.findOneAndUpdate(
      { _id: new ObjectId(showId) },
      { $set: updatedShow }
    )
    .then(result => {
      res.redirect('/');
    })
});


app.post('/delete/:id', async (req, res) => {
  const showId = req.params.id;
    client.connect();
    const collection = client.db("brendasDB").collection("shows-collection");
    let result = await collection.findOneAndDelete(
      { _id: new ObjectId(showId) })
    .then(result => {
      res.redirect('/');
    })
});

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});