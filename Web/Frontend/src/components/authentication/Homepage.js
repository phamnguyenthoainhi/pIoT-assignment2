import React, { Component } from 'react'
import style from './style';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

class Homepage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className='navigationbar'>
                    <nav className="navbar navbar-expand-lg navbar-light ">
                    <a class="navbar-brand" href="#">
                        <img src='logo.png' height="50" class="d-inline-block align-top"
                        alt="mdb logo"/>
                    </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/customer/dashboard"></a>
                                </li>
                                </ul>
                                <ul class="navbar-nav ml-auto nav-flex-icons" style={{maxWidth: "200px"}}>
                                    <li class="nav-item">
                                        <a class="nav-link waves-effect waves-dark">
                                        <img src='https://www.flaticon.com/svg/static/icons/svg/1384/1384016.svg' 
                                                    alt='img' style={{width: "60%"}}/>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link waves-effect waves-dark">
                                        <img src='https://www.flaticon.com/svg/static/icons/svg/1384/1384014.svg' 
                                                    alt='img' style={{width: "60%"}}/>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link waves-effect waves-dark">
                                        <img src='https://www.flaticon.com/svg/static/icons/svg/1384/1384017.svg' 
                                                    alt='img' style={{width: "60%"}}/>
                                        </a>
                                    </li>
                                </ul>
                              
                            </div>
                    </nav>
                </div>
                <Grid container className={classes.gridcontainer} spacing={2}>
                <Grid item xs={12}>
                    <img src='https://static.dribbble.com/users/29678/screenshots/5009992/electric_car_dribbble_mesa_de_trabajo_1_mesa_de_trabajo_1_4x.png?compress=1&resize=1200x900' 
                    alt='img' style={{width: "50%", display: "block", margin:"auto"}}/>
                </Grid>
                <Grid item lg={4}></Grid>
                <Grid item xs={2}>
                <Button component={Link} fullWidth className={classes.buttonLogin}to="/login">LOGIN</Button><br/>
                    
                </Grid>
                <Grid item xs={2}>
                <Button component={Link}  fullWidth className={classes.buttonLogin} to="/signup">SIGN UP</Button><br/>
                    
                </Grid>
                <Grid item lg={4} ></Grid>

                </Grid>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Homepage));
