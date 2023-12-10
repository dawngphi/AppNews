import {View, Text, StyleSheet, Image, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getNews} from '../NewsService';
// import MyTabs from '../BottomNavigation'
import Trending from './hompage/Trending';
import Latest from './hompage/Latest';
const Homepage = props => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const {navigation} = props;

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

  return (
    <View style={myStyle.body}>
      <View style={myStyle.header}>
        <Image source={require('../../../media/kabar.png')} />
        <View style={myStyle.notifi_icon}>
          <Image source={require('../../../media/notifi_icon.png')} />
        </View>
      </View>
      <View style={myStyle.searchContainer}>
        <TextInput style={myStyle.searchText} placeholder="Search" />
        <Image
          style={myStyle.searchIcon}
          source={require('../../../media/search_icon.png')}
        />
        <Image
          style={myStyle.searchIcon2}
          source={require('../../../media/search2_icon.png')}
        />
      </View>
      <View style={myStyle.trendingContainer}>
        <View style={myStyle.headerForTrending}>
          <Text style={myStyle.fontTrending}>Trending</Text>
          <Text style={myStyle.fontSeeall}>See all</Text>
        </View>
        <Trending
          title="Russian warship: Moskva sinks in Black Sea"
          thumb={require('../../../media/trending1.png')}
          time="4h ago"
          author="BBC News"
          avatar={require('../../../media/logoBBC.png')}
          country="Europe"
        />
      </View>

      <View style={myStyle.latestContainer}>
        <View style={myStyle.headerForTrending}>
          <Text style={myStyle.fontTrending}>Latest</Text>
          <Text style={myStyle.fontSeeall}>See all</Text>
        </View>
        <View style={myStyle.tabLatest}>
          <Text style={myStyle.itemTabLatest}>All</Text>
          <Text style={myStyle.itemTabLatest}>Sports</Text>
          <Text style={myStyle.itemTabLatest}>Politics</Text>
          <Text style={myStyle.itemTabLatest}>Bussiness</Text>
          <Text style={myStyle.itemTabLatest}>Health</Text>
          <Text style={myStyle.itemTabLatest}>Travel</Text>
        </View>
        <View style={myStyle.listLatest}>
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
    </View>
  );
};

export default Homepage;

//css
const myStyle = StyleSheet.create({
  //latest

  listLatest: {
    width: 350,
    height: 300,
  },

  itemTabLatest: {
    fontFamily: 'Arial',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
    marginBottom: 16,
    // backgroundColor:'red'
  },

  tabLatest: {
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 2,
  },

  latestContainer: {},

  fontSeeall: {
    fontFamily: 'Arial',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },

  fontTrending: {
    fontFamily: 'Arial',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },

  headerForTrending: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'red'
  },
  trendingContainer: {
    marginTop: 16,
    marginBottom: 5,
    // backgroundColor:'green',
  },
  searchContainer: {
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

  notifi_icon: {
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    // backgroundColor:'red'
  },
  body: {
    padding: 24,
    // backgroundColor:'red',
    width: '100%',
    height: '100%',
  },
});
