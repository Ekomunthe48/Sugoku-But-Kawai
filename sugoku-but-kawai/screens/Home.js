import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Picker } from 'react-native';
import { TextInput } from 'react-native';

export default function Home({navigation}) {
  const [username, setUsername] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const handleNotif = () => {
    if(!username || !setDifficulty) {
      alert('Please input Your name / select your difficulty')
    } else {
      navigation.navigate('Game', {
          name: username,
          diff: difficulty
      })
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>WELCOME TO SUGOKU</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUsername(text)}
          value={username}
        />
         <Picker
          selectedValue={difficulty}
          style={styles.diff}
          onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
        >
          <Picker.Item label="Choose Level...." value=""/>
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Normal" value="medium" />
          <Picker.Item label="Hard" value="hard" />
          <Picker.Item label="Random" value="random" />
        </Picker>
        <Button
          title='Play Game'
          onPress={handleNotif}
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
  text: {
    color: '#F0F0FF',
    fontSize: 35,
    textAlign: 'center'
  },
  textInput: {
    margin: 10,
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#374a67',
    color: '#ee5dae',
    textAlign: 'center'
  },
  diff: {
    height: 50,
    width: 150,
    color: '#ee5dae',
  }
});
