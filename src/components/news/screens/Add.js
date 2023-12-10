import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadImage, addNews} from '../NewsService';

const Add = props => {
  const {navigation} = props;
  const [image, setImage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [imgPath, setimgPath] = useState(null);

  const [title, settitle] = useState(null);
  const [content, setcontent] = useState(null);

  const goback = () => {
    navigation.goBack();
}
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
      console.log('result', result);
      setimgPath(result.path);
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

  const onSave = useCallback(async () => {
    const data = {
      title: title,
      content: content,
      image: imgPath,
    };
    const result = await addNews(data);
    console.log('result', result);
    Alert.alert('Thông báo', 'Thêm thành công');
    setcontent(null);
    settitle(null);
    setImage(null);
    setimgPath(null);
    // navigation.navigate('Home');
  }, [title, content, imgPath]);

  const openGallery = useCallback(async () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    await launchImageLibrary(options, onTakePhoto);
  }, []);

  return (
    <ScrollView KeyboardAvoidingView={true} style={styles.container}>
      <View style={styles.toolContainer}>
        <TouchableOpacity onPress={goback}>
        <Image source={require('../../../media/close.png')} />
        </TouchableOpacity>
        <Text style={styles.textProfile}>Create News</Text>
        <Image source={require('../../../media/close.png')} />
      </View>
      {!image ? (
        <TouchableOpacity
          style={styles.launchCameraButton}
          onPress={() => setIsShowModal(true)}>
          <Text>+</Text>
          <Text>Add cover Photo</Text>
        </TouchableOpacity>
      ) : (
        <Image source={{uri: image}} style={{width: '100%', height: 300}} />
      )}
      <TextInput
        style={styles.inputTitle}
        onChangeText={settitle}
        value={title}
        placeholder="New Title"
      />
      <TextInput
        style={styles.inputContent}
        onChangeText={setcontent}
        value={content}
        placeholder="Add New/Article"
        multiline={true}
        numberOfLines={10}
      />

      <Pressable style={styles.buttonSaveContent} onPress={onSave}>
        <Text>Save</Text>
      </Pressable>
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

export default Add;

const styles = StyleSheet.create({
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
  modalContent: {
    width: '100%',
    height: 200,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
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
  launchCameraButton: {
    width: '100%',
    height: 183,
    backgroundColor: '#EEF1F4',
    borderRadius: 20,
    padding: 20,
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  buttonSaveContent: {
    width: '100%',
    height: 50,
    marginBottom: 30,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 10,
    letterSpacing: 0.12,
    textDecorationLine: 'underline',
  },
  inputContent: {},
});
