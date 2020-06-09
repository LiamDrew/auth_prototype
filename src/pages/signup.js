import React from 'react';


//NavLink reroutes you to a different page when clicked, which makes navigating different pages quite useful.
//it can also be placed within a button and styled to look like text, which is what I chose to do
import { NavLink } from 'react-router-dom';

//importing Material UI components
import { Button, TextField, Select, MenuItem, InputLabel, Card } from '@material-ui/core';

//importing md5 hashing for secure database password storage
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

    }

    //binding functions
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



  createAccountHandler(){

    //taken from stack overflow:
    //https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs/39425165
    //I have no idea how this code works, but it works.
    //this ensures that users sign up with a valid email address
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //if the email is valid, the user can create an account
    if (re.test(this.state.email) === true){
      console.log('creating', this.state.first, 'account')
      //posts the account data to the server
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
        //logs result
        console.log('server updated', this.state.first)
        console.log('recieved', res.test)
      })
    }

    else {
      alert('Invalid Email Address')
    }

    }



  render(){

    //creates an array of #s from 0-100 to use for age selection

    let ages = Array.from(Array(100).keys())

    //these menu items are used in a select tag so users can select their age
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
        value = {this.state.value}

        variant="outlined"


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
