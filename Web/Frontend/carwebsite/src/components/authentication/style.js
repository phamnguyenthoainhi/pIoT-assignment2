const style = (theme) => ({
    
    root: {
        
        padding : "100px"
    },
    textField: {
        paddingBottom: "20px"
    },
    buttonLogin: {
        marginBottom: "100px",
        fontSize: '25px',
        paddingTop: "10%",
        paddingBottom: "10%",
        backgroundColor: "black",
        textAlign: 'center',
        color: 'white',
        transitionDuration : "0.2s",
        "&:hover" : {
            backgroundColor: theme.color.green.darker,
            color: theme.color.grey.darker
        }
        
    }
})
export default style;