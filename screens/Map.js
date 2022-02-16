import React, {useEffect, useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';

export default function Map({navigation}) {

  const contar=()=>{
    navigation.navigate('Novo')
  }

  let [markers, setMarkers] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const res = await fetch('https://mobile.ect.ufrn.br:3003/markers', {
        headers: {
          Authorization: `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`
        }
      });
      const markers = await res.json();
      setMarkers(markers);
    }
    fetchData();
  },[]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {
          markers.map((marker, id) => <Marker
            key={id}
            coordinate = {{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.title}
            description={marker.description}/>)
        }
      </MapView>
      <View style={styles.icon}>
        <TouchableOpacity onPress={contar}>
          <Image style={styles.image} source={require('../assets/st.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    position:'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
  image:{
    width: 50,
    height: 50,
  },
  icon:{
    position:'relative',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingEnd: 15,
    top: 680,
  },
});