const style = (theme) => ({
    charttitle: {
        fontSize: "30px",
        color: "white",
        backgroundColor: theme.color.green.light,
        padding: "10px 0px 10px 0px"
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
})
export default style;