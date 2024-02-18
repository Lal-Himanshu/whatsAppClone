import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setUser} from '../redux/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {Provider as PaperProvider, Menu, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const screenWidth = Dimensions.get('window').width;
const Home = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch();
  async function logOut() {
    Alert.alert('User Logged Out');
    await AsyncStorage.removeItem('currUser');
    dispatch(setUser(null));
  }
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const getGroups = () => {
    return firestore()
      .collection('groups')
      .onSnapshot(querySnapshot => {
        const groupsArray = [];
        querySnapshot.forEach(doc => {
          groupsArray.push({id: doc.id, ...doc.data()});
        });
        setGroups(groupsArray);
      });
  };

  useEffect(() => {
    const unsubscribe = getGroups();
    return () => unsubscribe();
  }, []);
  function handleNavigation(item) {
    // console.log(item.id);
    navigation.navigate('Chat', {
      groupName: item.id,
      image: item.imgPath,
    });
  }
  // console.log('groups', groups);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTop}>
          <Text style={styles.whatsApp}>WhatsApp</Text>
          <TouchableOpacity>
            <Image
              style={{
                width: 30,
                height: 30,
                marginLeft: screenWidth * 0.25,
                marginTop: 3,
              }}
              source={require('../images/camera.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{width: 25, height: 25, marginLeft: 20, marginTop: 6}}
              source={require('../images/search.png')}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity> */}
          <TouchableOpacity onPress={openMenu}>
            <Image
              style={{width: 25, height: 25, marginLeft: 20, marginTop: 6}}
              source={require('../images/homeMenuBtn.png')}
            />
          </TouchableOpacity>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton onPress={openMenu} />}>
            <Menu.Item
              onPress={() => navigation.navigate('CreateGroup')}
              title="New Group"
            />
            <Menu.Item onPress={() => logOut()} title="Logout" />
          </Menu>
        </View>
        <View style={styles.headerBottom}>
          <TouchableOpacity>
            <View>
              <Text style={[styles.headerBottomText, styles.active]}>
                Groups
              </Text>
              <View style={styles.underline}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerBottomText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerBottomText}>Calls</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.groupItem}></View> */}
      {/* <FlatList
        data={groups}
        renderItem={({item, index}) => {
          return <View style={styles.groupItem}></View>;
        }}
      /> */}
      <FlatList
        data={groups}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => handleNavigation(item)}>
              <View style={styles.groupItem}>
                {item.imgPath !== '' ? (
                  <View style={styles.OuterImage}>
                    <Image
                      source={{uri: item.imgPath}}
                      style={styles.groupIcon}
                    />
                  </View>
                ) : (
                  <View style={styles.OuterImage}>
                    <Image
                      source={require('../images/groupElse.png')}
                      style={styles.groupIcon}
                    />
                  </View>
                )}
                <Text
                  style={{fontSize: 20, color: '#000000', fontWeight: '500'}}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 130,
    backgroundColor: '#008069',
  },
  headerTop: {
    marginTop: 15,
    flexDirection: 'row',
    width: screenWidth,
  },
  whatsApp: {
    marginLeft: 15,
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
  },
  headerBottomText: {
    color: '#fff',
    marginLeft: 15,
    marginRight: 15,
    fontSize: 20,
    marginTop: 29,
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  underline: {
    backgroundColor: 'white',
    height: 3,
    width: '100%',
    marginTop: 3,
  },
  active: {
    fontWeight: 'bold',
  },
  groupItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 30,
  },
});
