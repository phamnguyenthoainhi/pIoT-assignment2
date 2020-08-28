import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';
import {fetchUsers, editUser} from '../../actions/adminAction'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Navigationbaradmin from './Navigationbar';
class Userslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searcheduser: [],
            
            searchinput : '',
            editemail: '',
            editusername: ""
        }
    }
    componentDidUpdate(prevProps) {
        
        if(this.props.users !== prevProps.users) {
            this.setState({
                users: this.props.users,
                searcheduser : this.props.users
               
                
            })
        }
    }

    componentDidMount() {
        this.props.fetchUsers()
        
        
    }
    onChange(e) {
       
        
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    
    handleChangeSearch = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        }) 
        const searcheduser = this.state.users.filter(user => user.email.includes(this.state.searchinput) )
        
        
        if (searcheduser.length === 0) {
            console.log("hello hello")
            this.setState({
                searcheduser: this.state.users
            })
        } else {
            this.setState({
                searcheduser
            })
        }

        // console.log(this.state.searchinput)
    }
    openedit = (user) => {
        
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        this.setState({
            editemail: user.user.email,
            editusername: user.user.username
        })
        // const user = {

        // }



       
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
                <div id="myModal" className="modal">
                    <div className="modal-content">
                    <span className="close" onClick={() => this.closeedit()}  >&times;</span>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" value={this.state.editusername} name="editusername" onChange= {(e) => this.onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control"  id="email" value={this.state.editemail} name="editemail" onChange= {(e) => this.onChange(e)} required/>
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
                        {this.state.searcheduser ? 
                        (
                            
                            this.state.searcheduser.map((user) => 
                            <tr>
                        <td style={{textAlign: 'center'}}>search</td>
                        <td style={{textAlign: 'center'}}>{user.email}</td>
                        
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="primary" className={classes.edituser} onClick={() => this.openedit({user})}   >EDIT</Button></td>
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="secondary" className={classes.deleteuser}>DELETE</Button></td>
                    </tr>
                            )
                        ): (
                            this.state.users.map((user) => 
                            
                            <tr>
                        <td style={{textAlign: 'center'}}>{user.username}</td>
                        <td style={{textAlign: 'center'}}>{user.email}</td>
                        
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="primary" className={classes.edituser} onClick={() => this.openedit({user})}   >EDIT</Button></td>
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="secondary" className={classes.deleteuser}>DELETE</Button></td>
                    </tr>)
                            )}
                    
                    
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
    editUser: (user) => dispatch(editUser(user)),
   
  
})

const mapStateToProps = state => ({
  users: state.adminReducer.users,

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Userslist));
