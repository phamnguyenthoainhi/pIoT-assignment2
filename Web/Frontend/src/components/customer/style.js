const style = (theme) => ({
    root: {
        
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
    textField: {
        // marginBottom: "30px",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.color.green.dark
        },
        
    },
    content: {
        margin: "20px 50px 20px 50px"
    },
    carscontainer: {
        marginTop: "20px"
    },
    carcard: {
        border: "none",
        
        boxShadow: "2px 10px 25px #dfe1e2",
        padding: "10px"
    },
    carcardtitle: {
        color: theme.color.green.light,
        fontSize: "24px",
        fontWeigh: "bold",
        borderBottom: "1px #93ABA5 solid"

    },
    bookingcard: {
        border: "none",
        
        boxShadow: "2px 10px 25px #dfe1e2",
        padding: "10px",
        minHeight: "250px"
    },
    bookcarbutton: {
        backgroundColor: theme.color.green.light,
        color: theme.color.grey.light,
        border: "2px #93ABA5 solid",
        transitionDuration: "0.3s",
        padding: "10px 20px 10px 20px",
        "&:hover" : {
            backgroundColor: "transparent",
            border: "2px #93ABA5 solid",
            color: theme.color.green.dark
            
            
        }
    },
    avatar: {
        backgroundColor: "whitesmoke",
        padding: 2
        
    },
    savebtn: {
        backgroundColor: 'black',
        color: 'white',
        "&:hover" : {
            backgroundColor: 'grey',
        color: 'white',
        },
        marginRight: "10px",
        marginTop: "10px"
    },
    unlockbutton : {
        backgroundColor: theme.color.green.light,
        color: theme.color.grey.light,
        border: "2px #93ABA5 solid",
        transitionDuration: "0.3s",
        padding: "10px 20px 10px 20px",
        "&:hover" : {
            backgroundColor: "transparent",
            border: "2px #93ABA5 solid",
            color: theme.color.green.dark
        }
    },
    lockbutton : {
        backgroundColor: "#c62828",
        color: theme.color.grey.light,
        border: "2px #c62828 solid",
        transitionDuration: "0.3s",
        padding: "10px 20px 10px 20px",
        "&:hover" : {
            backgroundColor: "transparent",
            border: "2px #c62828 solid",
            color: "#c62828"
        }
    },
    dateinput: {
        width: "500px",
        marginBottom : "20px",
        padding: "5px"
    },
    canelbutton: {
        backgroundColor: "#c62828",
        color: theme.color.grey.light,
        border: "2px #c62828 solid",
        transitionDuration: "0.3s",
        padding: "10px 20px 10px 20px",
        marginTop: "10px",
        "&:hover" : {
            backgroundColor: "transparent",
            border: "2px #c62828 solid",
            color: "#c62828"
        }
       
    },

  

    

})
export default style;