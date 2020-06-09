import React, { Component } from 'react';

//imports navigation tools from react router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//imports the components from the other pages
import SetUser from './pages/home';
import UserData from './pages/signup';
import Navigation from './pages/navigation';
import Settings from './pages/account';
import LoginData from './pages/signin';

import { withCookies } from 'react-cookie';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false
    }

    // this.redirectToAccount = this.redirectToAccount.bind(this);
    this.updateSignIn = this.updateSignIn.bind(this);
  }

  //the app component only keeps track of one state-the user login.
  //because react is awesome, I can easily keep track of this state across all my different child classes using props and this App parent class as an organizer

  //this is a callback function that gets passed to several componets (see the render function)
  updateSignIn(authInput){
    console.log('app js update getting called', authInput)
    this.setState({loggedIn: authInput})
  }

 

  componentDidMount(){
  }


//in the render function, I can pass the callback function and login state as props, and update them from within the child classes. Pretty neat
  render() {
    console.log("logged in?", this.state.loggedIn)
    return (
       <BrowserRouter>
        <div>
          <Navigation userSignedIn = {this.state.loggedIn} />
            <Switch>
             <Route path="/" exact>
               <SetUser/>
             </Route>

             <Route path="/signup">
               <UserData/>
             </Route>
             <Route path="/signin">
               <LoginData userSignedIn = {this.state.loggedIn} checkSignIn={this.updateSignIn}/>
             </Route>
             <Route path="/account">
               <Settings userSignedIn = {this.state.loggedIn} checkSignIn = {this.updateSignIn} />
             </Route>



           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
