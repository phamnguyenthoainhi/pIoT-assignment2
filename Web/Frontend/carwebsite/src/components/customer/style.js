const style = (theme) => ({
    root: {
        
    },
    buttonLogout: {
        backgroundColor: 'black',
        color: 'white',
        transitionDuration : "0.2s",
        "&:hover" : {
            backgroundColor: theme.color.green.darker,
            color: theme.color.grey.darker
        }
    }
    // title: {
    //     color: 'white'
    // },
    // button: {
    //     color: 'white'
    // }
})
export default style;