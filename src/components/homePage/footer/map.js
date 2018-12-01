import React from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import mapStyles from "./mapStyles.json";
import { MapInfo } from "./landingStyles";
import "./css.css";

const defaultMapOptions = {
  styles: mapStyles,
};
class GoogleMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClick = props => {
    const { showingInfoWindow } = this.state;
    if (showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    // const style = {
    //   width: "50vw",
    //   height: "300px",
    //   position: "relative",
    //   display: "flex",
    //   marginLeft: "auto",
    //   marginRight: "auto",
    // };
    // const containerStyle = { position: "relative" };
    const { google } = this.props;
    const { activeMarker, showingInfoWindow } = this.state;
    return (
      <div className="mapStyles">
        <Map
          fullscreenControl={false}
          // containerStyle={containerStyle}
          defaultOptions={defaultMapOptions}
          styles={mapStyles}
          xs={12}
          // style={style}
          google={google}
          onClick={this.onMapClick}
          zoom={16.6}
          initialCenter={{ lat: 40.943105, lng: -73.101311 }}
        >
          <Marker
            // options={{icon: Logo, size: '1', scaledSize: '1'}}
            animation={google.maps.Animation.DROP}
            onClick={this.onMarkerClick}
            title="College 101 Resource Center"
            position={{ lat: 40.943105, lng: -73.101311 }}
            name="College 101 Resource Center"
          />
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <MapInfo>
              <h3>College 101 Resource Center</h3>
              <a href="tel:1-631-364-9080">(631)-364-9080</a>
              <a href="https://goo.gl/maps/z3oRiJWRWsw">
                Navigate to our store
              </a>
            </MapInfo>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC1-zWOY-g6MDDbFwdLz1W1c3ek_Xyx2nc",
})(GoogleMapContainer);
