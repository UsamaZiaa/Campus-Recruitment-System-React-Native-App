import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'; 
import Firebase from '../../config/firebaseConfig'
import Header from '../../components/Header' 

export default function CompanyJobs({navigation, route}) {
  const [jobs, setJobs] = useState([])
  const user = route.params

  useEffect(() => {
    const jobsData =  Firebase.database().ref('jobs').orderByChild('company').equalTo(user.name);
    jobsData.on('value',data => {
    const rawData = Object.values(data.val())
    console.log('ssss',rawData)
    setJobs(rawData)
    // console.log('Data Recieved Hogaya', rawData)
    }) 
  }, []);

  const Logout = () => {
    navigation.navigate('Home')
    // console.log('sds')
  }

  const deleteJob = (data) => {
    // console.log(data.jobId)
    Firebase.database().ref('jobs').child(data.jobId).remove()
}

  return (
      <View style={styles.container}>
        <Header title="View Jobs" Logout = {Logout} />
        <FlatList
            keyExtractor={(item)=>item.jobId}
            data={jobs}
            renderItem={({item})=>(
                <TouchableOpacity
                activeOpacity={.6}
                style={styles.card}
                onPress = {() => navigation.navigate('JobDetails', item)}
                >
                <View style={{height: '100%', width: 210, paddingLeft: 20, justifyContent: 'center'}}>
                    <Text style={styles.cardTitle} >{item.title}</Text>
                    <Text style={styles.cardText} >Company: {item.company}</Text>
                </View>    
                <View style={{height: '100%', width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity activeOpacity={.6} onPress = {() => deleteJob(item)}>
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