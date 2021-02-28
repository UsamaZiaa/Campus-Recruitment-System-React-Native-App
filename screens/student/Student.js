import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik'
import Firebase from '../../config/firebaseConfig'
import * as yup from 'yup';
import Constants from 'expo-constants'; 

const reviewSchema = yup.object({
  email: yup.string().email('Please Enter Valid Email').required('Email is Required'),
  password: yup.string().required('Password is Required'),
})

export default function Student({navigation}) {
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [students, setStudents] = useState([])
  
  useEffect(() => {
    const userData =  Firebase.database().ref('students');
    userData.on('value',data => {
    const rawData = Object.keys(data.val())
    setStudents(rawData)
    console.log('Data Recieved Hogaya', students)
    }) 
  }, []);

  
  const LoginUser = async (values) => {
    let isStudent = true
    Firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.uid)
      setPasswordError(null)        
      setEmailError(null)
      var userId = students.indexOf(user.uid);
      console.log('working...',userId)
      if(userId > 0){
        console.log('True')
        navigation.replace('StudentDashboard')
      }
      else{
        Alert.alert('Sorry','Your account is not belongs to students', [
              {text: 'Finish', onPress: () => navigation.navigate('Home')}
        ])
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var error = errorMessage.includes("assword")
        console.log(errorMessage)
      if(error){
        setPasswordError('The Password is Invalid')        
        setEmailError(null)
        console.log(error)
      } else{
        setEmailError(`${values.email} is not registered email`)        
        setPasswordError(null)        
        console.log(error)
      }
      // ..
    });
  }

  return (
      <View style={styles.container}>
        <ScrollView>
          {/* -------- Logo Container --------- */}
          <View style={styles.LogoContainer}>
            <Image
              source={require('../../images/logo.png')}
              style={styles.LogoImage}
            />
          </View>

          {/* -------- Text Container --------- */}
          <View style={styles.TextContainer}>
            <Text
              style={{color: '#fbab1b', fontSize: 22, fontWeight: 'bold', marginLeft: 25}}>
              Welcome Student,
            </Text>
            <Text
              style={{color: '#000000', fontSize: 16, marginLeft: 25}}>
              Signin to Continue
            </Text>
          </View>

          {/* -------- Form Container --------- */}
          <Formik
            // validationSchema = {reviewSchema}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit = {(values, actions) => {
            // actions.resetForm()
            console.log(values)
            LoginUser(values)
            }}
          >
          {(props)=>(
            <View style={styles.FormContainer}>
              <TextInput 
                onChangeText = {props.handleChange('email')}
                value = {props.values.email}          
                style={styles.input}
                placeholder = 'Enter your Email'
              />
              {emailError ? 
                <Text style={styles.errorText}>{emailError}</Text>
                :
                null
              }
              <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>

              <TextInput 
                onChangeText = {props.handleChange('password')}
                value = {props.values.password}
                style={styles.input}
                placeholder = 'Password'
                secureTextEntry = {true}
              />
              {passwordError ? 
                <Text style={styles.errorText}>{passwordError}</Text>
                :
                null
              }
              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

              <Button 
                title="Login"
                color="#fbab1b"
                onPress={props.handleSubmit}
              />
              <View
                style={{marginTop: 85}}>
                <Button 
                  title="Create New Account"
                  color="#000000"
                  onPress={()=>{navigation.navigate('StudentSignup')}}
                />
              </View>
            </View>
            )}
          </Formik>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  LogoContainer:{
    flex: 2,
    height: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30
  },
  TextContainer:{
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 30,
  },
  FormContainer:{
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  LogoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#fbab1b',
    width: '100%',
    padding: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'crimson',
  },
});