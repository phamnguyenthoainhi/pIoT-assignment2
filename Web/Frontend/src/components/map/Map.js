import React from 'react'
import { GoogleApiWrapper,  Marker  } from 'google-maps-react';

class MapLoader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      car: {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      car: nextProps.car
      
    };
  }

  displayMarkers = (car) => {
      return <Marker key={car.car_id} id={car.car_id} position={{
       lat: car.latitude,
       lng: car.longitude
     }}
     onClick={() => console.log("Clicked")} />

  }

render(){
  return(
    <div>
        <iframe title="car location"
       width="100%"
       height="100%"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8
          &center=${this.state.car.latitude},${this.state.car.longitude}
          &zoom=15&q=${this.state.car.latitude},${this.state.car.longitude}`}>
      </iframe>
    </div>
   )
 }
}

export  default
GoogleApiWrapper({
  apiKey: 'AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8'
})(MapLoader);