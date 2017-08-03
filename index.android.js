/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ListScreen from './app/screens/ListScreen';
import PhotoScreen from './app/screens/PhotoScreen';

const Photo = StackNavigator({
  List: { screen: ListScreen },
  Photo: { screen: PhotoScreen }
});

AppRegistry.registerComponent('photo', () => Photo);
