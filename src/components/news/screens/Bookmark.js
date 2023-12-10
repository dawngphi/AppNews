import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Latest from './hompage/Latest';
import {getNews} from '../NewsService';
import AxiosInstance from '../../helpers/AxiosInstance';

const Bookmark = props => {
  const {navigation} = props;
  const [search, setsearch] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const getNewsData = async () => {
    setLoading(true);
    const data = await getNews();
    setNews(data);
    // console.log('data', data);
    setLoading(false);
  };

  useEffect(() => {
    getNewsData();
    console;
  }, []);


  let timeOut = null;
  const coungDownSearch = (search) => {
    if(timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      searchNews(search);
    }, 2000);
  }
  const searchNews = async (search) => {
    setLoading(true);
    const response = await AxiosInstance().get("/articles/search?title="+search);
    if (response.error == false) {
      setNews(response.data);
      setLoading(false);
    } else {
      Alert.alert('Error');
    }
  };
  return (
    <View style={styles.body}>
      <Text style={styles.titleContaier}>Bookmark</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchText}
          placeholder="Search"
          onChangeText={(text) => coungDownSearch(text)}
        />
        <TouchableOpacity onPress={searchNews} style={styles.searchIcon}>
          <Image source={require('../../../media/search_icon.png')} />
        </TouchableOpacity>

        <Image
          style={styles.searchIcon2}
          source={require('../../../media/search2_icon.png')}
        />
      </View>
      <View style={styles.listLatest}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={news}
          renderItem={({item}) => (
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
          )}
          keyExtractor={item => item._id}
          refreshing={loading}
          onRefresh={getNewsData}
        />
      </View>
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  listLatest: {
    marginTop: 24,
    width: 350,
    height: '100%',
  },
  searchContainer: {
    marginTop: 24,
    position: 'relative',
  },
  searchIcon2: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
  },
  searchText: {
    borderWidth: 1,
    borderColor: '#4E4B66',
    borderRadius: 6,
    height: 48,
    paddingLeft: 44,
    backgroundColor: '#FFFFFF',
  },
  titleContaier: {
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: 0.12,
    color: '#000000',
  },
  body: {
    padding: 24,
    width: '100%',
    height: '100%',
  },
});
