const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const UserModel = require('./models/Users');
const ClassModel = require('./models/Class');
const resourceRoutes = require('./routes/resource');
const passport = require("passport");
const users = require("./routes/api/users");

require('dotenv').config();
const app = express();
const socketServer = require("./socket_server")(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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
app.post('/updateRating', async(req, res) =>{
  const newRating = req.body.newRating
  const id = req.body.id
  
    ClassModel.findByIdAndUpdate(id, {"rating" : newRating}, function(error, result){
     if (error) {
       console.log("error",error);
       res.send(error);
       
     }
     else {

     }

     //  ratingToUpdate.rating = [...ratingToUpdate.rating, newRating];
     //  ratingToUpdate.save()
    })
  res.send("updated");
})


 app.post('/updateRatingAvg', async(req, res) =>{
  const newRating = req.body.newRating
  const id = req.body.id
 
    ClassModel.findByIdAndUpdate(id, {"ratingAvg" : newRating}, function(error, result){
     if (error) {
       console.log("error",error);
       res.send(error);
      
     }
     else {
     }

     //  ratingToUpdate.rating = [...ratingToUpdate.rating, newRating];
     //  ratingToUpdate.save()
    }) 
  res.send("updated");
})




app.get("/getOwnedClasses", (req, res)=>{
  ClassModel.find({owner: req.query.owner})
  .sort({ date: -1 })
  .then(classes => res.json(classes));
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.use('/api/resource', resourceRoutes);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})

socketServer.listen(5001, () => {
  console.log("Socket.io Server Running");
});
