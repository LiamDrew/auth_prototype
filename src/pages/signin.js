//this will need to be built out link singup.js

import React from 'react';
import { Redirect } from 'react-router-dom';

import md5 from 'md5';

// import Constants from '../utils/constants'

import { Button, TextField } from '@material-ui/core';

// import { NavLink } from 'react-router-dom';



import Cookies from 'universal-cookie';
const cookies = new Cookies();



class LoginData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      first: "",
      email: "",
      username: "",
      password: "",
      emailMatch: null,
      passMatch: null,
      loggedIn: false

    }
    //// NOTE: keeping the first name functionality available
    // this.firstNameChange = this.firstNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.verifyLogin = this.verifyLogin.bind(this);
    this.userNameChange = this.userNameChange.bind(this)
    // this.seeAccount = this.seeAccount.bind(this);

  }

    // firstNameChange(e){
    //   this.setState({first: e.target.value})
    // }

    emailChange(e){
      this.setState({email: e.target.value})
    }

    firstNameChange(e){
      this.setState({first: e.target.value})
    }

    userNameChange(e){
      this.setState({username: e.target.value})
    }

    passwordChange(e){
      this.setState({password: e.target.value})
    }

    verifyLogin(){
      alert('verify login running');
      fetch('http://localhost:8080', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              verify: true,
              profileUpdate: false,
              username: this.state.username,
              password: md5(this.state.password)
            })
          })

      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => {
        console.log('LOGIN CHECK', res.verified);
        console.log('MESSAGE CHECK', res.message);
        if (res.verified === true){
          this.setState({loggedIn: true})
          console.log(this.state.loggedIn)
          cookies.set('userID', this.state.username);
          this.props.checkSignIn(this.state.loggedIn)
        }

        else {
          console.log('not verified')
          if (res.userCorrect === true){
            this.setState({password: ""})
          }

          else {
            this.setState({username: "", password: ""})
          }
        }
          })
    
      return (this.state.loggedIn)
      }

    render(){
      return(
        <div>

      <TextField 
        id="loginPassword" 
        label="Username" 
        variant="outlined" 
        value = {this.state.username}
        onChange = {
          e => this.userNameChange(e)
        }

        />    

        <TextField 
        id="loginPassword" 
        label="Password" 
        variant="outlined" 
        value = {this.state.password}
        onChange = {
          e => this.passwordChange(e)
        }

        />

        {this.props.userSignedIn ?
          <Redirect to="/account"></Redirect>: 
          <Redirect to="/signin"></Redirect>
        }




        <Button variant="contained" color="primary" onClick={this.verifyLogin}>Sign In



        </Button>


        </div>
      )

    }



}

export default LoginData;
