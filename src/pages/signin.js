//this will need to be built out link singup.js

import React from 'react';

import { Redirect } from 'react-router-dom';


class LoginData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      first: "",
      email: "",
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
              name: this.state.first,
              password: this.state.password
            })
          })

      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => {
        console.log('LOGIN CHECK', res.verified);
        console.log('MESSAGE CHECK', res.message);
        if (res.verified === true){
          this.setState({loggedIn: true})
        }
          })
              // for (let i = 0; i < res.test.length; i++){
              //   if (this.state.first === res.test[i].name){
              //     alert('usernames match')
              //     if (this.state.password === res.test[i].password){
              //       alert('password matches, GRANTING ACCESS  ')
              //     }
              //     else{
              //       alert('INCORRECT PASSWORD')
              //     }
              //   }
              // }          
      return (this.state.loggedIn)
      }

      // seeAccount(){
      //   this.verifyLogin()
      //   if (this.state.loggedIn === true){

      //   }

      // }


    render(){
      return(
        <div>

        <input
        id= "loginName"
        placeholder = "First Name"
        //not exactly sure what this does
        value = {this.state.value}

        //change this

        onChange = {
          e => this.firstNameChange(e)
        }
        />

        <input
        id= "loginPassword"
        placeholder = "Enter Password"
        //not exactly sure what this does
        value = {this.state.value}

        //not sure if I need this
        onChange = {
          e => this.passwordChange(e)
        }
        />

        {this.state.loggedIn ?
          <Redirect to="/account"></Redirect>: 
          <Redirect to="/signin"></Redirect>
        }

        <button id="signIn" type= "submit" onClick={this.verifyLogin}>Sign In
        {/* <NavLink restricted={true} to="/account">Sign In</NavLink> */}

        </button>


        </div>
      )

    }



}
//change home to positive

const SignIn = function() {
    return (
       <div>
          <h1>You can sign in here</h1>
          <LoginData />
       </div>
    );
}

// let myvar = new LoginData('test')

// console.log(myvar.state.loggedIn)

export default SignIn;
