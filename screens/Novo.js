import React, {useEffect, useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TextInput, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';

export default function Novo() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function fetchData() {
    const res = await fetch('https://mobile.ect.ufrn.br:3003/markers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`
      },
      body: JSON.stringify({
        latitude: latitude, 
        longitude: longitude, 
        title: title, 
        description: description})
    });
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        onPress={(event)=>{
          setLatitude(event.nativeEvent.coordinate.latitude)
          setLongitude(event.nativeEvent.coordinate.longitude)
        }}>
        <Marker
          coordinate={{latitude: latitude, longitude: longitude}}
          title={title}
          description={description}/>
      </MapView>
      <TextInput 
            style={styles.input}
            placeholder="Título..." 
            value={title}
            onChangeText={setTitle}/>
      <TextInput 
            style={styles.input}
            placeholder="Descrição..." 
            value={description}
            onChangeText={setDescription}/>
      <TouchableOpacity 
            style={styles.enviar} 
            onPress={()=>fetchData()}>
            <Text>Enviar</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position:'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
  input:{
    top: 280,
    position:'relative',
    height: 40,
    width: 350,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'gray',
      backgroundColor: 'white',
      paddingLeft: 10,
  },
  enviar:{
    top: 280,
    position:'relative',
    padding: 10,
    width: 350,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
});