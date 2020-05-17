import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Signup from './pages/signup';
import Navigation from './pages/navigation';
import Account from './pages/account';
import SignIn from './pages/signin';

// console.log(LoginData)


class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/signup" component={Signup}/>
             <Route resticted={true} path="/account" component={Account}/>
             <Route path="/signin" component={SignIn}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
