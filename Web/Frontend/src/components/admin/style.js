const style = (theme) => ({
    textField: {
        // marginBottom: "30px",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.color.green.dark
        },
        
    },
    carlistcontainer: {
        margin: "20px 50px 20px 50px"
    },
    addcarbtn: {
        backgroundColor: theme.color.green.light,
        color: "white",
        border: "2px #66827A solid",
        "&:hover" : {
            backgroundColor: "transparent",
            color: theme.color.green.light,
            border: "2px #66827A solid"
        },
        margin: "20px 0px 20px 0px"
    },
    buttonLogout: {
        backgroundColor: 'transparent',
        color: 'white',
        transitionDuration : "0.2s",
        border: "none",
        borderBottom: "2px transparent solid",
        "&:hover" : {
            color: theme.color.grey.lighter,
            borderBottom: "2px white solid",
            
            
        }
    },
    usertable: {
        marginTop: "40px"
    },
    edituser: {
        backgroundColor: theme.color.green.light,
        color: 'white',
        transitionDuration : "0.2s",
        
        border: "2px #66827A solid",
        padding: "5px 15px 5px 15px",
        "&:hover" : {
            color: theme.color.green.dark,
            border: "2px #66827A solid",
            backgroundColor: 'transparent',
              
        }
    },
    deleteuser: {
        
        transitionDuration : "0.2s",
        color: theme.color.green.dark,
        border: "2px #66827A solid",
        backgroundColor: 'transparent',

        padding: "5px 15px 5px 15px",
        "&:hover" : {
            backgroundColor: theme.color.green.light,
            color: 'white',
            border: "2px #66827A solid",
              
        }
    },
    historycontainer: {
        padding: "20px 50px 20px 50px"
    },
    admindeletebutton: {
        // marginBottom: "100px",
        fontSize: '14px',
        // paddingTop: "5%",
        // paddingBottom: "5%",
        backgroundColor: "transparent",
        textAlign: 'center',
        color: '#b71c1c',
        transitionDuration : "0.2s",
        border: "1px #b71c1c solid",
        boxShadow: "none",
        "&:hover" : {
            backgroundColor: "#b71c1c",
            color: 'white'
        }
    },
    admineditbutton: {
       
        
        fontSize: '14px',
      
        backgroundColor: "transparent",
        textAlign: 'center',
        color: '#66827A',
        transitionDuration : "0.2s",
        border: "1px #66827A solid",
        boxShadow: "none",
        "&:hover" : {
            backgroundColor: theme.color.green.light,
            color: 'white',
            
        }
    },
    adminreportbutton: {
        // marginBottom: "100px",
        fontSize: '14px',
        // paddingTop: "5%",
        // paddingBottom: "5%",
        backgroundColor: "transparent",
        textAlign: 'center',
        color: 'black',
        transitionDuration : "0.2s",
        border: "1px black solid",
        boxShadow: "none",
        "&:hover" : {
            backgroundColor: "black",
            color: 'white'
        }
    }
})
export default style;