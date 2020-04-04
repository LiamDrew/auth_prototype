// Initializes express app
const express = require('express');
const app = express();
//I kinda threw this together from my code for sockets, not sure exactly what I need
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const path = require('path')
app.use(express.json());

// Allows cross origin communication
const cors = require('cors');
app.use(cors());

let database = require('./database');
let profileSchema = require('./schema/profile.js')

//i will need to import the database and schema at some point, but not yet


app.get('/', function(req,res,next){
  console.log("gethappend")
  // res.send({test: 'unique server message2'})
  profileSchema.find()
  .then(doc =>{
    res.send({test: doc})
  })
  console.log('sends message')
})


app.post('/', function(req, res, next){
  console.log('post happened')

  let account = new profileSchema({
    task: req.body.account
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
})

app.delete('/', function(req, res, next){
  if (req.body.deleteAll == true){
    profileSchema.deleteMany()
    .then(() =>{
      profileSchema.find()
      .then(doc => {
        res.send({test: doc})
      })
    })
  }

  else{
    account.findOneAndRemove({name: req.body.deleteID})

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
