const style = (theme) => ({
    root: {
        backgroundColor: '#d8e6e2',
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
    card: {
        boder: "1px black solid",
        // backgroundColor: theme.color.green.lightest,
    }
})
export default style;