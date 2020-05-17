//this will need to be built out link singup.js

import React from 'react';

class Settings extends React.Component {
  //i will need to figure out ids for the delete part
  constructor(props){
    super(props);

    this.state = {
      name: "",
      email: "",
      age: "",
      password: ""
      //add as necessary
    }
    this.deleteAccount = this.deleteAccount.bind(this);
    this.deleteAllAccounts = this.deleteAllAccounts.bind(this);
  }

  callAPI(){
    fetch('http://localhost:8080', {
          method: 'get'
        })
        //I don't understand why this works, but it works
        //this takes the
          .then(res => res.text())
          .then(res => JSON.parse(res))
          .then(res => {
            console.log('recieved', res.test)
          })
    }

  componentDidMount(){
    this.callAPI()
  }

  deleteAllAccounts(){
    fetch('http://localhost:8080/account', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        deleteAll: true,
        deleteID: ''
      }),
    })

    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log('deleting item', res.test)
      // console.log('recieved', res.test)
    })
  }

  deleteAccount(){
    fetch('http://localhost:8080', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        deleteAll: false,
        deleteID: 'myUser'
      }),
    })

    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log('deleting item')
      // console.log('recieved', res.test)
    })

    //don't forget to bind function
  }
  render(){

    return(
      <div>
        <button id="deleteAccount" type="submit" onClick={this.deleteAccount}>Delete Account</button>
        <button id="deleteAccount" type="submit" onClick={this.deleteAllAccounts}>Delete All Accounts</button>
      </div>
    )
  }
}

//change home to positive
const Account = function() {
    return (
       <div>
          <h1>This is your Account</h1>
          <Settings/>
       </div>
    );
}

export default Account;
