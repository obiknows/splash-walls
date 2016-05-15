/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';

class SplashWalls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallsJSON: [],
      isLoading: true
    }
  }

  fetchWallsJSON() {
    var url = 'http://unsplash.it/list'
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        console.log(jsonData)
        this.setState({isLoading:false})
      })
      .catch( error => console.log('Fetch error: ' + error))
  }

  // post rendering method
  componentDidMount() {
    // fetch JSON once rendered
    this.fetchWallsJSON()
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          animating={true}
          color={'#fff'}
          size={'small'}
          style={{margin: 15}} />

          <Text style={{color: '#fff'}}>Contacting Unsplash</Text>
      </View>
    )
  }

  renderResults() {
    return (
      <Text>
        Data loaded.
      </Text>
    )
  }

  render() {
    var {isLoading} = this.state
    if (isLoading)
      return this.renderLoadingMessage()
    else
      return this.renderResults()
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

AppRegistry.registerComponent('SplashWalls', () => SplashWalls);
