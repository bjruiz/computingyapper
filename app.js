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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client;
async function connectToDb() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    console.log('im on the server:)');
  }
  return client;
}

app.get('/', async (req, res) => {
  try {
    const client = await connectToDb();
    const shows = await client.db("brendasDB").collection("shows-collection").find().toArray();
    console.log("Shows fetched from DB:", shows);
    res.render('index', {
      showsApp: { title: 'Shows to Watch App' },
      showsList: shows
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('error retrieving shows');
  }
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
  try {
    const client = await connectToDb();
    await client.db("brendasDB").collection("shows-collection")
      .insertOne(newShow);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('error adding show');
  }
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
  try {
    const client = await connectToDb();
    await client.db("brendasDB").collection("shows-collection")
      .findOneAndUpdate(
        { _id: new ObjectId(showId) },
        { $set: updatedShow }
      );
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('error updating show');
  }
});


app.post('/delete/:id', async (req, res) => {
  const showId = req.params.id;
  try {
    const client = await connectToDb();
    await client.db("brendasDB").collection("shows-collection")
      .findOneAndDelete({ _id: new ObjectId(showId) });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('error deleting show');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});