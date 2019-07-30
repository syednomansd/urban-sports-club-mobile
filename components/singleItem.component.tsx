import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Character from '../interfaces/character.interface';

export default function SingleItem(props: Character){
  return(
    <View style={styles.rowContainer}>
      <View style={styles.thumbnail}>
        <Image style={styles.thumbImage} source={{uri: props.img}} />
      </View>
      <View style={styles.charachterInfo}>
        <Text>{props.name}</Text>
        <Text>{props.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20
    },
    thumbnail: {
        marginRight: 20
    },
    thumbImage: {
      width: 50,
      height: 50,
      borderRadius: 20
    },
    charachterInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20
    }
  });
