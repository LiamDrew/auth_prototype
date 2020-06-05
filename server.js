// Initializes express app
const express = require('express');

// const session = require('express-session');

const cookieParser = require('cookie-parser')

const app = express();


//I kinda threw this together from my code for sockets, not sure exactly what I need
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const path = require('path')


app.use(express.json());

app.use(cookieParser());

// Allows cross origin communication
const cors = require('cors');
app.use(cors());

let database = require('./database');
let profileSchema = require('./schema/profile.js')


function createMaster(){
  let master = new profileSchema({
    admin: true,
    name: 'admin',
    password: 'password'
  })

  master.save()

  return (master)
}


//i will need to import the database and schema at some point, but not yet


app.get('/', function(req,res,next){
  res.cookie('myname', 'cookievalue', {
  })
  console.log("gethappend")
  profileSchema.find()
  .then(doc =>{
    res.send({test: doc})


  })
  console.log('sends message')
})


app.post('/', function(req, res, next){

  console.log('POST CALLED')

  if (req.body.verify === true){
    profileSchema.find({name: req.body.name})
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

  else {
    console.log('REQUEST NEW ACCOUNT MADE ')
    console.log(req.body.name)

    profileSchema.find({name: req.body.name})
    .then(doc =>{
      console.log(doc.length)
      if (doc.length > 0){
        //account already exists
        res.send({test: 'account already exists'})
      }

      else {
        let account = new profileSchema({
          admin: false,
          name: req.body.name,
          // email: req.body.email,
          // age: req.body.age,
          password: req.body.password
        })
      
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
})

// app.put('/', function(req, res, next){
//   console.log('put happened')
//   console.log(req.body.name)
// })

app.delete('/account', function(req, res, next){
  console.log('delete GETTING called')
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
    profileSchema.deleteOne({name: req.body.deleteID})

    // account.findOneAndRemove({name: req.body.deleteID})

    //delete one:
    //at this point, I need to figure out ids
    //without ids, this wont work
    console.log('will be deleting one')
    // .then(() => {
    //   profileSchema.find()
    //   .then(doc => {
    //     res.send({test: doc})
    //   })
    // })
  }
})




app.listen(8080, function(){
  console.log('listening on 8080')
})
