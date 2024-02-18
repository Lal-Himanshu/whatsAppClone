import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Time,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {IconButton, Menu} from 'react-native-paper';

const Chat = ({route}) => {
  const dispatch = useDispatch();
  async function logOut() {
    Alert.alert('User Logged Out');
    await AsyncStorage.removeItem('currUser');
    dispatch(setUser(null));
  }
  const {groupName} = route.params;
  const {image} = route.params;
  console.log(image);
  console.log(groupName);
  const [messages, setMessages] = useState([]);
  const [currentUserMobile, setCurrentUserMobile] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const screenWidth = Dimensions.get('window').width;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: image}}
            style={{
              width: screenWidth * 0.1,
              height: screenWidth * 0.1,
              borderRadius: (screenWidth * 0.1) / 2,
              marginRight: screenWidth * 0.02,
            }}
          />
          <Text style={{fontSize: screenWidth * 0.05, color: '#fff'}}>
            {groupName}
          </Text>
          <TouchableOpacity onPress={openMenu}>
            <Image
              style={{
                width: screenWidth * 0.08,
                height: screenWidth * 0.08,
                marginLeft: screenWidth * 0.33,
                marginTop: screenWidth * 0.015,
              }}
              source={require('../images/homeMenuBtn.png')}
            />
          </TouchableOpacity>
          <Menu visible={visible} onDismiss={closeMenu}>
            <Menu.Item
              onPress={() => navigation.navigate('CreateGroup')}
              title="New Group"
            />
            <Menu.Item onPress={() => logOut()} title="Logout" />
          </Menu>
        </View>
      ),
    });
  }, [navigation, groupName, image, visible]);

  useEffect(() => {
    const fetchCurrentUserMobile = async () => {
      const mobile = await AsyncStorage.getItem('currentUserMobile');
      setCurrentUserMobile(mobile);
    };

    fetchCurrentUserMobile();
  }, []);

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('groups')
      .doc(groupName)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const fetchedMessages = querySnapshot.docs.map(doc => {
          const message = doc.data();
          const createdAt = message.createdAt
            ? message.createdAt.toDate()
            : new Date();
          return {
            ...message,
            _id: doc.id,
            name: userNow,
            createdAt: createdAt,
          };
        });
        setMessages(fetchedMessages);
      });

    return () => unsubscribeListener();
  }, [groupName]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const formattedMessages = newMessages.map(message => {
        return {
          ...message,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
      });

      await firestore()
        .collection('groups')
        .doc(groupName)
        .collection('messages')
        .add(formattedMessages[0]);
    },
    [groupName],
  );
  const userNow = useSelector(state => state.rootReducer.authReducer);
  const renderBubble = props => {
    console.log(props);
    const isCurrentUser = props.currentMessage.user._id === userNow;
    // console.log(userNow);
    console.log(props.user._id);
    return (
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            fontWeight: '700',
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
            marginBottom: 2,
            marginLeft: isCurrentUser ? 0 : 8,
            marginRight: isCurrentUser ? 8 : 0,
          }}>
          {props.user._id}
        </Text>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: isCurrentUser ? '#DCF8C6' : '#fff',
              padding: 5,
              marginTop: 4,
            },
            right: {
              backgroundColor: isCurrentUser ? '#DCF8C6' : '#fff',
              padding: 5,
              marginTop: 4,
            },
          }}
          textStyle={{
            left: {
              color: 'black',
            },
            right: {
              color: 'black',
            },
          }}
        />
      </View>
    );
  };

  const renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: '#555',
          },
          right: {
            color: '#555',
          },
        }}
      />
    );
  };
  const handleSend = newMessages => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    onSend(newMessages);
  };
  const chooseImage = async () => {
    const result = await launchImageLibrary();
    const imgPath = result.assets[0].uri;

    const newMessage = {
      _id: Math.random().toString(36).substring(7),
      image: imgPath,
      createdAt: new Date(),
      user: {
        _id: userNow,
      },
    };
    handleSend([newMessage]);
  };
  const renderSend = props => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={chooseImage}
          style={{
            borderRadius: 100,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: 7,
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../images/add-photo.png')}
          />
        </TouchableOpacity>
        <Send {...props}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#08B29F',
              padding: 10,
              borderRadius: 100,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../images/send-message.png')}
            />
          </View>
        </Send>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../images/chatBackgroundImg.jpg')}
        style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          alwaysShowSend
          renderSend={renderSend}
          user={{
            _id: userNow,
            name: userNow,
          }}
          renderTime={renderTime}
          renderAvatar={null}
          textInputStyle={{
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 12,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                containerStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  marginBottom: 5,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                }}
                {...props}
              />
            );
          }}
          renderBubble={renderBubble}
        />
      </ImageBackground>
    </View>
  );
};

export default Chat;
