import React from 'react';

import { NavLink } from 'react-router-dom';


import { Button } from '@material-ui/core';


// import Constants from '../utils/constants'

// import Cookies from 'universal-cookie';
// const cookies = new Cookies();



//this class represents the Navigation Bar at the top of the screen.
//depending on the state of the user being logged in or not, this class displays certain navigation buttons and not others
//(for example, if the user isnt logged in, they cant see an account button, as there is no account they are verified to navigate to)
class Navigation extends React.Component {



   componentDidUpdate(){
      // alert('component updated')
      console.log(this.props.userSignedIn)

      // this.setState({loggedIn: JSON.parse(cookies.get(Constants.loggedIn))})

   }

   componentDidMount(){
      // alert('the component loaded!')
      console.log(this.props.userSignedIn)
      // console.log(this.props.loggedIn)
      // <button> <Link to="/signup">Create Account</Link> </button>


      // this.setState({loggedIn: JSON.parse(cookies.get(Constants.loggedIn))})
   }

   render(){

      //renders the navbar based on the prop userSignedIn
      //this prop is set in App.js, where the navbar component is instantiated
      

      return (
         <div>
            <Button variant="contained" color="primary"> <NavLink className = "active" to="/">Home</NavLink> </Button>


            {this.props.userSignedIn ?
            <Button variant="contained" color="primary"> <NavLink className = "active" to="/account">Account</NavLink> </Button>:
            <span>
               <Button variant="contained" color="primary"> <NavLink className = "active" to="/signin">Sign In</NavLink> </Button>
               <Button variant="contained" color="primary"> <NavLink className = "active" to="/signup">Sign Up</NavLink> </Button>

            </span>

            }
  
  
         </div>
      );
   }
}

export default Navigation;

