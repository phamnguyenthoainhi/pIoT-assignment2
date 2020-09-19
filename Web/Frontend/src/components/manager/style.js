const style = (theme) => ({
    charttitle: {
        fontSize: "20px",
        color: "black",
        padding: "10px 0px 10px 0px",
        fontWeight: 400
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

    top: {
        textAlign: 'center'
    },

    toptitle: {
        fontWeight: 600,
        fontSize: "50px",
        marginTop: "20px"

    },

    cardchart: {
        boxShadow: "2px 10px 25px #dfe1e2",
        margin: "50px 200px 10px 200px"
    },

    cardpie1: {
        boxShadow: "2px 10px 25px #dfe1e2",
        marginTop:"70px",
        marginLeft: "200px",
    },

    cardpie2: {
        boxShadow: "2px 10px 25px #dfe1e2",
        marginTop:"70px",
        marginRight: "200px"
    },

    chart: {
        boxShadow: "2px 10px 25px #dfe1e2",
        margin: "50px 200px 100px 200px"
    }
})
export default style;