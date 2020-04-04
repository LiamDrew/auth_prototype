import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = function() {
    return (
       <div>
          <button> <NavLink to="/">Home</NavLink> </button>
          <button> <NavLink to="/signup">Create Account</NavLink> </button>
          <button> <NavLink to="/signin">Sign In</NavLink> </button>
          <button> <NavLink to="/account">Account</NavLink> </button>

       </div>
    );
}

export default Navigation;
