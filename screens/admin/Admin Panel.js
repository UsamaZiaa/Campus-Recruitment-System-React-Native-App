import React,{useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'; 
import Firebase from '../../config/firebaseConfig'
import Header from '../../components/Header'

export default function AdminPanel({navigation}) {

    useEffect(() => {
        // Fetching Doctor Data
        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('uid mil gayi',user.uid)
            } else {
                console.log('no user login')
            }
          }); 
      }, []);

      const Logout = () => {
        navigation.navigate('Home')
        // console.log('sds')
      }

      const adminTasks = [
        {name: 'Add Student',src: require('../../images/student-icon.png'), id: '1', screen: 'AddStudent'},
        {name: 'View Students',src: require('../../images/student-icon.png'), id: '2', screen: 'ViewStudents'},
        {name: 'Add Company',src: require('../../images/company-icon.png'), id: '3', screen: 'AddCompany'},
        {name: 'View Companies',src: require('../../images/company-icon.png'), id: '4', screen: 'ViewCompany'},
        {name: 'View Jobs',src: require('../../images/job-icon.png'), id: '5', screen: 'ViewJobs'},
      ]
      const pressHandler = (screen) => {
        console.log("Hello" + screen)
        navigation.navigate(screen)
      }

  return (
      <View style={styles.container}>
        <Header title="Admin Panel" Logout = {Logout} />

        <View style={styles.body} >
        <FlatList
          numColumns={2}
          keyExtractor={(item)=>item.id}
          data={adminTasks}
          renderItem={({item})=>(
            <TouchableOpacity
              activeOpacity={.6}
              style={styles.card}
              onPress = {() => pressHandler(item.screen)}
              >
              <Image source={item.src} style={styles.cardIcon} />
              <Text style={styles.cardText} >{item.name}</Text>
            </TouchableOpacity>          
          )}
        />
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
      },
      card: {
        backgroundColor: '#fff',
        width: 140,
        height: 140,
        margin: 10,
        paddingTop: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius: 5
      },
      cardText: {
          color: '#fbab1b',
          fontWeight: 'bold',
          fontSize: 16,
      },
      cardIcon: {
        // resizeMode: 'contain',
        width: 80,
        height: 80,
      }  
  });