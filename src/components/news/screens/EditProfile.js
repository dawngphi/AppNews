import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {UserContext} from '../../users/UserContext';
import {updateProfile} from '../../users/UserService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadImage, addNews} from '../NewsService';

const EditProfile = props => {
  const {navigation} = props;
  const {user, setUser} = useContext(UserContext);
  const [avatar, setavatar] = useState(user.avatar ?? '');
  const [name, setname] = useState(user.name ?? '');
  const [email, setemail] = useState(user.email ?? '');
  const [address, setaddress] = useState(user.address ?? '');
  const [phone, setphone] = useState(user.phone ?? '');
  const [birthday, setbirthday] = useState(user.dob ?? '');

  const [oneSave, setOneSave] = useState(false);

  const [image, setImage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [imgPath, setimgPath] = useState(null);

  const onTakePhoto = useCallback(async data => {
    if (data.didCancel) {
      setIsShowModal(false);
    } else if (data.errorCode) {
      setIsShowModal(false);
    } else if (data.errorMessage) {
      setIsShowModal(false);
    } else {
      setImage(data.assets[0].uri);
      setIsShowModal(false);
      // upLoad hình ảnh lên sever
      const formData = new FormData();
      formData.append('image', {
        uri: data.assets[0].uri,
        type: data.assets[0].type,
        name: data.assets[0].fileName,
      });
      const result = await uploadImage(formData);
      console.log('result EditProfile ', result);
      setavatar(result.path);
    }
  }, []);

  const openCamera = useCallback(async () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    await launchCamera(options, onTakePhoto);
  }, []);
  const openGallery = useCallback(async () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    await launchImageLibrary(options, onTakePhoto);
  }, []);

  const onUpdateProfile = async () => {
    try {
      const response = await updateProfile(
        name,
        email,
        address,
        phone,
        birthday,
        avatar,
      );
      setUser(response.data);
      console.log('onUpdateProfile response: ', response);
      Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
    } catch (error) {
      console.log('onUpdateProfile error: ', error);
    }
  };
  useEffect(() => {
    if (!oneSave) {
      onUpdateProfile();
    }
  }, [oneSave]);
  const goback = () => {
    navigation.goBack();
  };
  return (
    <ScrollView
      KeyboardAvoidingView={true}
      showsVerticalScrollIndicator={false}
      style={styles.body}>
      <View style={styles.toolContainer}>
        <TouchableOpacity onPress={goback}>
          <Image source={require('../../../media/close.png')} />
        </TouchableOpacity>
        <Text style={styles.textProfile}>Profile</Text>
        <Image source={require('../../../media/close.png')} />
      </View>
      <View style={styles.editProfile}>
        {!image ? (
          <TouchableOpacity
            style={styles.launchCameraButton}
            onPress={() => setIsShowModal(true)}>
            <Image
              onChangeText={text => setavatar(text)}
              style={styles.imgProfile}
              source={require('../../../media/human.png')}
            />
          </TouchableOpacity>
        ) : (
          <Image source={{uri: image}} style={{width: '100%', height: 300}} />
        )}
      </View>
      <View>
        <Text style={styles.textProfile}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={text => setname(text)}
          style={styles.textinputContent}
          placeholder="wilsonfranci"></TextInput>
      </View>
      <View>
        <Text style={styles.textProfile}>Email</Text>
        <TextInput
          onChangeText={text => setemail(text)}
          value={email}
          style={styles.textinputContent}
          placeholder="example@youremail.com"></TextInput>
      </View>
      <View>
        <Text style={styles.textProfile}>Address*</Text>
        <TextInput
          value={address}
          onChangeText={text => setaddress(text)}
          style={styles.textinputContent}
          placeholder="example@youremail.com"></TextInput>
      </View>
      <View>
        <Text style={styles.textProfile}>Phone Number*</Text>
        <TextInput
          value={phone}
          onChangeText={text => setphone(text)}
          style={styles.textinputContent}
          placeholder="+62-8421-4512-2531"></TextInput>
      </View>
      <View>
        <Text style={styles.textProfile}>Birthday</Text>
        <TextInput
          value={birthday}
          onChangeText={text => setbirthday(text)}
          style={styles.textinputContent}
          placeholder="11/8/2003 "></TextInput>
      </View>
      <TouchableOpacity
        style={styles.buttonCofirm}
        onPress={() => setOneSave(!oneSave)}>
        <Text>Confirm</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowModal}
        onRequestClose={() => {
          setIsShowModal(!isShowModal);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text onPress={openCamera}>Open Camera</Text>
            <Text onPress={openGallery}>Open Gallery</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  body: {
    widthL: '100%',
    margin: 24,
  },
  toolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textProfile: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  imgProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 16,
  },
  textinputContent: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    color: '#050505',
  },
  buttonCofirm: {
    backgroundColor: '#1877F2',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  editProfile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  modalContent: {
    width: '100%',
    height: 200,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
