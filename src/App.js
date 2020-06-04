import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SetUser from './pages/home';
import UserData from './pages/signup';
import Navigation from './pages/navigation';
import Settings from './pages/account';
import LoginData from './pages/signin';

import { withCookies } from 'react-cookie';

// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

// console.log(LoginData)

            //  <Route path="/" component={Home} exact/>



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false
    }

    // this.redirectToAccount = this.redirectToAccount.bind(this);
    this.updateSignIn = this.updateSignIn.bind(this);
  }

  updateSignIn(authInput){
    this.setState({loggedIn: authInput})
  }

 

  componentDidMount(){
  }



  render() {
    console.log(this.state.loggedIn)
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
             {/* <Route path="/signin" component={SignIn}/> */}
             <Route path="/signin">
               <LoginData checkSignIn={this.updateSignIn}/>
             </Route>
             {/* <Route path="/account" component={Settings}/> */}
             <Route path="/account">
               <Settings />
             </Route>



           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
