import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import res from '../../Helper/index'

// ...
export default class WebViewComponent extends Component {

  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      title: this.props.route.params.title
    })

  }

  _onNavigationStateChange(webViewState){
    if (webViewState.url === 'https://2d.com.kw/CollectionAllProducts')
    {
      // this.props.navigation.navigate('Home')
      this.props.navigation.navigate(
        res.strings.Home, 
        {screen: 'Home'}
    )
    }
  }

  render() {
    return <WebView source={{ uri: this.props.route.params.url}} onNavigationStateChange={this._onNavigationStateChange.bind(this)}/>
  }
}