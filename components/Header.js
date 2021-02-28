import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Header(props) {
    const {title, Logout} = props
    // console.log(image)

  return (
    <View style={styles.container}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 20}}>{title}</Text>  
        <TouchableOpacity
            onPress={Logout}
        >
            <Text style={{fontWeight: 'bold', color: '#fff'}}>
                Logout
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
      backgroundColor: '#fbab1b',
      height: 60,
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 15,
    },
    Image: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        borderRadius: 400,
        marginVertical: 40,
     },
  });