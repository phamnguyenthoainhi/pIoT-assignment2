const style = (theme) => ({
    root: {
        backgroundColor: theme.color.green.lightest,
        padding: "40px"
    },
    avatar: {
        backgroundColor: "whitesmoke",
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