import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

export default function Finish({navigation, route}) {
  const { validateBoards } = useSelector((state) => state.validate)

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Congrats {route.params.name}</Text>
        <Text style={styles.subText}>You {validateBoards?.status} this game</Text>
        <Button
          title='Play Again'
          onPress={() => navigation.navigate('Home')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC8C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    color: '#616283',
    fontSize: 15,
    textAlign: 'center'
  },
  text: {
    color: '#F0F0FF',
    fontSize: 35,
    textAlign: 'center'
  }
});
