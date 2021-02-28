import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'; 

export default function Home({navigation}) {

    const handleAdmin = () => {
        console.log("Hello Admin")
        navigation.navigate('Admin')
    }

    const handleCompany = () => {
        console.log("Hello Company")
        navigation.navigate('Company')
    }

    const handleStudent = () => {
        console.log("Hello Student")
        navigation.navigate('Student')
    }

  return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={.6} onPress={handleStudent}>
            <View style={styles.user}>
                <Image
                source={require('../images/student-icon.png')}
                style={styles.LogoImage}
                />
                <Text>Student</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.6} onPress={handleCompany}>
          <View style={styles.user}>
            <Image
            source={require('../images/company-icon.png')}
            style={styles.LogoImage}
            />
            <Text>Company</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminLogin} activeOpacity={.6} onPress={handleAdmin}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 16}}>Admin Login</Text>  
        </TouchableOpacity>

      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fbab1b',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Constants.statusBarHeight
    },
    user: {
        backgroundColor: '#fff',
        height: 140,
        width: 140,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        },
    LogoImage: {
        height: 100,
        width: 100,
      },
    adminLogin: {
        position: 'absolute',
        bottom: 30,
    }
  });