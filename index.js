const express = require('express');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;


const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ghjps.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.COLLECTION_NAME}`);

  const product = {name: "modhu", price: 25, quantity: 20}
  collection.insertOne(product)
  .then(res => {
    console.log('one product added');
  })
  console.log('database connected');
});


app.listen(5000);