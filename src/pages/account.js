
import React from 'react';

// import Constants from '../utils/constants'

import Cookies from 'universal-cookie';

import { Button, TextField } from '@material-ui/core';

// import { Redirect } from 'react-router-dom';

import { NavLink } from 'react-router-dom';





//sets up cookies to be used to find userID
const cookies = new Cookies();

class Settings extends React.Component {
  //i will need to figure out ids for the delete part
  constructor(props){
    super(props);

    this.state = {
      name: "",
      email: "",
      age: "",
      password: "",
      about: ""
      //add as necessary
    }

    //binds functions
    this.deleteAccount = this.deleteAccount.bind(this);
    this.deleteAllAccounts = this.deleteAllAccounts.bind(this);
    this.logOut = this.logOut.bind(this);
    this.aboutChange = this.aboutChange.bind(this)
    this.submitAbout = this.submitAbout.bind(this)
  }


  //store the change to the about input
  aboutChange(e){
    this.setState({about: e.target.value})


  }
  //gets for logging purposes, at the moment, this isnt called
  callAPI(){
    fetch('http://localhost:8080', {
          method: 'get'
        })
        //I don't understand why this works, but it works
        //this takes the
          .then(res => res.text())
          .then(res => JSON.parse(res))
          .then(res => {
            // console.log('recieved', res.test)
            // console.log(cookies.get('newCookie'));

          })
    }

  componentDidMount(){
    // alert('account page loaded')
    // this.callAPI()
  }

  logOut(){
    //this clears the users cookies and redirects them to the signin page
    alert('logging out')
    let mycooks = cookies.getAll()
    console.log(cookies.getAll())

    for (let i = 0; i < Object.keys(mycooks).length; i++){
      cookies.remove(Object.keys(mycooks)[i])
    }
    console.log(cookies.getAll())
    // console.log('logged in state', this.state.loggedIn)
    // this.setState({loggedIn: false})

    this.props.checkSignIn(false);

    
    
  }

  submitAbout(){
    //this allows the user to submit their profile description to the server/database
    console.log('update about called', cookies.get('userID'))
    fetch('http://localhost:8080', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        profileUpdate: true,
        about: this.state.about,
        username: cookies.get('userID')


      })
    })

    alert('About description Submitted!')
    this.setState({about: ""})

  }

  deleteAllAccounts(){
    //this function is only available to the admin account
    //as noted in the comments on server.js, this poses a major security risk, but in the development phase, is useful for clearing the database
    console.log('DELETE ALL CALLED')
    fetch('http://localhost:8080/account', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        deleteAll: true,
        deleteID: ''
      })
    })

    .then(res => res.text())
    // .then(res => JSON.parse(res))
    .then(res => {
      console.log('deleting item', res.test)
      // console.log('recieved', res.test)
    })
  }

  deleteAccount(){
    //this ges called when the user wants to delete their own account
    console.log('deleting', cookies.get('userID') )
    fetch('http://localhost:8080/account', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        deleteAll: false,
        deleteID: cookies.get('userID')
      })
    })

    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log('deleting item')
      console.log('recieved', res.test)
    })


  }
  render(){

    return(
      <div>
        <Button variant="contained" color="primary" onClick={this.logOut}><NavLink className = "logout" to="/">Log Out</NavLink> </Button>

        <Button variant="contained" color="primary" onClick={this.deleteAccount}>
        <NavLink className = "deleteAccount" to="/signin">Delete Account</NavLink>

        </Button>

        <TextField 
        id="about" 
        label="About Me" 
        variant="outlined" 
        value = {this.state.about}
        onChange = {
          e => this.aboutChange(e)
        }

        />
        <Button variant="contained" color="primary" onClick={this.submitAbout}>Submit About</Button>


        
        {this.name === "admin"?
        <Button variant="contained" color="primary" onClick={this.deleteAllAccounts}>Delete All Accounts</Button>:
        <br></br>
        }   


      </div>
    )
  }
}


export default Settings;
