import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from 'expo-constants'; 

export default function ViewCompanyProfile({route}) {
  const user = route.params
  return (
      <View style={styles.container}>
        <ScrollView>  
        <View style={styles.container}>
            <Image style = {styles.Image} source={{ uri: user.imgURI }} />
            <Text style = {styles.username}>{user.name}</Text>
            <View style = {styles.body}>
                <Text style = {styles.title}>Name</Text>
                <Text>{user.name}</Text>

                <Text style = {styles.title}>About</Text>
                <Text>{user.about}</Text>

                <Text style = {styles.title}>Contact</Text>
                <Text>{user.contact}</Text>

                <Text style = {styles.title}>Email</Text>
                <Text>{user.email}</Text>

                <Text style = {styles.title}>Contact</Text>
                <Text>{user.contact}</Text>

                <Text style = {styles.title}>Address</Text>
                <Text>{user.address}</Text>

            </View>
        </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  //   alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: Constants.statusBarHeight
  },
    Image: {
      resizeMode: 'contain',
      width: 150,
      height: 150,
      borderRadius: 60,
      alignSelf: 'center'
   },
   username: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#fbab1b',
      alignSelf: 'center'
   },
   body: {
      width: '100%',
      padding: 20,
   },
   title: {
       fontWeight: 'bold',
       fontSize: 16,
       color: '#fbab1b',
       borderTopColor: '#fbab1b',
       borderTopWidth: 2,
       paddingTop: 8,
       marginTop: 8
   }
});