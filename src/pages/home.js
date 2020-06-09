import React from 'react';

// import Constants from '../utils/constants'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';




// import Cookies from 'universal-cookie';
// const cookies = new Cookies();


class SetUser extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sessionId: "",
            loggedIn: false,
            profiles: []
        }
    }

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

    // makeFeedList(profiles){
    //     for (let i = 0; i< profiles.length; i++){

    //     }

    // }

    componentDidMount(){

        this.callAPI()


    }

    render(){
        // let completedList_final = this.state.completed.map((position) => {
        //     return (
        //       <li key = {position}>
        //         {position}
        //       </li>
        //     )

        let feed = this.state.profiles.map((position, index) => {
            if (position.name === "admin"){

            }
            else {
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


export default SetUser;
