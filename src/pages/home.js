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
    

        })

    }

    componentDidMount(){

        this.callAPI()


    }

    render(){

            return (
            
                <div>
                    <h1>Volunteering</h1>
                    <p>Home page body content</p>
                    <div>
                    <Card className={'userCard'}>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    <Button variant="contained" color="primary">Message</Button>

                    </Card>

                    </div>
                    {/* <Box component="span"><Button /></Box> */}

                    
                </div>
    
            )


    }


}


export default SetUser;
