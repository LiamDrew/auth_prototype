//I had difficulty getting the multipage feature to work on my own, so I used this code as a template:
// https://www.golangprograms.com/how-to-create-simple-react-router-to-navigate-multiple-pages.html

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { CookiesProvider } from 'react-cookie';
//this allows me to use cookies client side to store user data.



ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  
  document.getElementById('root')
);
