/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// require progress things
var NetworkImage = require('react-native-image-progress')
var Progress = require('react-native-progress')
// require the randomn number generator
var RandManager = require('./RandManager.js')
// require the swiper for the swipes
var Swiper = require('react-native-swiper')

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ActivityIndicatorIOS,
  Dimensions
} from 'react-native';


const NUM_WALLPAPERS = 5;

// get height & width
var {width,height} = Dimensions.get('window')

class SplashWalls extends Component {
  constructor(props) {
    super(props);
    StatusBar.setHidden(true, 'slide')

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
        <Swiper
          dot={
            <View style={styles.dot} />
          }
          activedot={
            <View style={styles.activeDot} />
          }
          loop={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}>
          {wallsJSON.map((wallpaper, index) => {
            return (
              <View key={index}>
                <NetworkImage
                  source={{
                    uri: `https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
                  style={styles.wallpaperImage}>
                </NetworkImage>
              </View>
            )
          })}
        </Swiper>
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
  activeDot: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  dot: {
    backgroundColor:'rgba(255,255,255,.4)',
    width: 8,
    height: 8,
    borderRadius: 10,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  wallpaperImage: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#000'
  }

});



AppRegistry.registerComponent('SplashWalls', () => SplashWalls);
