// Initializes express app
const express = require('express');

// const session = require('express-session');

const cookieParser = require('cookie-parser')

const app = express();


app.use(express.json());

app.use(cookieParser());

// Allows cross origin communication
const cors = require('cors');
app.use(cors());

let database = require('./database');
let profileSchema = require('./schema/profile.js')




//get function, used for loading user profiles on the home page
app.get('/', function(req,res,next){

  console.log("gethappend")
  profileSchema.find()
  .then(doc =>{
    res.send({profiles: doc})


  })
  console.log('sends message')
})


//the post function is by far the most important CRUD command for this project.
//it get used to create accounts, log users in, and update their profiles when they add descriptions about themselves
app.post('/', function(req, res, next){

  console.log('POST CALLED')

  //login auth. This searches for a username in the database, checks to see if passwords match, and returns verified as true or false
  //usernames in the database are clearText, passwords are encrypted with md5 hashing. The database doesn't store the user's cleartext password
  if (req.body.verify === true){
    profileSchema.find({username: req.body.username})
    .then(doc => {
      if (doc.length > 0){
        console.log(doc.length)
        if (req.body.password === doc[0].password){
          res.send({
            verified: true,
            userCorrect: true,
            passCorrect: true
          })
        }
  
        else{
          res.send({
            verified: false,
            userCorrect: true,
            passCorrect: false,
            message: 'password incorrect'
          })
        }
      }

      else {
        res.send({
          verified: false,
          userCorrect: false,
          passCorrect: false,
          message: 'username not found'
        })
      }

    })
  }

//this code runs if the user creates a new account
  else if (req.body.verify === false){
    console.log('REQUEST NEW ACCOUNT MADE ')
    console.log('username', req.body.username)
    profileSchema.find()
    .then(doc =>{
      console.log('doc', doc)
    })

    //checking to see if an account with the same username already exists
    profileSchema.find({username: req.body.username})
    .then(doc =>{
      console.log(doc.length)
      if (doc.length > 0){
        //account already exists
        res.send({test: 'account already exists'})
      }

      else {
        //if the username is unique, a new account is made and saved to the database.

        console.log('ACCOUNT MAKING RUNNING')
        let account = new profileSchema({
          admin: false,
          name: req.body.first,
          username: req.body.username,
          email: req.body.email,
          age: req.body.age,
          password: req.body.password,
          about: ""
        })
      
        //sends the data back to the client for logging purposes
        account.save()
        .then(() =>{
          profileSchema.find()
          .then(doc =>{
            res.send({test: account})
          })
        })
      
        //create new item model once I have the backend hooked up
      
        console.log(req.body.account)

      }
    })

  }

  //the final function executed by post is the database update. When a user updates their profile description after creating an account, this code updates the database
  else if (req.body.profileUpdate === true){
    console.log("update about running")

    //see mongo documentation for update methods:
    //https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/

    profileSchema.updateOne(
      {username: req.body.username}, 
      {$set: {about: req.body.about}},
      {upsert: true}
      )
    // finds the profile by its unique username, sets the about property to the data entered client side, and sets upsert: true
    //upsert tells the database whether to create a new profileSchema or to update an old one

    //logging results for debugging purposes
    .then(() => {
      profileSchema.find()
      .then(doc => {
        console.log(doc, 'line 154, update?')
      })
    })



  }
})

//delete functions are used for deleting accounts
app.delete('/account', function(req, res, next){
  console.log('delete GETTING called')
  //only the admin account can run this function.
  //if i was publishing this project for real, I would take out this code, as it poses a huge security risk
  //however, for clearing the database after mistakes, this turned out to be quite useful
  if (req.body.deleteAll === true){
    profileSchema.deleteMany({admin: false})
    // profileSchema.deleteMany()
    .then(() =>{
      profileSchema.find()
      .then(doc => {
        res.send({test: doc})
      })
    })
  }

  else{
    //this code deletes only the user's individual account
    console.log(req.body.deleteID, typeof(req.body.deleteID))
    profileSchema.find({username: req.body.deleteID})


    profileSchema.deleteOne({username: req.body.deleteID})
    .then((doc) =>{
      console.log(doc, 'line 185')
    })

    console.log('deleted an account')
  }
})



//listens on localhost 8080
app.listen(8080, function(){
  console.log('listening on 8080')
})
