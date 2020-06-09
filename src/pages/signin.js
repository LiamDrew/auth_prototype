
import React from 'react';
import { Redirect } from 'react-router-dom';

import md5 from 'md5';


import { Button, TextField } from '@material-ui/core';



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
//binds functions
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.verifyLogin = this.verifyLogin.bind(this);
    this.userNameChange = this.userNameChange.bind(this)
    // this.seeAccount = this.seeAccount.bind(this);

  }

    // firstNameChange(e){
    //   this.setState({first: e.target.value})
    // }

    //set state functions

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
      //verifies login by sending the input username and password to the server
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
          //password is send the server hashed. The database only stores the hashed password
          //the beauty of hashing is that encrypting the same data will give you the same output every time
          //therefore, the cleartext cant be decoded but the outputs can be compared.

      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => {
        console.log('LOGIN CHECK', res.verified);
        console.log('MESSAGE CHECK', res.message);
        //if the server verifies the user login, I execute this code:
        if (res.verified === true){
          this.setState({loggedIn: true})
          console.log(this.state.loggedIn)
          //I set this userID cookie, which can be accessed anywhere client side
          cookies.set('userID', this.state.username);
          //props is a really cool thing about react. When the component is instantiated in the App class (see App.js), props can be passed to the child component
          //in this case, the prop I passed is a callBack function, checkSignIn. This updates the state of the parent app class based on the login state of this child component
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
