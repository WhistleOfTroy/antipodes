import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableHighlight, Image } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {

  state = {
    started: false,
    loadedCoordinates: false,
    myLocation: 'hello',
    myMarker: {
      coordinate: {
        latitude: 0, longitude: 0,
      },
      region:
      {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    },
    antipodeMarker: {
      coordinate: {
        latitude: 0, longitude: 0,
      },
      region:
      {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    },


  }
  componentWillMount() {
    this._getLocationAsync();

  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ myLocation: JSON.stringify(location) });
    var locationData = location;
    var myLatitude = locationData.coords.latitude;
    var myLongitude = locationData.coords.longitude;
    this.setState({
      myMarker: {
        coordinate: {
          latitude: myLatitude,
          longitude: myLongitude
        },
        region: {
          latitude: myLatitude,
          longitude: myLongitude,
          latitudeDelta: 2,
          longitudeDelta: 2
        }
      },
      loadedCoordinates: true
    })
  };
  render() {
    mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ];
    calculateAntipode = () => {
      var newLatitude = this.state.myMarker.coordinate.latitude * (-1);
      var newLongitude = (180 - Math.abs(this.state.myMarker.coordinate.longitude)) * -1 * Math.sign(this.state.myMarker.coordinate.longitude);
      this.setState({
        started: true,
        antipodeMarker: {
          coordinate: {
            latitude: newLatitude,
            longitude: newLongitude
          },
          region: {
            latitude: newLatitude,
            longitude: newLongitude,
            latitudeDelta: 2,
            longitudeDelta: 2
          }
        }
      })
    }
    if (!this.state.loadedCoordinates) {
      return (
        <View style={styles.textView}>
          <ActivityIndicator color='white' size='large'></ActivityIndicator>
        </View>
      )
    }

    else if (!this.state.started) {
      return (
        <View style={styles.textView}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={require('./assets/bread.png')}></Image>
            <Image style={styles.image} source={require('./assets/earth.png')}></Image>
            <Image style={styles.image} source={require('./assets/bread.png')}></Image>
          </View>
          <View style={styles.paddingView}></View>
          <Text style={styles.textStyle}>Your coordinates are</Text>
          <Text style={styles.textStyle}>{this.state.myMarker.coordinate.latitude}, {this.state.myMarker.coordinate.longitude}.</Text>
          <View style={styles.paddingView}></View>
          <Text style={styles.textStyle}>Let's calculate where you have to put breads</Text>
          <Text style={styles.textStyle}>to make the perfect Earth sandwich?</Text>
          <View style={styles.paddingView}></View>
          <TouchableHighlight onPress={() => { calculateAntipode() }}>
            <View style={styles.button}>
              <Text>Let's do it!</Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    }
    else {
      return (

        <View style={{ flex: 1 }}>
          <View style={styles.textView} >
            <Text style={styles.textStyle}>Your coordinates are</Text>
            <Text style={styles.textStyle}>{this.state.myMarker.coordinate.latitude}, {this.state.myMarker.coordinate.longitude}</Text>
          </View>
          <MapView region={this.state.myMarker.region} customMapStyle={mapStyle} style={{ flex: 2 }} >
            <MapView.Marker coordinate={this.state.myMarker.coordinate}>
            </MapView.Marker>
          </MapView>

          <View style={styles.textView} >
            <Text style={styles.textStyle}>Your antipode coordinates are</Text>
            <Text style={styles.textStyle}>{this.state.antipodeMarker.coordinate.latitude}, {this.state.antipodeMarker.coordinate.longitude}</Text>
          </View>
          <MapView region={this.state.antipodeMarker.region} customMapStyle={mapStyle} style={{ flex: 2 }} >
            <MapView.Marker coordinate={this.state.antipodeMarker.coordinate}>

            </MapView.Marker>
          </MapView>

        </View>

      )
    }
  }

};
styles = StyleSheet.create({
  textView: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  textStyle: {
    color: 'white'
  },
  button: {
    backgroundColor: 'white',
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  paddingView:
    { height: 30 },
  image: {
    height: 50,
    width: 50
  },
  imageView: {
    flexDirection: 'row'
  }
})

