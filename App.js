import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Alexander Rodriguez 2022-0005
export default function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [marcador, setMarcador] = useState(null);


  useEffect(() => {
    if (marcador) {
      obtenerCiudadPais(marcador.latitude, marcador.longitude);
    }
  }, [marcador]);

  const obtenerCiudadPais = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng} `
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setCiudadPais(data.results[0].formatted_address);
      } else {
        setCiudadPais('');
      }
    } catch (error) {
      console.error('Error al obtener la información de ubicación:', error);
    }
  };

  const handleSiguiente = () => {
    if (nombre === '' || apellido === '' || latitud === '' || longitud === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos');
    } else {
      setMarcador({ latitude: parseFloat(latitud), longitude: parseFloat(longitud) });
    }
  };

  const limpiar = () => {
    setNombre('');
    setApellido('');
    setLatitud('');
    setLongitud('');
    setMarcador(null);
    setCiudadPais('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={text => setNombre(text)}
          value={nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={text => setApellido(text)}
          value={apellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitud"
          onChangeText={text => setLatitud(text)}
          value={latitud}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitud"
          onChangeText={text => setLongitud(text)}
          value={longitud}
          keyboardType="numeric"
        />
        

       
      </View>
      <View style={styles.btn}>
      <Button title="Siguiente" onPress={handleSiguiente} />
        <Button title='Limpiar' onPress={() => {limpiar()}} />
        </View>
      {marcador && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: marcador.latitude,
            longitude: marcador.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{ latitude: marcador.latitude, longitude: marcador.longitude }}
            title={`${nombre} ${apellido}`}
            description={`Latitud: ${latitud}, Longitud: ${longitud}`}
          />
        </MapView>
      )}
    </View>
  );
}

// Alexander Rodriguez 2022-0005
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  btn:{
  gap: 10,
    justifyContent: 'space-between',
    width: '80%',
  },
  form: {
    width: '80%',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  map: {
    width: '100%',
    height: '50%',
    marginTop: 20,
  },
});
