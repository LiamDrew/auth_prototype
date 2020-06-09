import React from 'react';

//imports Material UI components.
//these weren't necessary, but were a cool thing to learn and helped the final prototype look nicer
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class SetUser extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sessionId: "",
            loggedIn: false,
            profiles: []
        }
    }

    //this loads user profiles from the database to display
    //volunteering organizations can browse through profiles and email volunteers that fit their specifications

    callAPI(){
        fetch('http://localhost:8080', {
            method: 'get'
        })

        .then(res => res.text())
        .then(res =>JSON.parse(res))
        .then(res => {
            console.log('res', res.profiles)
            this.setState({profiles: res.profiles})
    

        })

    }



    componentDidMount(){

        this.callAPI()


    }

    render(){

        //creates a list of JSX elements
        //this is the equivalent of *ngFor in angular

        let feed = this.state.profiles.map((position, index) => {
            if (position.name === "admin"){

            }
            else {
                //returns a card for each user, containing their name, profile description, and email.
                return (
                    <div key={index}> 
                    <Card className='userCard'>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         {position.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            About: {position.about}
                        </Typography>
                        </CardContent>
                    <Button variant="contained" color="primary">{position.email}</Button>
    
                    </Card>
    
                    </div>
                )

            }
        })

            return (
            
                <div>
                    <Typography variant="h3">Browse Volunteers</Typography>
                    <ol>
                        {feed}
                    </ol>

                    
                </div>
    
            )


    }


}

//exports home page component
//over the course of the project, I learned that exporting the class itself instead of an instance of the class within a div was the right way to go
//this allowed my to update state and props later, which was important (see App.js and account.js)
export default SetUser;
