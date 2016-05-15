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

// require the randomn number generator
var RandManager = require('./RandManager.js');

const NUM_WALLPAPERS = 5;

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
        var randomIds = RandManager.uniqueRandomNumbers(
          NUM_WALLPAPERS, 0, jsonData.length)
        var walls = []
        randomIds.forEach(randomId => {
          walls.push(jsonData[randomId])
        })
        this.setState({
          isLoading:false,
          wallsJSON: [].concat(walls)
        })
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
    var {wallsJSON,isLoading} = this.state
    if (!isLoading){
      return (
        <View>
          {wallsJSON.map((wallpaper, index) => {
            return (
              <Text key={index}>
                {wallpaper.author}
              </Text>
            )
          })}
        </View>
      )
    }
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
