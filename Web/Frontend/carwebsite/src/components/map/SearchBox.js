import React, { Component } from 'react'
import { Map, GoogleApiWrapper,  Marker  } from 'google-maps-react';
export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    console.log(place.geometry.location.lat())
    // this.props.onPlaceLoaded(place);
  }



  render() {
    return (
        <input ref={this.autocompleteInput}  id="autocomplete" placeholder="Enter your address"
         type="text"></input>
    );
  }
}
