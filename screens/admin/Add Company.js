import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, Alert, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid'
import Firebase from '../../config/firebaseConfig'
import Constants from 'expo-constants';  
import Header from '../../components/Header'

const reviewSchema = yup.object({
  name: yup.string().required('Name is Required'),
  email: yup.string().email('Please Enter Valid Email').required('Email is Required'),
  contact: yup.string().required('Contact Number is Required'),
  about: yup.string().required('Description is Required'),
  password: yup.string().required('Password is Required'),
  address: yup.string().required('Address is Required'),
})

export default function AddCompany({navigation}) {
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = Firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  const uploadPic = async (props) => {
    let imgURI = image
    let filename = imgURI.split('/').pop();
    const uploadUrl = await uploadImageAsync(imgURI);
    var user = {...props, ...{'imgURI' : uploadUrl}}
    console.log('uid->',user.uid)
    Firebase.database().ref('/').child('companies').child(user.uid).set(user);
    setLoading(false);
    Alert.alert('Congratulations','Account Created Successfully', [
      {text: 'Finish', onPress: () => navigation.navigate('AdminPanel')}
    ])
}

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
});

if (!result.cancelled) {
  setImage(result.uri);
}
};

  const createUser = async (values) => {
    if(!image){
      setImageError(true)
      return
    }
    setImageError(false)
    Firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      setLoading(true)
      // Signed in 
      var user = userCredential.user;
      console.log('usama ---> ',user.uid)
      var obj = {uid: user.uid, ...values}
      // console.log('data',obj)
      uploadPic(obj)
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

  const Logout = () => {
    navigation.navigate('Home')
  }

  return (
      <View style={styles.container}>
      {loading ? <ActivityIndicator size={100} animating={true} color="#fbab1b" style={styles.loading} /> : null }
      <Header title="Add Company" Logout = {Logout} />
        <ScrollView>

      {/* -------- Image --------- */}
      <View style={{alignItems: 'center', position: 'relative'}}>
        {image ? <Image source={{ uri: image }} style={styles.Image} /> :
            <Image source={{ uri: 'https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png' }} style={styles.Image} />
        }
      {/* ------------ Icons ------------ */}
        <TouchableOpacity
            activeOpacity={.6}
            onPress={pickImage}
            style={{position: 'absolute', bottom: 0}}
        >
            <MaterialIcons name="camera-enhance" size={35} color= '#fbab1b' />
        </TouchableOpacity>
      </View>
      {imageError ?
        <Text style={styles.errorImage}>Please Choose Your Image</Text>
        :
        null
        }

            {/* -------- Form Container --------- */}
          <Formik
            validationSchema = {reviewSchema}
            initialValues={{
              name: '',
              email: '',
              contact: '',
              about: '',
              password: '',
              address: '',
              userType: 'company'
            }}
            onSubmit = {(values, actions) => {
            console.log(values)
            createUser(values)
            }}
          >
          {(props)=>(
            <View style={styles.FormContainer}>

              <TextInput 
                style={styles.input}
                placeholder = 'Company Name'
                onChangeText = {props.handleChange('name')}
                value = {props.values.name}
                onBlur = {props.handleBlur('name')}
              />
              <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>

              <TextInput 
                style={styles.input}
                placeholder = 'Company Description'
                onChangeText = {props.handleChange('about')}
                value = {props.values.about}
                onBlur = {props.handleBlur('about')}
              />
              <Text style={styles.errorText}>{props.touched.about && props.errors.about}</Text>

              <TextInput 
                style={styles.input}
                placeholder = 'Company Email'
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
                placeholder = 'Company Contact'
                onChangeText = {props.handleChange('contact')}
                value = {props.values.contact}
                onBlur = {props.handleBlur('contact')}
                keyboardType = 'numeric'
              />
              <Text style={styles.errorText}>{props.touched.department && props.errors.department}</Text>  

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
                placeholder = 'Company Address'
                onChangeText = {props.handleChange('address')}
                value = {props.values.address}
                onBlur = {props.handleBlur('address')}
              />
              <Text style={styles.errorText}>{props.touched.address && props.errors.address}</Text>

              <Button 
                title="Create Account"
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
  errorImage: {
    color: 'crimson',
    textAlign: 'center'
  },
  Image: {
    resizeMode: 'contain',
    width: 120,
    height: 120,
    borderRadius: 400,
    marginVertical: 10,
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