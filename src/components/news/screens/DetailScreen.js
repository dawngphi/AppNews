import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {getNewsDetail} from '../NewsService';

const DetailScreen = props => {
  const {navigation, route} = props;
  const {id} = route?.params;
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const getNewsDetailData = async () => {
    if (!id) return;
    setLoading(true);
    console.log('id', id);
    const data = await getNewsDetail(id);
    console.log('data', data);
    setNewsDetail(data[0]);
    setLoading(false);
  };
  useEffect(() => {
    getNewsDetailData();
    return () => {};
  }, []);
  const goback = () => {
    navigation.goBack();
  };
  if (!newsDetail) return <Text>Loading...</Text>;
  return (
    <View style={detailStyles.body}>
      <View style={detailStyles.toolbar}>
        <TouchableOpacity onPress={goback}>
          <Image
            style={detailStyles.backIcon}
            source={require('../../../media/back.png')}></Image>
        </TouchableOpacity>
        <View style={detailStyles.shareContainer}>
          <Image
            style={detailStyles.shareIcon}
            source={require('../../../media/share.png')}></Image>
          <Image
            style={detailStyles.backIcon}
            source={require('../../../media/bacham.png')}></Image>
        </View>
      </View>
      <View style={detailStyles.followContainer}>
        <View style={detailStyles.followTitleContainer}>
          <Image
            style={detailStyles.bbcnewIcon}
            source={require('../../../media/bbcnew.png')}></Image>
          <View style={detailStyles.followTitle}>
            <Text style={detailStyles.followTitleBBC}>BBC News</Text>
            <Text style={detailStyles.followTitleTime}>
              {newsDetail.createdAt}
            </Text>
          </View>
        </View>
        <Pressable style={detailStyles.buttonFollowing}>
          <Text style={detailStyles.buttonFollowingLabel}>Following</Text>
        </Pressable>
      </View>
      <Image style={detailStyles.imgDetail} source={{uri:newsDetail.image}}></Image>
      <View style={detailStyles.titleContainer}>
        <Text style={detailStyles.titleEurope}>Europe</Text>
        <Text style={detailStyles.titleUkraine}>{newsDetail.title}</Text>
      </View>
      <Text style={detailStyles.content}>{newsDetail.content}</Text>
      <View style={detailStyles.bottomContainer}>
        <View style={detailStyles.likeContainer}>
          <View style={detailStyles.like}>
            <Image
              style={detailStyles.backIcon}
              source={require('../../../media/like.png')}></Image>
            <Text style={detailStyles.likeNumber}>24.5k</Text>
          </View>
          <View style={detailStyles.like}>
            <Image
              style={detailStyles.backIcon}
              source={require('../../../media/comment.png')}></Image>
            <Text style={detailStyles.likeNumber}>1k</Text>
          </View>
        </View>
        <View style={detailStyles.like}>
          <Image
            style={detailStyles.backIcon}
            source={require('../../../media/storage.png')}></Image>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const detailStyles = StyleSheet.create({
  content: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  likeNumber: {
    marginLeft: 5,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#050505',
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  titleUkraine: {
    fontWeight: '400',
    lineHeight: 36,
    fontSize: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },
  titleEurope: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  imgDetail: {
    height: 200,
    marginTop: 20,
  },
  buttonFollowingLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#FFFFFF',
  },
  buttonFollowing: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 24,
    height: 34,
    backgroundColor: '#1877F2',
    borderRadius: 6,
  },
  followTitleTime: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  followTitleBBC: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
  },
  followTitle: {
    marginLeft: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  followTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bbcnewIcon: {},
  followContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    padding: 24,
    backgroundColor: 'while',
    width: '100%',
    height: '100%',
  },
});
