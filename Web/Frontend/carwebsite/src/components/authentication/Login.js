import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import style from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {login} from "../../actions/userAction"
import DoneIcon from '@material-ui/icons/Done';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            emailerror: '',
            passworderror: '',
            loginemail: '',
            loginpassword: ''
        }
    }
    componentDidUpdate(prevProps) {
        
        if(this.props.loginsuccess !== prevProps.loginsuccess & this.props.loginsuccess === 'success') {
            this.setState ({
                success: true
            })
        }
        if(this.props.login_message !== prevProps.login_message & this.props.login_message === 'Username is not registered') {
            this.setState ({
                emailerror: "Username is not registered"
            })
        }
        if(this.props.login_message !== prevProps.login_message & this.props.login_message === 'Wrong Password') {
            this.setState ({
                passworderror: "Wrong Password"
            })
        }
        
    }
    onChange(e) {
       
        
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    onSubmit(e) {
    
        e.preventDefault();
        const user = {
            username: this.state.loginemail,
            password: this.state.loginpassword
        }
        // console.log(user)
        this.props.login(user)
    }
    render() {
        const {classes} = this.props;
        
        return (
            <div className={classes.container}>
                
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
                <h2 className={classes.logintitle}>Hello again !</h2>
                <TextField 
                variant='outlined'
                type="text"
                name="loginemail"
                placeholder="Username"
                className={classes.textField} fullWidth 
                helperText = {this.state.emailerror}
                id="loginEmail"
            
                onChange= {(e) => this.onChange(e)}
                value={this.state.loginemail}
                />
                <br/>
                <TextField 
                variant='outlined'
                type="password"
                fullWidth
                name="loginpassword"
                placeholder="Password"
                className={classes.textField}
                helperText = {this.state.passworderror}
                onChange= {(e) => this.onChange(e)}
                value={this.state.loginpassword}
                
                id="loginPassword"
                />
                <Button component={Link} to="/signup" >Sign Up Here</Button><br/>
                {(this.state.success === true ?
                
                (
                    (sessionStorage.getItem("role") === 'Customer'? (<Button type='submit' component={Link} to='/customer/cars' className={classes.btnloginsuccess} startIcon={<DoneIcon />}>Success</Button>):
                    ((sessionStorage.getItem("role") === 'Admin'? (<Button type='submit' component={Link} to='/admin/cars' className={classes.btnloginsuccess} startIcon={<DoneIcon />}>Success</Button>):
                    ((sessionStorage.getItem("role") === 'Engineer'? (<Button type='submit' component={Link} to='/engineer/reports' className={classes.btnloginsuccess} startIcon={<DoneIcon />}>Success</Button>):
                    ((sessionStorage.getItem("role") === 'Manager'? (<Button type='submit' component={Link} to='/manager/dashboard' className={classes.btnloginsuccess} startIcon={<DoneIcon />}>Success</Button>):
                    (null)
                    ))
                    ))
                    ))
                    )
                 
                
                )
                :
                (<Button variant="contained" color="primary" className={classes.btnlogin} type='submit'>Login</Button>))}
                
                               
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login(user)),
   
})

const mapStateToProps = state => ({
    loginsuccess: state.userReducer.loginsuccess,
    login_message: state.userReducer.login_message,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login));
