import React, { Component } from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import style from './style';
import { withStyles } from '@material-ui/core';
class Navigationbaradmin extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className='navigationbar'>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto">
                                <li class="nav-item active">
                                <a class="nav-link" href="/admin/cars">Cars</a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/admin/users">Users</a>
                                    
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/admin/history">Rental History</a>
                                    
                                </li>
                                
                                </ul>
                                <form class="form-inline my-2 my-lg-0">
                                <Button component={Link} className={classes.buttonLogout}>Logout</Button><br/>
                                </form>
                            </div>
                    </nav>
                </div>
        )
    }
}
export default connect(null)(withStyles(style)(Navigationbaradmin));
