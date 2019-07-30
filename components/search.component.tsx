import React from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import SearchIcon from '../assets/ic_search.png';

export default function SearchCharacter(props: any){
  return(
    <View style={styles.searchContainer}>
      <TextInput
        placeholder={props.hint}
        value={props.inputValue}
        onChangeText={props.changed}
        style={styles.searchField}
      />
      <TouchableOpacity style={styles.searchIconWrap} onPress={props.filter}>
        <Image source={SearchIcon} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#159588',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative'
    },
    searchField: {
        height: 40,
        borderRadius: 3,
        borderColor: '#dddddd',
        borderWidth: 1,
        color: '#333333',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    searchIconWrap: {
        padding: 12,
        position: 'absolute',
        top: 10,
        right: 20,
    },
    searchIcon: {
        width: 16,
        height: 16,
    }

});
