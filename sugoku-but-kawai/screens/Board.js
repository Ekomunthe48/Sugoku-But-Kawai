import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, VirtualizedList, TextInput, Button, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { boardFetch, sugokuValidate, sugokuSolve } from '../store/actions/boardActions'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CountDown from 'react-native-countdown-component';

export default function Board({navigation, route}) {
    const { boards } = useSelector((state) => state.board)
    const { sugokuDone, validateBoards } = useSelector((state) => state.validate)
    const dispatch = useDispatch()

    const [boardSudoku, setBoardSudoku] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
      console.log(route.params.diff);
        dispatch(boardFetch(route.params.diff))
      }, [dispatch])

    useEffect(() => {
      setBoardSudoku(boards?.board)
      setStatus(validateBoards?.status)
    }, [boards, validateBoards])

    function handleChange (val, idxRow, idxCol) {
      if (isNaN(Number(val))) {
        val = ''
      }
      let newBoard = JSON.parse(JSON.stringify(boardSudoku))
      newBoard[idxRow][idxCol] = +val
      setBoardSudoku(newBoard)
    }

    const handleValidate = () => {
      dispatch(sugokuValidate(boardSudoku))
      if (status === 'unsolved') {
        alert('This game not solved yet !!!')
      } else if (status === 'broken') {
        alert('You Broken The game !!!')
      } else {
        navigation.navigate('Finish', {
          name: route.params.name
        })
      }
    }

    const handleSolve = () => {
      dispatch(sugokuSolve(boardSudoku))
      setBoardSudoku(sugokuDone?.solution)
      console.log(sugokuDone);
    }

    const failedTime = () => {
      alert(`Time's Up`)
      navigation.navigate('Home')
    }

    return (
      <SafeAreaProvider style={styles.container}>
        <Text style={styles.text}>Hello {route.params.name}</Text>
        <CountDown
          until={1200}
          onFinish = {failedTime}
          size={20}
        />
        {
          boardSudoku?.map((row, idxRow) => {
            return (
              <SafeAreaView key={idxRow + 1} style={styles.play}>
                {
                  row.map((col, idxCol) => {
                        return (
                          <TextInput
                            value={(col !== 0) ? String(col) : ''}
                            key={idxCol}
                            onChangeText={val => handleChange(val, idxRow, idxCol)}
                            editable={(boards?.board[idxRow][idxCol] !== 0) ? false : true}
                            maxLength={1}
                            keyboardType='number-pad'
                            style={(boards?.board[idxRow][idxCol] !== 0) ? styles.textDefault : styles.board}
                          />
                        )
                    })
                }
              </SafeAreaView>
            )
          })
        }
        <View style={styles.buttonPack}>
          <Button
            title="Submit"
            onPress={handleValidate}
          />
          <Button
            title="solve"
            onPress={handleSolve}
          />
        </View>
      </SafeAreaProvider>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFC8C8',
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    play: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row'
    },
    board: {
      borderWidth: 4,
      borderStyle: 'solid',
      alignItems: 'center',
      borderColor: '#ee5dae',
      textAlign: 'center',
      margin: 5,
      borderRadius: 3,
      color: '#ffffff',
      fontSize: 20
    },
    text: {
      color: '#F0F0FF',
      fontSize: 35,
      textAlign: 'center'
    },
    textDefault: {
      color: '#616283',
      borderWidth: 4,
      borderStyle: 'solid',
      alignItems: 'center',
      borderColor: '#ee5dae',
      textAlign: 'center',
      margin: 5,
      borderRadius: 3,
      fontSize: 20
    },
    buttonPack: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      margin: 5
    }
  });
