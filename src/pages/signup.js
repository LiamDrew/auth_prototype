import React from 'react';

import { NavLink } from 'react-router-dom';

import { Button, TextField, Select, MenuItem, InputLabel, Card } from '@material-ui/core';


import md5 from 'md5';

class UserData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      first: "",
      username: "",
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

  userNameChange(e){
    this.setState({username: e.target.value})
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
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // console.log(md5('my message?'))
    if (re.test(this.state.email) === true){
      console.log('creating', this.state.first, 'account')
      fetch('http://localhost:8080', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
  
        body: JSON.stringify({
          verify: false,
          profileUpdate: false,
          first: this.state.first,
          username: this.state.username,
          email: this.state.email,
          age: this.state.age,
          password: md5(this.state.password)
        }),
      })
  
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => {
        console.log('server updated', this.state.first)
        console.log('recieved', res.test)
      })
    }

    else {
      alert('Invalid Email Address')
    }

    }



  render(){

    let ages = Array.from(Array(100).keys())

    let ageRange = ages.map((position, index) => {
      return (
        <MenuItem value = {index} key={index}>{position}</MenuItem>
      )
    })


    return (
      <div>
        <Card className = "signupCard">
        <TextField label="First Name" value = {this.state.value} variant="outlined"
        onChange = {
          e => this.firstNameChange(e)
        } 
        />

      <TextField
        label="UserName"
        value = {this.state.value}
        variant="outlined"


        //not sure if I need this
        onChange = {
          e => this.userNameChange(e)
        }

            
        />

        <InputLabel id="demo-simple-select-label">Age</InputLabel>


        <Select
          labelId="demo-simple-select-label"
         
          variant="outlined"
          value={this.state.age}
          onChange={this.ageChange}
          label="Age"
        >
          {ageRange}


        </Select>


    <TextField
        label="Email"
        //not exactly sure what this does
        value = {this.state.value}

        variant="outlined"


        //not sure if I need this
        onChange = {
          e => this.emailChange(e)
        }

            
        /> 





        <TextField
        id= "submitPassword"
        label="Password"

        //not exactly sure what this does
        value = {this.state.value}
        variant="outlined"

        //not sure if I need this
        onChange = {
          e => this.passwordChange(e)
        }
        />

        <Button variant="contained" onClick={this.createAccountHandler}>
        <NavLink className = "createAccount" to="/signin">Create Account</NavLink>
        </Button>


        </Card>


      </div>




    )
  }
}



export default UserData;
