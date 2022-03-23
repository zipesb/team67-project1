const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let Class = require('./class.model');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})


// Endpoint to add a new class
app.post("/create", async (req,resp) => {
    // Create a new Class document using the JSON of request's body
    let newclass = new Class(req.body);
    // Save the document to database
    newclass.save()
      // Callback functions
      .then(newclass => {
        resp.status(200).send('Class added succesfully');
      })
      .catch(err => {
        resp.status(400).send('Failed to add class');
      });
});

// Endpoint to get an existing class' info
app.get("/:id", async (req,resp) => {
    let id = req.params.id;
    Class.findById(id, function(err, foundclass) {
      if(!foundclass)
        resp.status(404).send('Class data not found');
      else
        resp.json(foundclass);
    });
})