import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Latest from './hompage/Latest';
import {getNews, getMyNews} from '../NewsService';
import {UserContext} from '../../users/UserContext';
const Profile = props => {
  const [news, setnews] = useState([]);
  const [loading, setLoading] = useState(false);
  const {navigation} = props;

  const {user} = useContext(UserContext);
  const getMyNewsData = async () => {
    setLoading(true);
    const data = await getMyNews();
    console.log('Home: getMyNewsData', data);
    setnews(data.data);
    setLoading(false);
  };
  const renderItem = ({item}) => {
    console.log(item.image);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailScreen', {id: item._id});
        }}>
        <Latest
          navigation={props.navigation}
          title={item.title}
          img_url1={item.image}
          time={item.createdAt}
          name={item.name}
          img_url={item.avatar}
          genre={item.genre}
          _id={item._id}
        />
      </TouchableOpacity>
    );
  };

  //  dùng dể gọi API chạy 1 lần duy nhất khi khởi tạo
  useEffect(() => {
    try {
      getMyNewsData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.toolContainer}>
        <Text style={styles.textProfile}>Profile</Text>
        <Image source={require('../../../media/add.png')} />
      </View>
      <View style={styles.followContainer}>
        <Image
          style={{paddingLeft: 30, width: 100, height: 100, borderRadius: 50}}
          source={{uri: user?.avatar}}
        />
        <View style={{marginTop: 16}}>
          <Text style={styles.textFollower}>2156</Text>
          <Text>Follower</Text>
        </View>
        <View style={{marginTop: 16}}>
          <Text style={styles.textFollower}>2156</Text>
          <Text>Following</Text>
        </View>
        <View style={{marginTop: 16}}>
          <Text style={styles.textFollower}>2156</Text>
          <Text>News</Text>
        </View>
      </View>
      <Text style={styles.textFollower}>{user?.name}</Text>
      <Text style={styles.textcontent}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          style={styles.buttonEdit}>
          <Text style={styles.editProfileLabel}>EditProfile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEdit}
        onPress={() => {
          navigation.navigate('Logout');
        }}>
          <Text style={styles.editProfileLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textNews}>News</Text>
        <Text style={styles.textRecent}>Recent</Text>
      </View>
      <View style={styles.listLatest}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={news}
          keyExtractor={item => item._id}
          refreshing={loading}
          onRefresh={getMyNewsData}
          renderItem={renderItem}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={styles.floatingButton}>
        <Image
          source={require('../../../media/add.png')}
          style={styles.floatingButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  editProfileLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#FFFFFF',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonIcon: {
    width: 24,
    height: 24,
  },
  listLatest: {
    position: 'relative',
    backgroundColor: '#F5F6FA',
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    position: 'relative',
    widthL: '100%',
    height: '100%',
    margin: 24,
  },
  toolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textProfile: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: '45%',
  },
  textFollower: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
    marginLeft: 7,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textcontent: {
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
    marginLeft: 7,
  },
  buttonEdit: {
    margin: 10,
    width: 182,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    margin: 24,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textNews: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#4E4B66',
    marginRight: 10,
  },
  textRecent: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#4E4B66',
    marginLeft: 10,
  },
  imgAdd: {
    position: 'absolute',

    bottom: 25,
    right: 0,
  },
  listLatest: {
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
});
