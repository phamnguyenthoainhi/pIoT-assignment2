import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';
import {fetchUsers} from '../../actions/adminAction'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Navigationbaradmin from './Navigationbar';
class Userslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searcheduser: [],
            
            searchinput : ''
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.users !== prevProps.users) {
            this.setState({
                users: this.props.users,
                searcheduser : this.state.users
               
                
            })
        }
    }

    componentDidMount() {
        this.props.fetchUsers()
        
        
    }
    handleChangeSearch = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        }) 
        
        const searcheduser = this.state.users.filter(user => user.title.includes(this.state.searchinput))
        if (searcheduser.length === 0) {
            this.setState({
                searcheduser: this.state.users
            })
        } else {
            this.setState({
                searcheduser
            })
        }

        console.log(this.state.searchinput)
    }
    openedit = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        



       
    }
    closeedit = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                
                <Navigationbaradmin/>
                <div className={classes.carlistcontainer}>
                <TextField 
                variant='outlined'
                type="text"
                name="searchinput"
                placeholder="Search for a user"
                className={classes.textField} fullWidth 
                onChange={(e) => this.handleChangeSearch(e)}
                value={this.state.searchinput}
                />
                <div id="myModal" class="modal">
                    <div class="modal-content">
                    <span class="close" onClick={() => this.closeedit()}  >&times;</span>
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control" id="username"/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" class="form-control"  id="email"/>
                    </div>
                    
                    <Button variant="contained">SAVE</Button>
                    </div>

                </div>
                <div className={classes.usertable}>
                 <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: '40%', textAlign: 'center', color: "#66827A"}}>Username</th>
                        <th style={{width: '40%', textAlign: 'center', color: "#66827A"}}>Email</th>
                        
                        <th style={{width: '20%', textAlign: 'center', color: "#66827A"}}></th>
                        <th style={{width: '20%', textAlign: 'center', color: "#66827A"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{textAlign: 'center'}}>John</td>
                        <td style={{textAlign: 'center'}}>Doe</td>
                        
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="primary" className={classes.edituser} onClick={() => this.openedit()}   >EDIT</Button></td>
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="secondary" className={classes.deleteuser}>DELETE</Button></td>
                    </tr>
                    
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
   
  
})

const mapStateToProps = state => ({
  users: state.adminReducer.users,

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Userslist));
