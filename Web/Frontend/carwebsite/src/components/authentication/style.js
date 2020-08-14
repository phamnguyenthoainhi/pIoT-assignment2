const style = (theme) => ({
    container: {
        textAlign: "center"
    },
    logintitle: {
        marginBottom: "40px"
    },
    root: {
        
        padding : "100px"
    },
    
    buttonLogin: {
        marginBottom: "100px",
        fontSize: '25px',
        paddingTop: "5%",
        paddingBottom: "5%",
        backgroundColor: "black",
        textAlign: 'center',
        color: 'white',
        transitionDuration : "0.2s",
        "&:hover" : {
            backgroundColor: theme.color.green.darker,
            color: 'white'
        }
        
    },
    btnlogin: { 
        backgroundColor: "black",
        textAlign: 'center',
        color: 'white',
        padding: "10px 40px 10px 40px",
        transitionDuration : "0.2s",
        "&:hover" : {
            backgroundColor: theme.color.green.dark,
            color: 'white'
        }
    },
    textField: {
        marginBottom: "30px",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.color.green.dark
        },
        
    },
  
})
export default style;