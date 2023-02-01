import React, { Component, Fragment } from 'react';
import { View, Text, Button, StyleSheet, SectionList, FlatList, Image, StatusBar, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import res from '../../Helper/index';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import { PageControlAji } from 'react-native-chi-page-control';
import RNPickerSelect from 'react-native-picker-select';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import { globalVariables } from '../../Helper/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import { Pages } from 'react-native-pages';

const widthScreen = Dimensions.get('window').width;


export default class FullImage extends React.Component {

    render() {
      return (

        <SafeAreaView>

        <View style={{width:'100%',height:'100%'}}>
        <TouchableOpacity style={[styles.closeButtonStyle, { marginLeft: 20, marginTop: Platform.OS === 'android' ? 40 : 20 }]} onPress={() => { this.props.navigation.goBack() }}>
              <Image
                style={{ justifyContent: 'center', alignSelf: 'center' }}
                source={res.ImageAssets.cancelWhiteBg}
              />
            </TouchableOpacity>
        
        {globalVariables.keyAppLanguageGlobal==='en' ? <Pages indicatorColor={res.color.blackColor} height={250}  horizontal={true}>
        {this.props.route.params.productImg.map((obj, index) => {
            return (
              <View  style = {{width:'100%',height:'100%'}}>
                <Image
                  style = {{width:'100%',height:'100%',resizeMode:'contain'}}
                  source={{
                    uri: `${res.api.baseUrlProductImage}${obj}`,
                  }}
                />
              </View>
            );
        })} 
        </Pages> :  <Pages indicatorColor={res.color.blackColor} height={250} rtl={false} horizontal={true}>
        {this.props.route.params.productImg.map((obj, index) => {
            return (
              <View  style = {{width:'100%',height:'100%'}}>
                <Image
                  style = {{width:'100%',height:'100%',resizeMode:'contain'}}
                  source={{
                    uri: `${res.api.baseUrlProductImage}${obj}`,
                  }}
                />
              </View>
            );
        })} 
        
        </Pages> }
        
        
        </View>
                </SafeAreaView>
       
      )
    }

}

const styles = StyleSheet.create({
  
    closeButtonStyle: {width: 40, height: 40,  justifyContent: 'center' },
  });

