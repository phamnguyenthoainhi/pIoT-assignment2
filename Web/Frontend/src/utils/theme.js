import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    color: {
        grey: {
            lightest: "#FFFFFF",
            lighter: "#EFF1F2",
            light: "#E0E3E5",
            dark: "#A8A5A5",
            
        },
        green: {
            lightest: "#BED5CF",
            lighter: "#93ABA5",
            light: "#66827A",
            dark: "#32584E",
            darker: "#192C27"
        }

    }
});
export default theme;