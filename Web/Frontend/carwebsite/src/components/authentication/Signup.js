
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import style from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signup, addPhoto} from "../../actions/userAction";
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
        // var newfile = file
        // newfile.name = 'nhi'
        console.log(file)
        // newfile.name
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64result = reader.result.split(',')[1];
            // const byteCharacters = atob(base64result);
            // const byteNumbers = new Array(byteCharacters.length);
            // var i = 0
            // byteCharacters.forEach(b => {
            //     byteNumbers[i] = byteCharacters.charCodeAt(i);
            //     i += 1
            // })
            // const byteArray = new Uint8Array(byteNumbers);
            // const blob = new Blob([byteArray], {type: contentType});
             
           
            
            callback(base64result)
        };
       
        reader.onerror = function (error) {
        console.log('Error: ', error);
        };
     };


     handleSignup = (encodedImage) => {
         if (this.state.signupemail.includes("@")) {
            const user = {
                email : this.state.signupemail,
                password: this.state.signuppassword,
                confirm_password: this.state.signupconfirmpassword,
                username: this.state.signupusername,
                // img: this.state.img,
                // img: encodedImage,
                role: 'Customer'
            }
            const photo = {
                username: this.state.signupusername,
                photo: encodedImage
            }
            console.log(user)
            console.log(photo)
            this.props.signup(user, photo)
         } else {
            this.setState ({
                emailerror: "Please input email format"
            })
         }
         
     }


     chooseFile = event => {
         console.log(this.state.signupusername)
         if (this.state.signupusername === '' || this.state.signupusername === null || this.state.signupusername === undefined) {
             alert("Please input username before upload image")
         } else {
            var renamed_file = new File([event.target.files[0]], `${this.state.signupusername}.jpg`, {type: "image/jpeg", lastModified: new Date()})
    
            this.setState({
                img: renamed_file,
                uploadImageComplete: true
            })
           
            
         }
        
        
    };

    componentDidUpdate(prevProps) {
        console.log(this.props.signupsuccess)
        if(this.props.signupsuccess !== prevProps.signupsuccess & this.props.signupsuccess === 'success') {
            this.setState ({
                success: true
            })
        }
        if(this.props.signup_message !== prevProps.signup_message & this.props.signup_message === 'Username is already registered') {
            this.setState ({
                emailerror: "Username is already registered"
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
        if (!(this.state.signupusername === '' || this.state.signupusername === null || this.state.signupusername === undefined)) {
            if (!(this.state.img === '' || this.state.img === null || this.state.img === undefined)) {
                this.getBase64(this.state.img, this.handleSignup)
    
            } else {
                this.setState({
                    error: "Please add your images"
                })
            }
        } else {
            this.setState({
                error: "Please input your username before uploading image"
            })
        }
        
        
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
                <h2 className={classes.logintitle}>Create an account</h2>
                {this.state.error}
                <TextField 
                variant='outlined'
                type="text"
                fullWidth
                name="signupusername"
                placeholder="Username"
                className={classes.textField}
                helperText = {this.state.emailerror}
                value = {this.state.signupusername}
                id="signupusername"
                onChange= {(e) => this.onChange(e)}
                required
                />
                <br/>
                <TextField 
                variant='outlined'
                type="text"
                name="signupemail"
                placeholder="Email"
                className={classes.textField} fullWidth 
                
                // error = {!!this.state.loginFormError.emailError}
                id="signupemail" value = {this.state.signupemail}
               
                onChange= {(e) => this.onChange(e)}
                required
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
                required
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
                required
                />
                {this.state.uploadImageComplete ? 
            (<p>Image Uploaded</p>)
            :
            (<Button
                variant='outlined'
                className={classes.buttonFile}
                startIcon={<ImageIcon />}  >
                <input type="file" accept="image/jpeg" id='file' style={{display:'none'}} name='image'  onChange={this.chooseFile}/>
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
    signup: (user, photo) => dispatch(signup(user, photo)),
    addPhoto: (user, photo) => dispatch(addPhoto(user, photo)),
   
})

const mapStateToProps = state => ({
    signupsuccess: state.userReducer.signupsuccess,
    signup_message: state.userReducer.signup_message,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Signup));
