/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//https://reactnavigation.org/docs/tab-based-navigation/

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageAssets from './src/Helper/ImageAssets';
import AppLoader, { loaderRef } from './src/Helper/ApiHelper/AppLoader';
import NavClass from './src/Helper/Navigation/NavClass'
import TabBarControl from './src/Helper/Navigation/TabBarController'
import Modal from 'react-native-modal';
import SplashScreen from 'react-native-splash-screen';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      
    
    <StatusBar
            translucent={true}
            backgroundColor="rgba(0, 0, 0, 0.1)"
            // background={R.color.grey300}
            barStyle={
              Platform &&
              Platform.select({
                android: 'light-content',
                ios: 'light-content',
              })
            }
          />
          <View >
          {Platform.OS==='ios' ? null : <AppLoader ref={loaderRef} />}
          
          </View>
       
        <NavClass />
        
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
