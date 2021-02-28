import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, Alert, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid'
import Firebase from '../../config/firebaseConfig'
import Constants from 'expo-constants';  

const reviewSchema = yup.object({
  name: yup.string().required('Name is Required'),
  email: yup.string().email('Please Enter Valid Email').required('Email is Required'),
  contact: yup.string().required('Contact Number is Required'),
  department: yup.string().required('Department is Required'),
  cgpa: yup.string().required('CGPA/Marks is Required'),
  password: yup.string().required('Password is Required'),
  address: yup.string().required('Address is Required'),
})

export default function AddStudent() {
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  // const [uid, setUID] = useState(null)

  const createUser = async (values) => {
    Firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log('usama ---> ',user.uid)
      var obj = {uid: user.uid, ...values}
      console.log('data',obj)
      // navigation.navigate('UploadPicture',obj)      
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      var error = errorMessage.includes("assword")
      if(error){
        setPasswordError(errorMessage)        
        setEmailError(null)
        console.log(error)
      } else{
        setPasswordError(null)        
        setEmailError(errorMessage)
        console.log(error)
      }
      // ..
    });
  }

  return (
      <View style={styles.container}>
        <ScrollView>

          {/* -------- Text Container --------- */}
          <View style={{marginTop: 30}}>
            <Text
              style={{color: '#fbab1b', fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>
              Add New Student
            </Text>
          </View>

            {/* -------- Form Container --------- */}
          <Formik
            // validationSchema = {reviewSchema}
            initialValues={{
              name: '',
              email: '',
              contact: '',
              department: '',
              cgpa: '',
              password: '',
              address: '',
              userType: 'student'
            }}
            onSubmit = {(values, actions) => {
            console.log(values)
            createUser(values)
            // console.log('My Id -->', uid)
            // navigation.navigate('UploadPicture')  
            }}
          >
          {(props)=>(
            <View style={styles.FormContainer}>

              <TextInput 
                style={styles.input}
                placeholder = 'Student Name'
                onChangeText = {props.handleChange('name')}
                value = {props.values.name}
                onBlur = {props.handleBlur('name')}
              />
              <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>

              <TextInput 
                style={styles.input}
                placeholder = 'Student Email'
                onChangeText = {props.handleChange('email')}
                value = {props.values.email}
                onBlur = {props.handleBlur('email')}
              />
              {emailError ? 
                <Text style={styles.errorText}>{emailError}</Text>
                :
                null
              }
              <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>

              <TextInput 
                style={styles.input}
                placeholder = 'Student Contact'
                onChangeText = {props.handleChange('contact')}
                value = {props.values.contact}
                onBlur = {props.handleBlur('contact')}
                keyboardType = 'numeric'
              />
              <Text style={styles.errorText}>{props.touched.contact && props.errors.contact}</Text>

              <TextInput 
                style={styles.input}
                placeholder = 'Student Department'
                onChangeText = {props.handleChange('department')}
                value = {props.values.department}
                onBlur = {props.handleBlur('department')}
              />
              <Text style={styles.errorText}>{props.touched.department && props.errors.department}</Text>  

              <TextInput 
                style={styles.input}
                placeholder = 'Student CGPA/Marks'
                onChangeText = {props.handleChange('cgpa')}
                value = {props.values.cgpa}
                onBlur = {props.handleBlur('cgpa')}
              />
              <Text style={styles.errorText}>{props.touched.cgpa && props.errors.cgpa}</Text>  

              <TextInput 
                style={styles.input}
                placeholder = 'Password'
                onChangeText = {props.handleChange('password')}
                value = {props.values.password}
                onBlur = {props.handleBlur('password')}
                secureTextEntry = {true}
              />
              {passwordError ? 
                <Text style={styles.errorText}>{passwordError}</Text>
                :
                null
              }
              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

              <TextInput 
                style={styles.input}
                placeholder = 'Student Address'
                onChangeText = {props.handleChange('address')}
                value = {props.values.address}
                onBlur = {props.handleBlur('address')}
              />
              <Text style={styles.errorText}>{props.touched.address && props.errors.address}</Text>

              <Button 
                title="Create Account"
                color="#fbab1b"
                onPress={props.handleSubmit}
                // onPress={()=>{navigation.navigate('UploadPicture')}}
              />
            
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
      marginTop: Constants.statusBarHeight
    },
    FormContainer:{
      paddingHorizontal: 20,
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 60,
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