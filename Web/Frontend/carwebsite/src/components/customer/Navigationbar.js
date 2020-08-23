import React, { Component } from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import style from './style';
import { withStyles } from '@material-ui/core';
class Navigationbar extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className='navigationbar'>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                <a className="nav-link" href="/customer/cars">Home</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/customer/dashboard">Dashboard</a>
                                    
                                </li>
                                
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                <Button className={classes.buttonLogout}>Logout</Button><br/>
                                </form>
                            </div>
                    </nav>
                </div>
        )
    }
}
export default connect(null)(withStyles(style)(Navigationbar));
