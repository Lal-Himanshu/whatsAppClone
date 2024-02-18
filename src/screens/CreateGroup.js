import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
const CreateGroup = () => {
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState('');
  const [img, setImage] = useState('');
  const addImage = async () => {
    const result = await launchImageLibrary();
    const imgPath = result.assets[0].uri;
    setImage(imgPath);
  };
  const createGroupFunc = async () => {
    if (groupName === '') {
      Alert.alert('Invalid Group Name');
      return;
    }
    const userId = uuid.v4();
    try {
      const groupQuerySnapshot = await firestore()
        .collection('groups')
        .where('name', '==', groupName)
        .get();

      if (!groupQuerySnapshot.empty) {
        Alert.alert('Group already exists, Navigating to Home Screen');
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Group created successfully 🎉🎉, Navigating to Home Screen',
        );
        await firestore().collection('groups').doc(groupName).set({
          name: groupName,
          imgPath: img,
          userId: userId,
        });
        navigation.navigate('Home');
        console.log('Group created');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error creating group');
    }
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={addImage}>
          <View style={styles.img}>
            {img === '' ? (
              <Image
                style={styles.icon}
                source={require('../images/group.png')}
              />
            ) : (
              <Image
                style={styles.img}
                source={{
                  uri: img,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.nameInput}
            onChangeText={text => {
              setGroupName(text);
            }}
            value={groupName}
            maxLength={25}
            placeholder="group name (mandatory)"
          />
          <Text style={styles.counter}>{25 - groupName.length}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          createGroupFunc();
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#CFD8DD',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    width: '80%',
    height: '80%',
    borderRadius: 50,
  },
  nameInput: {
    borderBottomWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#808080',
    paddingHorizontal: 10,
    width: '70%',
    textAlign: 'center',
  },
  counter: {
    marginTop: 30,
    borderBottomWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#808080',
    paddingHorizontal: 10,
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
});
