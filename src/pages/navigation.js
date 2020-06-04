import React from 'react';

import { NavLink } from 'react-router-dom';

// import Constants from '../utils/constants'

// import Cookies from 'universal-cookie';
// const cookies = new Cookies();




class Navigation extends React.Component {
   // constructor(props){
   //    super(props);

   // }
   componentDidUpdate(){
      // alert('component updated')
      console.log(this.props.userSignedIn)

      // this.setState({loggedIn: JSON.parse(cookies.get(Constants.loggedIn))})

   }

   componentDidMount(){
      // alert('the component loaded!')
      console.log(this.props.userSignedIn)
      // console.log(this.props.loggedIn)

      // this.setState({loggedIn: JSON.parse(cookies.get(Constants.loggedIn))})
   }

   render(){
      

      return (
         <div>
            <button> <NavLink to="/">Home</NavLink> </button>
            <button> <NavLink to="/signup">Create Account</NavLink> </button>
            <button> <NavLink to="/signin">Sign In</NavLink> </button>
            {this.props.userSignedIn ?
            <button> <NavLink to="/account">Account</NavLink> </button>:
            <span>False</span>
            }
            {/* <button id="signIn" type= "submit" onClick={this.verifyLogin}>Sign In */}
  
  
         </div>
      );
   }
}

export default Navigation;

