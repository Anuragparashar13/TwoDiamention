import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SectionList,
  FlatList,
  Image,
  StatusBar,
  TextInput,
  ImageBackground,
  Dimensions,
  I18nManager,
  ScrollView,
  BackHandler
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import strings from '../res/Translation/strings';
import {ListItem, Avatar, SearchBar} from 'react-native-elements';
import ImageAssets from '../Helper/ImageAssets';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PageControlAji} from 'react-native-chi-page-control';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalVariables, asyncKeys} from '../Helper/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import res from '../Helper/index';
import ApiHelper from '../Helper/ApiHelper/ApiHelper';
// import PageControl from 'react-native-page-control';
import { Pages } from 'react-native-pages';
import { Platform } from 'react-native';

//https://dev.to/shubhkirtisharma/building-serverless-or-debug-apk-for-react-native-apps-356m
const windowWidth = Dimensions.get('window').width;
const DATA = ['red', 'blue', 'green', 'yellow'];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    // alert(useState(this.props.navigation.state.params.languageSelect));
    // if (props.navigation.params.languageSelect === 'ar') {
    //   I18nManager.forceRTL(true);
    //   RNRestart.Restart();
    // }
    this.state = {
      dataSource: [],
      progress: 0,
      banner: [],
      responseJson: {},
      search: '',
    };

  }

  backButtonHandler = () => {
   
  };
  
 

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    if (globalVariables.keyAppLanguageGlobal === 'ar') {
      globalVariables.CultureId = 2
      strings.setLanguage('ar');
    }
    else
    {
      globalVariables.CultureId = 1
      strings.setLanguage('en');
    }
    // alert(this.props.route.params);
    this.onScroll = this.onScroll.bind(this);
  
    var param = {
      StrQuery:
        `SP_IndexMST 'Get_HomePage_Category_List_Apps','','','','','','2',${globalVariables.CultureId}`,
    };
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          // alert(data.row.length);
          
          this.setState({
            dataSource: data.row,
          });
        }
      },
    );

    var paramBanner = {
      StrQuery: `SP_IndexMST 'GET_BANNER','','','','','','2',${globalVariables.CultureId}`,
    };

    new ApiHelper().serviceCallGet(
      paramBanner,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          this.setState({
            banner: data.row,
          });
        }
      },
    );
  }

  readData = async () => {
    try {
      const userLang = await AsyncStorage.getItem('save_language');
      
      if (userLang !== null) {
        if (globalVariables.keyAppLanguageGlobal === 'ar') {
          globalVariables.CultureId = 2
          I18nManager.forceRTL(true);
          strings.setLanguage('ar');
        } else {
          globalVariables.CultureId = 1
          strings.setLanguage('en');
          I18nManager.forceRTL(false);
          
        }
         RNRestart.Restart();
        
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  RenderTableComponent = ({item}) => {
    return (
      <View
        style={item!=this.state.dataSource[this.state.dataSource.length-1] ? {
          width: '45%',
          flexDirection: 'column',
          margin: 8,
          backgroundColor: res.color.whilteColor,
          borderRadius: 10,
          marginLeft: 10,
          shadowOpacity: 5.0,
          shadowColor: res.color.lightGrayColor,
          height: 180,
          
        } : {
          width: '95%',
          flexDirection: 'column',
          margin: 8,
          backgroundColor: res.color.whilteColor,
          borderRadius: 10,
          marginLeft: 10,
          shadowOpacity: 5.0,
          shadowColor: res.color.lightGrayColor,
          height: 320,
        }}>
        <TouchableOpacity onPress={() => this.onPressCell(item)}>
          <ImageBackground
            source={{
              uri: res.api.baseUrlHomeimage.concat(
                item.Image1.replace(/ /g, '%20'),
              ),
            }}
            resizeMode='contain'
            style={styles.imageThumbnail}>
           <View style={{width:'100%',height:'100%',backgroundColor:'rgba(52, 52, 52, 0.4)',justifyContent:'flex-end'}}>
            <Text
              style={{
                alignSelf: 'center',
                
                marginBottom:10,
                justifyContent: 'flex-end',
                fontFamily:res.font.semiBoldFontpl,
                color: res.color.whilteColor,
                fontSize: 16
              }}>
                
              {item.XName}
            </Text>
            </View>  
          </ImageBackground>
          {/* <Image style={styles.imageThumbnail} source={{ uri: item.src }} /> */}
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = ({item}) => {
    <RenderTableComponent item={item} />;
  };

  renderBannerItem({item}) {
    const img =  res.api.baseUrlHomeBannerimage.concat(
      item.Banner
      )
    return (
      <View
        style={{
          height: 200,
          width: windowWidth,
          backgroundColor: item,
         
        }} >
        <Image
          style = {{width:'100%',height:'100%'}}
          source={{
            uri: img,
          }}
        />
      </View>
    );
  }

  onScroll(e) {
    // Get progress by dividing current FlatList X offset with full FlatList width
    if (globalVariables.keyAppLanguageGlobal == 'en')
    {
    this.setState({
      progress: e.nativeEvent.contentOffset.x / ((this.state.banner.length - 1) * windowWidth),
    });
  }
  else
  {
    this.setState({
      progress: 1-(e.nativeEvent.contentOffset.x / ((this.state.banner.length - 1) * windowWidth)),
    });
  }
  }

  //cell Click
  onPressCell(item) {
    console.log(item)
    var urls = '';
    if (item.XCode === 'AC20000006')
      {
        urls =  `${res.api.baseUrlCommon}${res.api.getNewCollectionAllProduct}`
        this.props.navigation.navigate('ProductList', {
          title: item.XName,
          url: urls,
          filterUrl: `${res.api.baseUrlCommon}${res.api.getNewCollectionFilerType}`,
          filteredProduct: `${res.api.baseUrlCommon}${res.api.Get_NewCollectionAllProducts_Filterwise}`
        });
      } 
    else if (item.XCode === 'AC20000009')
    {
      urls =  `${res.api.baseUrlCommon}${res.api.Get_NewsEvents_List}`
      this.props.navigation.navigate('NewsAndEventList', {
        url: urls
      });
    }
    else if (item.XCode === 'AC20000008')
    {
      urls = `${res.api.baseUrlCommon}${res.api.Get_PromotionsAllProducts_List}`
      console.log('++++++++',urls)
      this.props.navigation.navigate('ProductList', {
        title: item.XName,
        url: urls ,
        filterUrl: `${res.api.baseUrlCommon}${res.api.Get_PromotionsAllProducts_Filter_List}`,
        filteredProduct: `${res.api.baseUrlCommon}${res.api.Get_PromotionsAllProducts_Filterwise}`
      });
    } 
    else if (item.XCode==='AC20000010')
    {
      globalVariables.goToOnline = 1
      // this.props.navigation.navigate('Explore', {
      // });
      this.props.navigation.navigate(
        res.strings.explore, 
        {screen: 'Explore', param:{selectedIndex:1}},

    )
    }
    else 
      {
        urls = `${res.api.baseUrlCommon}${res.api.Project_List}`
        this.props.navigation.navigate('ProjectList', {
          url: urls
        });
      }

    
  }
  updateSearch = (search) => {
    this.setState({ search: search });
  };
  searchClick()
  {
    this.props.navigation.navigate('SearchList');
  }

  render() {
    
    return (
      <View style={styles.MainContainer}>
        <View style={{backgroundColor: 'black'}}>
          <Image
            source={ImageAssets.logoWhite}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
              marginTop: 40,
            }}
            resizeMethod='resize'
          />
          <TouchableOpacity style={{backgroundColor: res.color.whilteColor, height:40, margin:20, borderRadius:10, justifyContent:'flex-start',flexDirection:'row'}} onPress={()=>{this.searchClick()}}>
            <Icon name='search' size={20} color={res.color.darkGrayColor} style={{alignSelf:'center',width:40,marginLeft:20}}/>
            <Text style={{fontFamily:res.font.ragularFont,color:res.color.blackColor,alignSelf:'center',marginStart:8}}>{res.strings.searchUniqueFurnitureNow}</Text>
          </TouchableOpacity>  
        </View>
       

        <ScrollView>
          <View>
        <View>

          {globalVariables.keyAppLanguageGlobal==='en' ? <Pages indicatorColor={res.color.blackColor} height={250}  horizontal={true}>
          {this.state.banner.map((obj, index) => {
              return (
                <View>
                  <Image
                    style = {{width:'100%',height:'95%'}}
                    source={{
                      uri: `${res.api.baseUrlHomeBannerimage}${obj.Banner}`,
                    }}
                  />
                </View>
              );
          })} 
          </Pages> :  <Pages indicatorColor={res.color.blackColor} height={250} rtl={false} horizontal={true}>
          {this.state.banner.map((obj, index) => {
              return (
                <View>
                  <Image
                    style = {{width:'100%',height:'95%'}}
                    source={{
                      uri: `${res.api.baseUrlHomeBannerimage}${obj.Banner}`,
                    }}
                  />
                </View>
              );
          })} 
          
          </Pages> }
         
        
        </View>

        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.RenderTableComponent}
          numColumns={2}
        />

        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 0,
  },
  imageThumbnail: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
    resizeMode: 'center',
  },
});
