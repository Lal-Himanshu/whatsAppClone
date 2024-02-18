import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/authReducer';

const Splash = () => {
  const userNow = useSelector(state => state.rootReducer.authReducer);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('currUser');
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [userNow]);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      {
        userNow ? navigation.navigate('Home') : navigation.navigate('Welcome');
      }
    }, 2000);
  }, [userNow]);
  return (
    <View style={{alignSelf: 'center'}}>
      <View style={{marginBottom: 250, marginTop: 150}}>
        <Svg
          style={styles.wLogo}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <Path
            fill="#25d366"
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
          />
        </Svg>
      </View>
      <View style={styles.bottomMsg}>
        <Text
          style={{
            fontSize: 20,
            textAlignVertical: 'center',
            verticalAlign: 'middle',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            color: '#25D366',
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
              fontSize: 40,
              textAlignVertical: 'center',
              verticalAlign: 'middle',
              alignItems: 'center',
              alignContent: 'center',
              textAlign: 'center',
              color: '#25D366',
            }}>
            {' '}
            Meta
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wLogo: {
    width: 200,
    height: 200,
  },
  mLogo: {
    width: 45,
    height: 45,
  },
  bottomLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
  },
});
export default Splash;
