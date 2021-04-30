const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ghjps.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.COLLECTION_NAME}`);

  app.get('/products', (req, res) => {
    collection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    collection.insertOne(product)
    .then(result => {
      console.log('data added successfully');
      res.send('success')
    })
  })
  console.log('database connected');
});


app.listen(5000);