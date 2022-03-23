const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const ClassModel = require('./models/Class');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let Class = require('./class.model');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);

app.get("/getUsers", (req, res)=>{
  UserModel.find({}, (err, result)=>{
      if(err){
          res.json(err);
      } else {
          res.json(result);
      }
  } );
});

app.post("/createUser", async(req,res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
})
app.get("/getClasses", (req, res)=>{
  ClassModel.find({}, (err, result)=>{
      if(err){
          res.json(err);
      } else {
          res.json(result);
      }
  } );
});

app.post("/createClass", async(req,res) => {
  const class1 = req.body;
  const newClass = new ClassModel(user);
  await newClass.save();

  res.json(class1);
})




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