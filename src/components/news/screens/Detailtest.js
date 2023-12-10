// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import ItemListNews from './ItemListNews';
// import AxiosIntance from './ultil/AxiosIntance';

// const NewDetail = props => {
//   const {route} = props;
//   const {params} = route;
//   const [dataNe, setdataNe] = useState([]);
//   const [title, settitle] = useState('');
//   const [content, setcontent] = useState('');
//   const [image, setimage] = useState('');
//   const [isLoading, setisLoading] = useState(true);

//   useEffect(() => {
//     const getDetail = async () => {
//       const response = await AxiosIntance().get(
//         'articles/' + params.id + '/detail',
//       );
//       console.log(response);
//       if (response.error == false) {
//         settitle(response.data[0].title);
//         setcontent(response.data[0].content);
//         setimage(response.data[0].image);
//         setisLoading(false);
//       }

//       const responseNews = await AxiosIntance().get('articles');
//       // console.log("List: " + response)
//       if (responseNews.error == false) {
//         setdataNe(responseNews.data);
//         setisLoading(false);
//       } else {
//         ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
//       }
//     };

//     getDetail();
//     return () => {};
//   }, []);

//   return (
//     <>
//       {isLoading == true ? (
//         <View style={styles.loading}>
//           <Text>Loading ...</Text>
//           <ActivityIndicator size={'large'} color="#FFF00" />
//         </View>
//       ) : (
//         <View style={styles.container}>
//           <ScrollView style={styles.scrollView}>
//             <View style={styles.header}>
//               <View style={styles.boxLogo}>
//                 <Image
//                   source={require('./Image/LogoBTC.png')}
//                   style={styles.imageLogo}
//                 />
//                 <View style={styles.textLogo}>
//                   <Text style={styles.textLogo_1}>BTC News</Text>
//                   <Text style={styles.textLogo_2}>14m ago</Text>
//                 </View>
//               </View>
//               <Pressable style={styles.pressableFollow}>
//                 <Text style={styles.textFollow}>Following</Text>
//               </Pressable>
//             </View>
//             <Image source={{uri: image}} style={styles.image}></Image>
//             <Text style={styles.textContry}>Europe</Text>
//             <Text style={styles.textTitle}>{title}</Text>
//             <Text style={styles.textcontent}>{content}</Text>
//           </ScrollView>
//           <View style={styles.footer}>
//             <View style={styles.footer_1}>
//               <View style={styles.boxLike}>
//                 <Image
//                   source={require('./Image/Heart.png')}
//                   style={styles.imageLike}
//                 />
//                 <Text style={styles.textLike}>24.5K</Text>
//               </View>
//               <View style={styles.boxComment}>
//                 <Image
//                   source={require('./Image/Comment.png')}
//                   style={styles.imageComment}
//                 />
//                 <Text style={styles.textLike}>1K</Text>
//               </View>
//             </View>
//             <Image
//               source={require('./Image/Bookmark.png')}
//               style={styles.imageBookMark}
//             />
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// export default NewDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     display: 'flex',
//   },
//   boxLogo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   imageLogo: {
//     width: 50,
//     height: 50,
//   },
//   textLogo: {
//     marginStart: 10,
//   },
//   textLogo_1: {
//     fontFamily: 'Poppins',
//     fontStyle: 'normal',
//     fontWeight: '600',
//     fontSize: 16,
//     lineHeight: 24,
//     letterSpacing: 0.12,
//     color: 'black',
//   },
//   textLogo_2: {
//     fontFamily: 'Poppins',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 14,
//     lineHeight: 21,
//     letterSpacing: 0.12,
//     color: '#4E4B66',
//   },
//   pressableFollow: {
//     width: 102,
//     height: 34,
//     backgroundColor: '#1877F2',
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 5,
//     paddingEnd: 11,
//     paddingStart: 12,
//   },
//   textFollow: {
//     fontFamily: 'Poppins',
//     fontStyle: 'normal',
//     fontWeight: '600',
//     fontSize: 16,
//     lineHeight: 24,
//     letterSpacing: 0.12,
//     color: 'white',
//   },
//   scrollView: {
//     marginTop: 24,
//     marginEnd: 24,
//     marginStart: 24,
//   },
//   image: {
//     width: 450,
//     height: 248,
//     marginTop: 16,
//     marginEnd: 24,
//   },
//   textContry: {
//     fontFamily: 'Poppins',
//     fontWeight: '400',
//     fontSize: 14,
//     lineHeight: 21,
//     letterSpacing: 0.12,
//     marginTop: 16,
//   },
//   textTitle: {
//     fontFamily: 'Poppins',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 30,
//     lineHeight: 40,
//     letterSpacing: 0.12,
//     color: 'black',
//   },
//   textcontent: {
//     fontFamily: 'Poppins',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 20,
//     lineHeight: 26,
//     letterSpacing: 0.3,
//     color: '#4E4B66',
//     marginTop: 30,
//   },
//   footer: {
//     height: 78,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   footer_1: {
//     flexDirection: 'row',
//     marginStart: 24,
//   },
//   boxLike: {
//     flexDirection: 'row',
//   },
//   imageLike: {
//     width: 30,
//     height: 27.25,
//   },
//   textLike: {
//     fontFamily: 'Poppins',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#050505',
//     marginStart: 5,
//   },
//   boxComment: {
//     flexDirection: 'row',
//     marginStart: 31,
//   },
//   imageComment: {
//     width: 30,
//     height: 25,
//   },
//   imageBookMark: {
//     width: 23,
//     height: 32,
//     marginEnd: 51,
//   },
// });
