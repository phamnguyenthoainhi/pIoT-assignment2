import React from 'react'
import { Map, GoogleApiWrapper,  Marker  } from 'google-maps-react';

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

    // return this.state.stores.map((store, index) => {
      return <Marker key={car.car_id} id={car.car_id} position={{
       lat: car.latitude,
       lng: car.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    // })
  }

render(){
// console.log(this.state.car.latitude)
  return(
    <div>
      {/* {this.state.car ? ( */}
        <iframe
       width="450"
       height="250"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8
          &center=${this.state.car.latitude},${this.state.car.longitude}
          &zoom=15&q=${this.state.car.latitude},${this.state.car.longitude}`}>
      </iframe>
      {/* ): null} */}
      
      {/* <Map
          google={this.props.google}
          zoom={15}
          style={{width: '48%',
          height: '25%',}}
          initialCenter={{ lat: this.state.car.latitude, lng: this.state.car.longitude}}
        >
          {this.displayMarkers(this.state.car)}
        </Map> */}
    </div>
   )
 }
}
export  default
GoogleApiWrapper({
  apiKey: 'AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8'
})(MapLoader);