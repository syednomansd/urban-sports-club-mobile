import React, { Component } from 'react';
import { View } from 'react-native';
import CharacterList from './components/list.component';
import Character from './interfaces/character.interface';

export default class App extends Component<Character, any> {
  render(){
    return (
      <View>
        <CharacterList {...this.props}/>
      </View>
    );
  }
}
