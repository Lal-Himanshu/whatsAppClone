import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to WhatsApp</Text>
      <Image
        style={styles.img}
        source={require('../images/whatsappWelcome.png')}
      />
      <Text style={styles.bottom}>
        Read our <Text style={{color: '#14A7EF'}}>Privacy Policy.</Text> Tap
        "Agree and continue" to accept the{' '}
        <Text style={{color: '#14A7EF'}}>Terms of Service.</Text>
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Registration')}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
          }}>
          AGREE AND CONTINUE
        </Text>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontSize: 15,
            textAlignVertical: 'center',
            verticalAlign: 'middle',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            color: '#25D366',
            marginTop: 50,
          }}>
          from
        </Text>
        <View style={styles.bottomLogo}>
          <Svg
            style={styles.mLogo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512">
            <Path
              fill="#25d366"
              d="M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.4 466.4 0 409.1 0 320.5C0 177.5 79.8 42.4 183.9 42.4C234.1 42.4 277.7 67.1 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.2 217.8 69.2 321.7C69.2 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.1 454.9 97.1C421.7 97.1 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"
            />
          </Svg>
          <Text
            style={{
              fontSize: 30,
              textAlignVertical: 'center',
              verticalAlign: 'middle',
              alignItems: 'center',
              alignContent: 'center',
              textAlign: 'center',
              color: '#25D366',
            }}>
            Meta
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  heading: {
    marginTop: 60,
    marginBottom: 50,
    fontSize: 35,
    fontWeight: '500',
    color: 'rgb(13,142,128)',
    backgroundColor: '#fff',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  img: {
    width: 350,
    height: 350,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bottom: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 60,
  },
  btn: {
    backgroundColor: '#00CC3F',
    width: 300,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 8,
  },
  bottomLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    marginBottom: '100%',
  },
  mLogo: {
    width: 30,
    height: 30,
  },
});
