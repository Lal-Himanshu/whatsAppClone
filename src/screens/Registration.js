import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../redux/authReducer';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ErrorText from '../component/common/ErrorText';
const countries = [
  {name: 'India', code: '+ 91'},
  {name: 'United State', code: '+ 1'},
  {name: 'China', code: '+ 86'},
];
const Registration = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('*'),
    phoneNumber: Yup.number().required('*').positive().integer(),
  });
  const registerUser = async () => {
    if (phoneNumber === '' || name === '') {
      Alert.alert('Invalid Inputs');
      return;
    }
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .where('mobile', '==', phoneNumber)
      .get()
      .then(async response => {
        if (response.docs.length !== 0) {
          console.log(JSON.stringify(response.docs[0].data()));
          await AsyncStorage.setItem('currUser', phoneNumber);
          dispatch(setUser(phoneNumber));
          Alert.alert('user already exist,Navigating to Home Screen');
          navigation.navigate('Home');
        } else {
          await AsyncStorage.setItem('currUser', phoneNumber);
          dispatch(setUser(phoneNumber));
          Alert.alert(
            'User created successfully 🎉🎉, Navigating to Home Screen',
          );
          navigation.navigate('Home'),
            firestore()
              .collection('users')
              .doc(phoneNumber)
              .set({
                name: name,
                mobile: phoneNumber,
                userId: phoneNumber,
              })
              .then(response => {
                console.log('user created');
              })
              .catch(error => {
                console.log(error);
              });
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('user not found catch error');
      });
  };

  const handleCountryChange = (itemValue, itemIndex) => {
    setSelectedCountry(countries[itemIndex]);
  };
  return (
    <Formik
      initialValues={{name: '', phoneNumber: ''}}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, values, errors, touched}) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Register your phone number</Text>
            <TouchableOpacity>
              <Image
                style={{width: 25, height: 25, marginLeft: 20, marginTop: 6}}
                source={require('../images/registrationMenuBtn.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.para}>
            WhatsApp will store your phone number in firestore data base. Enter
            your country code and phone number:
          </Text>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={handleCountryChange}
            style={styles.picker}>
            {countries.map((country, index) => (
              <Picker.Item key={index} label={country.name} value={country} />
            ))}
          </Picker>
          <View style={styles.underline} />
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>{selectedCountry.code}</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                handleChange('phoneNumber')(text);
                setPhoneNumber(text);
              }}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              placeholder="phone number"
              keyboardType="phone-pad"
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <ErrorText str={errors.phoneNumber} />
            )}
          </View>
          <View style={styles.nameContainer}>
            <TextInput
              style={styles.nameInput}
              onChangeText={text => {
                handleChange('name')(text);
                setName(text);
              }}
              onBlur={handleBlur('name')}
              value={values.name}
              maxLength={25}
              placeholder="your name"
            />
            <Text style={styles.counter}>{25 - name.length}</Text>
            {errors.name && touched.name && <ErrorText str={errors.name} />}
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              registerUser();
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    marginLeft: 40,
    alignItems: 'center',
  },
  picker: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    marginRight: 15,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  input: {
    flex: 1,
    height: 40,
    width: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#808080',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  underline: {
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    color: 'rgb(13,142,128)',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
  },
  para: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#00CC3F',
    width: 100,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '100%',
    borderRadius: 5,
  },
  nameInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#808080',
    paddingHorizontal: 10,
  },
  counter: {
    marginTop: 30,
    borderBottomWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#808080',
    paddingHorizontal: 10,
  },
  nameContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Registration;
