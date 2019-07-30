import React, { Component } from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import SingleItem from './singleItem.component';
import Character from '../interfaces/character.interface';
import Search from './search.component';

const remoteUrl = 'https://rickandmortyapi.com/api/character/';

interface State{
  data: any[],
  error: string,
  loading: boolean,
  page: number,
  moreLoading: boolean,
  searchName: string,
  count: number
}

export default class CharacterList extends Component<Character, State> {

  constructor(props: Character){
    super(props);

    this.state = {
      data: [],
      error: null,
      loading: true,
      page:1,
      moreLoading: false,
      searchName:'',
      count:0
    }
  }

  componentDidMount(){
    this.getRemoteDataHandler();
    this.searchCharacterHandler = this.searchCharacterHandler.bind(this);
  }

  //Get Characters from API
  getRemoteDataHandler = () => {
    fetch(remoteUrl).then(res => res.json()
    .then(res => {
      this.setState({
        data: [...this.state.data, ...res.results],
        error: res.error,
        loading: false,
        page: this.state.page + 1,
        count: res.info.count
      });
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: error
      });
    }));
  }

  //Load More Charachters
  loadMoreCharacters = () => {
    this.setState({loading: false, moreLoading: true}, () => {
      fetch(remoteUrl + '?name=' + this.state.searchName + '&' +'page=' + this.state.page).then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          data: [...this.state.data, ...res.results],
          page: this.state.page + 1,
          error: res.error,
          moreLoading: false,
          count: res.info.count
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error
        });
      });
    });
  };

  onChangedHandler = (name) => {
    this.setState({
      searchName: name
    });
  };

  //Search Character
  searchCharacterHandler = () => {
    this.setState({ loading: true, data: [] }, () => {
      fetch(remoteUrl + '?name=' + this.state.searchName).then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          data: [...this.state.data, ...res.results],
          error: res.error,
          moreLoading: false,
          count: res.info.count
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error
        });
      })
    })
  }

  render(){
    if(this.state.loading)
      return <View style={styles.listContainer}>
              <ActivityIndicator color="#159588" size="large" style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} />
             </View>

    return(
      <View style={styles.listContainer}>
        <Search
          filter={this.searchCharacterHandler}
          changed={this.onChangedHandler}
          inputValue={this.state.searchName}
          hint="Enter name to search"
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data = {this.state.data}
          renderItem = {({item}) => (
            <SingleItem
              img={item.image}
              name={item.name}
              status={item.status}
            />
          )}
          keyExtractor = {(item, index) => 'key'+index}

          ListFooterComponent={
            <View style={this.state.count <= 20? styles.hideLoadButton : styles.listFooter}>
              <TouchableOpacity
                style={styles.loadMoreButton}
                activeOpacity={0.9}
                onPress= {this.loadMoreCharacters}>
                <Text style={styles.loadMoreButtonText}>Load More</Text>{this.state.moreLoading ? <ActivityIndicator color="#ffffff" style={{marginLeft: 10}} /> : null}
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    height: '100%',
    paddingBottom: 15
  },
  listFooter: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  loadMoreButton: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#159588',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  },
  loadMoreButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold'
  },
  hideLoadButton: {
    display: 'none'
  }
});
