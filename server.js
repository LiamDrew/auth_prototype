// Initializes express app
const express = require('express');

const session = require('express-session');
const app = express();
//I kinda threw this together from my code for sockets, not sure exactly what I need
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const path = require('path')
app.use(express.json());

app.use(session({
  name: 'session-id',
  timestamp: '',
  username: '',
  secret: 'quiet', 
  saveUninitialized: true, 
  resave: true
}));

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
  console.log(req.session);
  console.log("gethappend")
  // res.send({test: 'unique server message2'})
  profileSchema.find()
  .then(doc =>{
    res.send({test: doc})
  })
  console.log('sends message')
})


app.post('/', function(req, res, next){
  req.session.timestamp = Date.now();
  console.log(req.session)
  console.log('POST CALLED')
  if (req.body.verify === true){
    profileSchema.find()
    .then(doc => {

      for (let i = 0; i<doc.length; i++){
        if (req.body.name === doc[i].name){
          if (req.body.password === doc[i].password){
            req.session.username = req.body.name;
            res.send({
              verified: true,
              message: 'none',
              cookie: req.session
            })
          }

          else {
            res.send({
              verified: false,
              message: 'password incorrect',
              cookie: req.session
            })
          }
        }

        else if ((req.body.name !== doc[i].name) && (i===doc.length-1)){
          res.send({
            verified: false,
            message: 'username not found'
          })
        }
      }

    })

  }

  else {
    console.log('post happened')
    console.log(req.body.name)

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

// app.put('/', function(req, res, next){
//   console.log('put happened')
//   console.log(req.body.name)
// })

app.delete('/accounts', function(req, res, next){
  if (req.body.deleteAll == true){
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
