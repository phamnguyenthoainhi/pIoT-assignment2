
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import style from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signup} from "../../actions/userAction";
import ImageIcon from '@material-ui/icons/Image';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            emailerror: '',
            passworderror: '',
            signupemail: '',
            signupusername: "",
            signuppassword: '',
            signupconfirmpassword: '',
            img: '',
            error: '',
            uploadImageComplete: false
        }
    }
    
    getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64result = reader.result.split(',')[1];
            callback(base64result)
        };
       
        reader.onerror = function (error) {
        console.log('Error: ', error);
        };
     };
     handleSignup = (encodedImage) => {
         const user = {
             email : this.state.signupemail,
             password: this.state.signuppassword,
             confirm_password: this.state.signupconfirmpassword,
             username: this.state.signupusername,
             img: encodedImage,
             role: 'Customer'
         }
         console.log(user)
         this.props.signup(user)
     }

     chooseFile = event => {
        this.setState({
            img: event.target.files[0],
            uploadImageComplete: true
        })
    };

    componentDidUpdate(prevProps) {
        console.log(this.props.signupsuccess)
        if(this.props.signupsuccess !== prevProps.signupsuccess & this.props.signupsuccess === 'success') {
            this.setState ({
                success: true
            })
        }
        if(this.props.signup_message !== prevProps.signup_message & this.props.signup_message === 'Email is already registered') {
            this.setState ({
                emailerror: "Email is already registered"
            })
        }
        if(this.props.signup_message !== prevProps.signup_message & this.props.signup_message === 'Password does not match') {
            this.setState ({
                passworderror: "Password does not match"
            })
        }
        if(this.props.signup_message !== prevProps.signup_message & this.props.signup_message === 'Input is not valid') {
            this.setState ({
                error: "Input is not valid"
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
        if (!(this.state.img === '' || this.state.img === null || this.state.img === undefined)) {
            this.getBase64(this.state.img, this.handleSignup)

        } else {
            this.setState({
                error: "Please add your images"
            })
        }
        
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
                <h2 className={classes.logintitle}>Sign Up</h2>
                {this.state.error}
                <TextField 
                variant='outlined'
                type="text"
                name="signupemail"
                placeholder="Email"
                className={classes.textField} fullWidth 
                helperText = {this.state.emailerror}
                // error = {!!this.state.loginFormError.emailError}
                id="signupemail" value = {this.state.signupemail}
               
                onChange= {(e) => this.onChange(e)}
                
                />
                <br/>
                <TextField 
                variant='outlined'
                type="text"
                fullWidth
                name="signupusername"
                placeholder="Username"
                className={classes.textField}
                
                value = {this.state.signupusername}
                id="signupusername"
                onChange= {(e) => this.onChange(e)}
                />
                <TextField 
                variant='outlined'
                type="text"
                fullWidth
                name="signuppassword"
                placeholder="Password"
                className={classes.textField}
                helperText = {this.state.passworderror}
                value = {this.state.signuppassword}
                id="signuppassword"
                onChange= {(e) => this.onChange(e)}
                />
                <TextField 
                variant='outlined'
                type="text"
                fullWidth
                name="signupconfirmpassword"
                placeholder="Confirm Password"
                className={classes.textField}
                
                value = {this.state.signupconfirmpassword}
                id="signupconfirmpassword"
                onChange= {(e) => this.onChange(e)}
                />
                {this.state.uploadImageComplete ? 
            (<p>Image Uploaded</p>)
            :
            (<Button
                variant='outlined'
                className={classes.buttonFile}
                startIcon={<ImageIcon />}  >
                <input type="file" accept="image/*" id='file' style={{display:'none'}} name='image'  onChange={this.chooseFile}/>
                <label htmlFor='file' className={classes.label} >
                    Upload image
                </label>
            </Button>)    
            }
                
                <br/>
                
                
                <Button component={Link} to="/login">Login Here</Button>
                {this.state.success ? 
                (null):(<Button variant="contained" color="primary" className={classes.btnlogin} type="submit">Sign Up</Button>)
            }
                
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    signup: (user) => dispatch(signup(user)),
   
  
})

const mapStateToProps = state => ({
    signupsuccess: state.userReducer.signupsuccess,
    signup_message: state.userReducer.signup_message,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Signup));
