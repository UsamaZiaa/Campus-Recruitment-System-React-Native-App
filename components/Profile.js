import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Profile(props) {
    const {username, accountType, img} = props

  return (
      <>
      
    <View style={styles.imgcontainer}>
        <Image
            source={{ uri: img }}
            style={styles.Image}
        />
    </View>

    <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between'}}>
            <Text style={styles.text}>
                Name
            </Text>
            <Text style={styles.text}>
                {username}
            </Text>
        </View>
    </View>

    <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between'}}>
            <Text style={styles.text}>
                Account Type
            </Text>
            <Text style={styles.text}>
                {accountType}
            </Text>
        </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
      backgroundColor: 'black',
      height: 35,
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 20,
     paddingVertical: 10,
     opacity: 0.8
    },
    imgcontainer: {
        flexDirection: 'row',
      backgroundColor: 'black',
      height: 100,
     justifyContent: 'center',
     alignItems: 'center',
     opacity: 0.8
    },
    text: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,   
    },
    Image: {
        resizeMode: 'contain',
        width: 75,
        height: 75,
        borderRadius: 400,
        paddingVertical: 40,
     },
  });