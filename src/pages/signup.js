import React from 'react';

import { NavLink } from 'react-router-dom';


class UserData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      first: "",
      email: "",
      age: "",
      password: "",
      //optional
      phone: "",
      //at the moment, I am only using one toAdd for all of the different inputs
      // toAdd: ""
    }

    this.firstNameChange = this.firstNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.ageChange = this.ageChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.createAccountHandler = this.createAccountHandler.bind(this);

  }

  firstNameChange(e){
    this.setState({first: e.target.value})
  }

  emailChange(e){
    this.setState({email: e.target.value})
  }

  ageChange(e){
    this.setState({age: e.target.value})
  }

  passwordChange(e){
    this.setState({password: e.target.value})
  }

  // createAccount(){
  //
  // }

  createAccountHandler(){

    console.log('creating', this.state.first, 'account')
    fetch('http://localhost:8080', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        name: this.state.first,
        // email: this.state.email,
        // age: this.state.age,
        password: this.state.password
      }),
    })

    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log('server updated', this.state.first)
      // console.log('recieved', res.test)
    })
  }


  render(){

    return (
      <div>
        <input
        id= "submitName"
        placeholder = "First Name"
        //not exactly sure what this does
        value = {this.state.value}

        //not sure if I need this
        onChange = {
          e => this.firstNameChange(e)
        }
        />

        {/* <input
        id= "submitLastName"
        placeholder = "Email"
        //not exactly sure what this does
        value = {this.state.value}

        //not sure if I need this
        onChange = {
          e => this.emailChange(e)
        }
        /> */}

        <input
        id= "submitPassword"
        placeholder = "Enter Password"
        //not exactly sure what this does
        value = {this.state.value}

        //not sure if I need this
        onChange = {
          e => this.passwordChange(e)
        }
        />

        <button
        id="giveName" type="submit" onClick={this.createAccountHandler}>
        <NavLink to="/signin">Create Account</NavLink>

        </button>

      </div>




    )
  }
}





const Signup = function() {
    return (
       <div>
          <h1>Create an Account Below</h1>
          <p>see below</p>
          <UserData />
       </div>
    );
}

export default Signup;
