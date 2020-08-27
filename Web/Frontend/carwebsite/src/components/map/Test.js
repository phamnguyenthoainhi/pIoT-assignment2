import React, { Component } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-google-places-autocomplete';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }
    onSelect = () => {

    }
    render() {
        return (
            <div>
                <PlacesAutoComplete
                value={this.state.address}
                onChange={() => this.onChange()}
                onSelect = {() => this.onSelect()}
                >
Hello
                </PlacesAutoComplete>
            </div>
        )
    }
}
export default Test