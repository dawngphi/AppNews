import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

const Explore = (props) => {
  const {navigation} = props;
  return (
    <View>
      <Text>Explore</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Home', {screen: 'DetailScreen'})}
      />
    </View>
  )
}

export default Explore

const styles = StyleSheet.create({})