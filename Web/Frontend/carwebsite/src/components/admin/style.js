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
    }
})
export default style;