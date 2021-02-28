import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, Alert, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup';
import Firebase from '../../config/firebaseConfig'
import Constants from 'expo-constants';  
import Header from '../../components/Header'

const reviewSchema = yup.object({
  title: yup.string().required('Title is Required'),
  description: yup.string().required('Description is Required'),
})

export default function AddJob({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const user = route.params
  
  const createPost = async (values) => {
    // console.log('values', values)
    const dateNow = new Date().getTime()
    const job = {...values, ...{'jobId' : dateNow}}
    // console.log(job)
    setLoading(true)
    Firebase.database().ref('/').child('jobs').child(job.jobId).set(job);
    setLoading(false);
    Alert.alert('Congratulations','Job Created Successfully', [
      {text: 'Finish', onPress: () => navigation.navigate('CompanyDashboard')}
    ])
}

const Logout = () => {
  navigation.navigate('Home')
}

  return (
      <View style={styles.container}>
        {loading ? <ActivityIndicator size={100} animating={true} color="#fbab1b" style={styles.loading} /> : null }
        <Header title="Add Job" Logout = {Logout} />
        <ScrollView>

            {/* -------- Form Container --------- */}
          <Formik
            validationSchema = {reviewSchema}
            initialValues={{
              title: '',
              description: '',
              email: user.email,
              company: user.name,
              companyId: user.uid,
              address: user.address,
              about: user.about,
            }}
            onSubmit = {(values, actions) => {
            console.log(values)
            createPost(values)
            }}
          >
          {(props)=>(
            <View style={styles.FormContainer}>

              <TextInput 
                style={styles.input}
                placeholder = 'Job Title'
                onChangeText = {props.handleChange('title')}
                value = {props.values.title}
                onBlur = {props.handleBlur('title')}
              />
              <Text style={styles.errorText}>{props.touched.title && props.errors.title}</Text>

              <TextInput 
                style={styles.input}
                placeholder = 'Job Description'
                onChangeText = {props.handleChange('description')}
                value = {props.values.description}
                onBlur = {props.handleBlur('description')}
              />
              <Text style={styles.errorText}>{props.touched.description && props.errors.description}</Text>

              <Button 
                title="Create Job"
                color="#fbab1b"
                onPress={props.handleSubmit}
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
 loading: {
  position: 'absolute',
  zIndex: 1,
  backgroundColor: 'white',
  opacity: 0.8,
  height: '100%',
  width: '100%'
}
  });