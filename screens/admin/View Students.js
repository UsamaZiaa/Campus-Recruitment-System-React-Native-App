import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'; 
import Firebase from '../../config/firebaseConfig'
import Header from '../../components/Header'

export default function ViewStudents({navigation}) {
  const [students, setStudents] = useState([])

  useEffect(() => {
    // Fetching Doctor Data
    const studentData =  Firebase.database().ref('students');
    studentData.on('value',data => {
    const rawData = Object.values(data.val())
    setStudents(rawData)
    // console.log('Data Recieved Hogaya', rawData)
    }) 
  }, []);

  const Logout = () => {
    navigation.navigate('Home')
    // console.log('sds')
  }

  const deleteUser = (uid) => {
    console.log(uid)
    Firebase.database().ref('students').child(uid).remove()
}

  return (
      <View style={styles.container}>
        <Header title="View Students" Logout = {Logout} />
        <FlatList
            keyExtractor={(item)=>item.uid}
            data={students}
            renderItem={({item})=>(
                <TouchableOpacity
                activeOpacity={.6}
                style={styles.card}
                onPress = {() => navigation.navigate('StudentProfile', item)}
                >
                <View style={{height: '100%', width: 90, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{ uri: item.imgURI }}
                    style={styles.Image} />
                </View>
                <View style={{height: '100%', width: 130, justifyContent: 'center'}}>
                    <Text style={styles.cardTitle} >{item.name}</Text>
                    <Text style={styles.cardText} >{item.department}</Text>
                    <Text style={styles.cardText} >{item.email}</Text>
                    <Text style={styles.cardText} >CGPA: {item.cgpa}</Text>
                </View>    
                <View style={{height: '100%', width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity activeOpacity={.6} onPress = {() => deleteUser(item.uid)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText} >Delete</Text>                             
                        </View>
                    </TouchableOpacity>
                </View>
                </TouchableOpacity>          
            )}
            />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight
    },
    card: {
      backgroundColor: 'white',
      width: 300,
      height: 120,
      margin: 10,
      alignSelf: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      flexDirection: 'row',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
      borderRadius: 5
    },
    cardTitle: {
        color: '#fbab1b',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
    },
    Image: {
      resizeMode: 'contain',
      width: 60,
      height: 60,
      borderRadius: 60,
   },
   button:{
       height: 25,
       width: 60,
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 5,
      backgroundColor: '#fbab1b'     
   },
   buttonText: {
       color: 'white',
       fontWeight: 'bold',
       textTransform: 'uppercase',
       fontSize: 10,
       textAlign: 'center'
   }
  });