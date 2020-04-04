//copied from todolist project, to be changed

let mongoose = require('mongoose');
let itemModel = require('./schema/profile')

//this server will likely need to be changed
const server = '127.0.0.1:27017';
const database = 'items';      // REPLACE WITH YOUR DB NAME (unless it's items!)

class Database {
  constructor() {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    this._connect()
  }

_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()
