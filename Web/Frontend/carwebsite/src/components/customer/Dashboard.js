import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import style from './style';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
class Dashboard extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button component={Link} fullWidth className={classes.buttonLogout}>Logout</Button><br/>
                <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Name of the car
                    </Typography>
                    <Typography variant="body2" component="p">
                    Date Book - Date Return
                    </Typography>
                    <Typography variant="body2" component="p">
                    Make
                    </Typography>
                    <Typography variant="body2" component="p">
                    Body Type
                    </Typography>
                    <Typography variant="body2" component="p">
                    Colour
                    </Typography>
                    <Typography variant="body2" component="p">
                    Seats
                    </Typography>
                    <Typography variant="body2" component="p">
                    Location
                    </Typography>
                    <Typography variant="body2" component="p">
                    Cost per hour
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" className={classes.button}>Cancel This Booking</Button>
                </CardActions>
            </Card> 
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    // sendMessage: (message, history) => dispatch(sendMessage(message, history)),
   
  
})

const mapStateToProps = state => ({
    // sendMessageLoading: state.usersReducer.sendMessageLoading,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Dashboard));
