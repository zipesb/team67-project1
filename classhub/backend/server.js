
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const ClassModel = require('./models/Class');
const resourceRoutes = require('./routes/resource');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
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

app.get("/getClass/:id", (req, res)=>{
  const id = req.params.id;
  ClassModel.findById(id, function(err, result) {
      if(err){
          res.json(err);
      } else {
          res.json(result);
      }
  } );
});

app.post("/createClass", async(req,res) => {
  const newClass = new ClassModel(req.body);
  await newClass.save();

  res.json(newClass);
})

app.post("/updateClassContent", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.id);
  const content = req.body.htmlContent;
  ClassModel.findByIdAndUpdate(id, { "htmlContent": content }, function (err, result) {
    if (err) {
      console.log(err);
      res.send(err);
      
    }
    else {
      console.log(result);
      res.send(result);
    }
  })
})


app.use('/api/resource', resourceRoutes);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})
