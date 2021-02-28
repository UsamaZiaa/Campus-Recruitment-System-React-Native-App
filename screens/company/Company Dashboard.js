import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'; 
import Firebase from '../../config/firebaseConfig'
import Header from '../../components/Header'
import Profile from '../../components/Profile'

export default function CompanyDashboard({navigation}) {
  const [user, setUser] = useState([])

  useEffect(() => {
    // Fetching Doctor Data
    Firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('uid mil gayi',user.uid)
            const userData =  Firebase.database().ref('companies').child(user.uid);
            userData.on('value',data => {
             setUser(data.val())
            //  console.log('Boom')
            }) 
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
    {name: 'View Profile',src: require('../../images/user-icon.png'), id: '1', screen: 'ViewCompanyProfile'},
    {name: 'Add Job',src: require('../../images/job-icon.png'), id: '3', screen: 'AddJob'},
    {name: 'View Jobs',src: require('../../images/job-icon.png'), id: '5', screen: 'CompanyJobs'},
    {name: 'View Students',src: require('../../images/student-icon.png'), id: '2', screen: 'StudentList'},
  ]
  const pressHandler = (screen) => {
    console.log("Hello" + screen)
    navigation.navigate(screen, user)
  }

  return (
      <View style={styles.container}>
        <Header title={user.name} Logout = {Logout} />
        <Profile username = {user.name} accountType = {user.userType} img = {user.imgURI} />
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