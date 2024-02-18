import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import Registration from '../screens/Registration';
import Home from '../screens/Home';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider as PaperProvider} from 'react-native-paper';
import {setUser} from '../redux/authReducer';
import CreateGroup from '../screens/CreateGroup';
import Chat from '../screens/Chat';
const Stack = createStackNavigator();
const AppNavigator = () => {
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
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {userNow ? (
            <>
              <Stack.Screen
                name={'Splash'}
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={'Home'}
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={'CreateGroup'}
                component={CreateGroup}
                options={{
                  headerShown: true,
                  headerStyle: {backgroundColor: '#008069'},
                  headerTintColor: 'white',
                  headerTitle: 'New Group',
                }}
              />
              <Stack.Screen
                name={'Chat'}
                component={Chat}
                options={{
                  headerShown: true,
                  headerStyle: {backgroundColor: '#008069'},
                  headerTintColor: 'white',
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={'Splash'}
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={'Welcome'}
                component={Welcome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={'Registration'}
                component={Registration}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator;
