import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Header(props) {
    const {image, Logout} = props
    // console.log(image)

  return (
    <View style={styles.container}>
        <Image
            source={{ uri: image }}
            style={styles.Image}
        />
        <TouchableOpacity
            onPress={Logout}
        >
            <Text style={{fontWeight: 'bold', color: '#fbab1b'}}>
                Logout
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
      backgroundColor: '#fff',
      height: 60,
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 15,
      shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    Image: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        borderRadius: 400,
        marginVertical: 40,
     },
  });