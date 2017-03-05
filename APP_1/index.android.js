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
  Platform,
  TouchableHighlight
} from 'react-native';

import RNFS from 'react-native-fs';

export default class APP_1 extends Component {
/*
  async fetchDataFromApi(){
    try {
      let response = await fetch('https://www.vegvesen.no/nvdb/api/v2/vegobjekter/67?kommune=1421&segmentering=false&inkluder=lokasjon');
      let responseJson = await response.json();
      let data = JSON.stringify(responseJson);
      console.log("yey data");
      return data;
    } catch(error) {
      console.error(error);
    }
  }*/

  async writeToFile(){
    try {
      let mainpath = RNFS.MainBundlePath;
      if (Platform.OS == 'android'){
        mainpath = RNFS.DocumentDirectoryPath;
      }
      let path = mainpath + '/data.json';
      let response = await fetch('https://www.vegvesen.no/nvdb/api/v2/vegobjekter/67?kommune=1421&segmentering=false&inkluder=lokasjon');
      let responseJson = await response.json();
      let data = JSON.stringify(responseJson);
      console.log("yey data");
      RNFS.writeFile(path, data, 'utf8')
        .then((success) => {
          console.log('File written');
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch(error) {
      console.error(error);
    }

  }

  slett(){
    var path = RNFS.DocumentDirectoryPath + '/data.json';

    return RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
  }

  read(){

    var path = RNFS.DocumentDirectoryPath + '/data.json';

    RNFS.readFile(path, 'utf8').then((contents) => {
    // log the file contents
    console.log(contents);
  })

  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight underlayColor='gray' justifyContent='center' alignItems='center' onPress={this.writeToFile}>
	        <Text>STEP1</Text>
	    </TouchableHighlight>
      <TouchableHighlight underlayColor='gray' justifyContent='center' alignItems='center' onPress={this.slett}>
	        <Text>DELETE</Text>
	    </TouchableHighlight>
      <TouchableHighlight underlayColor='gray' justifyContent='center' alignItems='center' onPress={this.read}>
          <Text>READ</Text>
      </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('APP_1', () => APP_1);
