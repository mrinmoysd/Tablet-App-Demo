import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet, 
    TextInput
} from 'react-native';
import MapView, {
    MAP_TYPES,
    PROVIDER_DEFAULT,
    ProviderPropType,
    UrlTile,
    Marker,
    PROVIDER_GOOGLE
  } from 'react-native-maps';

  import Axios from "axios";

  import { COLORS, SIZES, FONTS, images, dummyData } from "../constants";

const ASPECT_RATIO = SIZES.width / SIZES.height;
const LATITUDE = 1.290270;
const LONGITUDE = 103.851959;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Profile = () => {
  const initialMapState = {
    markers : [
      {
        coordinate: {
          latitude: 1.285726712688698,
          longitude: 103.85071933676124,
        },
        title: "Amazing Food Place",
        description: "This is the best food place",
        // image: Images[0].image,
        rating: 4,
        reviews: 99,
      },
      {
        coordinate: {
          latitude: 1.285619451339921,
          longitude: 103.85272562890934,
        },
        title: "Second Amazing Food Place",
        description: "This is the second best food place",
        // image: Images[1].image,
        rating: 5,
        reviews: 102,
      },
      {
        coordinate: {
          latitude: 1.2848042649419327,
          longitude: 103.85078370977133,
        },
        title: "Third Amazing Food Place",
        description: "This is the third best food place",
        // image: Images[2].image,
        rating: 3,
        reviews: 220,
      },
      {
        coordinate: {
          latitude: 1.2868422304487968,
          longitude: 103.85182440676795,
        },
        title: "Fourth Amazing Food Place",
        description: "This is the fourth best food place",
        // image: Images[3].image,
        rating: 4,
        reviews: 48,
      },
      {
        coordinate: {
          latitude: 1.2883546143251305,
          longitude: 103.85032236986562,
        },
        title: "Fifth Amazing Food Place",
        description: "This is the fifth best food place",
        // image: Images[3].image,
        rating: 4,
        reviews: 178,
      },
  ],
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  }
  const [isLoading, setLoading] = useState(true);
const [cordinates, setCordinates] =  useState(initialMapState)

useEffect(() => {
  fetchData()
  
}, []);

function fetchData() {
  Axios.get('https://developers.onemap.sg/commonapi/search?searchVal=revenue&returnGeom=Y&getAddrDetails=Y&pageNum=1')
    .then(({ data }) => {
      // setPage(page + 1)
      // setDataSource([...dataSource, ...data.data])
      console.log(data)
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}

function mapType() {
  
  // MapKit does not support 'none' as a base map
  return propTyps.provider === PROVIDER_DEFAULT
    ? MAP_TYPES.STANDARD
    : MAP_TYPES.NONE;
}

  return (
    <View style={styles.container}>
        <MapView
          provider={PROVIDER_DEFAULT}
          mapType={MAP_TYPES.NONE}
          style={styles.map}
          initialRegion={cordinates.region}
          zoomEnabled={true}
          minZoomLevel={11}
          maxZoomLevel={18}
        >
          {/* <MapView.UrlTile
            urlTemplate="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"
            zIndex={-1}
          /> */}
          <UrlTile
            urlTemplate="https://maps-a.onemap.sg/v3/Default/{z}/{x}/{y}.png"
            zIndex={-1}
        />
        {cordinates.markers.map((marker, index) => (
            <Marker
              title={marker.title}
              image={images.flagPin}
              key={index}
              coordinate={marker.coordinate}
            />
          ))}
        <Marker
            // onPress={() => this.setState({ marker1: !this.state.marker1 })}
            coordinate={{
              latitude: LATITUDE ,
              longitude: LONGITUDE,
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
            image={images.flagPin}
          >
            
          </Marker>
          
        </MapView>
        <View style={styles.searchBox}>
          <TextInput 
            placeholder="Search here"
            placeholderTextColor={COLORS.lightGray2}
            autoCapitalize="none"
            style={{flex:1,padding:0}}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  searchBox: {
    position: 'absolute',
    margin: 20,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    width: 'auto',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    top: 0,
    right: 0,
    left: 0

  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default Profile;