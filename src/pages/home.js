import React from 'react';

import Constants from '../utils/constants'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class SetUser extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sessionId: "",
            loggedIn: false
        }
    }

    callAPI(){
        fetch('http://localhost:8080', {
            method: 'get'
        })

        .then(res => res.text())
        .then(res =>JSON.parse(res))
        .then(res => {
            console.log(res)
            console.log(this.props)
            cookies.set(Constants.test, 'testing');
            console.log(cookies.get(Constants.test))
    

        })

    }

    componentDidMount(){
        if (cookies.get('loggedIn') === true){

        }
        
        else {
            cookies.set('loggedIn', false)
        }

        this.callAPI()

    }

    render(){
            return (
            
                <div>
                    <h1>Volunteering</h1>
                    <p>Home page body content</p>
                </div>
    
            )


    }


}


export default SetUser;
