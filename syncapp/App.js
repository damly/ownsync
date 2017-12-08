/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import LoginView from './src/Login'
import MainView from './src/Main'
import PhotoView from './src/Photo'
import TestView from  './src/TestView'

import {StackNavigator} from 'react-navigation';

const Navigator = StackNavigator(
    {
        LoginView: {screen: LoginView},
        MainView: {screen: MainView},
        PhotoView: {screen: PhotoView},
    },
    {
        // transitionConfig: () => ({
        //     screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        //         transitionSpec: {
        //         duration: 250,
        //             easing: Easing.bounce,
        //             timing: Animated.timing,
        //     },
        // }),
        navigationOptions: {
            header: null,
        },
        cardStyle: {
            backgroundColor: 'transparent'
        }
    }
);


export default class App extends Component<{}> {
  render() {
    return (
        <Navigator style={{backgroundColor: 'red'}}/>
    );
  }
}