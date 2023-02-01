import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated, _ScrollView} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import {PageControlAji} from 'react-native-chi-page-control';
import { ScrollView } from 'react-native-gesture-handler';
import globalVariables from '../../Helper/Constant'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




export default class NewsAndEventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      recentNewses:[],
      images:[res.ImageAssets.backgroundLanguage,res.ImageAssets.cartSelected],
    };
  }

  componentDidMount() {
   
    // this.serviceCallGet();
    var param = {
      WebCountryCode: 'KW',
      UserID: 0,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
      Id: this.props.route.params.id
    };
   new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.SingleNewsEvents}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
        //   alert(data.Message);
          this.setState({
            recentNewses: data.row.Recent_NewsEvents_List,
            dataSource: data.row.SingleNews_Details,
          });
      }
    })
  }

  RenderTableComponent = ({ item }) => {
    return (
      
      <View style={{width:'90%',margin:'5%',shadowColor:res.color.lightGrayColor,alignSelf:'center'}}>
        <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={() => this.onPressCell(item)}>
        <View style={{alignItems:'center',width:'100%'}}>
        <Image style={{width:'100%',height: 200,}} source={{
            uri: res.api.baseUrlProjectimage.concat(
              item.ProjectImg1
              ),
          }} />
        </View>
        <View style={{marginTop:8, width:'100%',backgroundColor:res.color.whilteColor}}>
            <Text style={{fontFamily:res.font,fontSize:22,fontWeight:'600',fontFamily:res.font.ragularFont}}>{item.ProjectName} </Text>
            <Text style={{fontFamily:res.font,fontSize:18,fontFamily:res.font.ragularFont}}>{item.ProjectName} </Text>
        </View>  
       </TouchableOpacity> 
    </View>
  );
  };


  RenderFilterComponentCell = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProfileView')}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.nameTitleMyAcc}>title</Text>
          <Text style={styles.nameSubTitleMyAcc}>subTitle</Text>
        </View>
        {/* <Image style={styles.userImage} source={ImageAssets.cartSelected} /> */}
      </View>
    </TouchableOpacity>
  );
  };

  //cell Click
  onPressCell(item) {
    // this.props.navigation.navigate('Filter', {
    //   // itemId: item.id,
    //   // title: item.title.rendered,
    // });
  }

  renderHeading = ({item}) =>
  {
    
       <View>
        <View style={{alignItems:'center',width:'100%'}}>
        <Image style={{width:'100%',height: 300,}} source={{
            uri: res.api.baseUrlNewsAndEvent.concat(
              item.Image
              ),
          }} />
        </View>
        <View style={{marginTop:8, width:'100%',backgroundColor:res.color.whilteColor}}>
            <Text style={{fontFamily:res.font,fontSize:22,fontWeight:'600',fontFamily:res.font.ragularFont}}>{item.Name} </Text>
            <Text style={{fontFamily:res.font,fontSize:18,fontFamily:res.font.ragularFont}}>{item.RecentDescription} </Text>
        </View>  
        </View>
  }


  ProductView = () => {
    return(
      <View>
         <View style={{marginLeft:20,marginRight:20,justifyContent:'center'}}>
         <Text style={{fontFamily:res.font.boldFontpl,fontSize:25,marginTop:10}}> {this.state.dataSource.singleNews_Name} </Text>
         <Text style={{fontFamily:res.font.ragularFont,fontSize:18,marginTop:10,color:res.color.darkGrayColor}}> {this.state.dataSource.singleNews_Description} </Text>
         <Text style={{fontFamily:res.font.boldFontpl,fontSize:22,marginTop:10}}> {res.strings.recentNews} </Text>
         </View>  
        
        {this.state.recentNewses.map((item, index) => {
              return (
                <View style={{width:'90%',margin:'5%',shadowColor:res.color.lightGrayColor,alignSelf:'center',height:200}}>
        <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={() => this.onPressCell(item)}>
        <View style={{alignItems:'center',width:'100%'}}>
        <Image style={{width:'100%',height: 200,}} resizeMode='contain' source={{
            uri: res.api.baseUrlProjectimage.concat(
              item.ProjectImg1
              ),
          }} />
        </View>
        <View style={{marginTop:8, width:'100%',backgroundColor:res.color.whilteColor}}>
            <Text style={{fontFamily:res.font,fontSize:22,fontWeight:'600',fontFamily:res.font.ragularFont}}>{item.ProjectName} </Text>
            <Text style={{fontFamily:res.font,fontSize:18,fontFamily:res.font.ragularFont}}>{item.ProjectName} </Text>
        </View>  
       </TouchableOpacity> 
    </View>
              );
          })}

      </View>   
    );
  }

  // recentProducts = () => {
  //   <FlatList
  //   style={{marginTop:10, height:'80%'}}
  //   data={this.state.recentNews}
  //   renderItem={this.renderHeading}
  //   keyExtractor={(item) => item}
  // /> 
  // }

  renderBannerItem = ({item}) => {
    return (
      <View
        style={{
          height: '100%',
          width: width,
          backgroundColor: item,
         
        }} >
          <ImageBackground
            source={{
              uri: res.api.baseUrlNewsAndEvent.concat(
                this.state.dataSource.singleNews_Image
                ),
            }}
            resizeMode='contain'
            style={{width:'100%',height:'100%',justifyContent:'space-between'}}>
            <View style={{backgroundColor:'rgba(52, 52, 52, 0.1)', height:'100%',flexDirection:'column-reverse'}}>
            <View style={{alignItems: 'center',justifyContent:'center'}}>
            </View>
            <View style ={{marginBottom:30, justifyContent:'space-between',width:'100%',flexDirection:'row'}}>
              <TouchableOpacity style={[styles.closeButtonStyle,{marginLeft:20}]} onPress={() => {this.props.navigation.goBack()}} >
              <Image
               style = {{justifyContent:'center',alignSelf:'center'}}
               source={res.ImageAssets.closeIcon}
             />
              </TouchableOpacity>
              
                
             </View> 
             </View> 
          </ImageBackground>
          {/* <Image style={styles.imageThumbnail} source={{ uri: item.src }} /> */}
      </View>
    );
  }

  // res.api.baseUrlNewsAndEvent.concat(
  //   this.state.dataSource.singleNews_Image
  //   ),

  render() {
    return (
      <View style={styles.MainContainer}>
      
      <HeaderImageScrollView
        maxHeight={400}
        minHeight={60}
        headerImage={() => <Image source={{
          uri: 'http://admin.2d.com.kw/Upload/NewsEvents/2/2D_Logo.jpg'
        }}  />}
        renderHeader={<View style={{backgroundColor:'blue'}} />}
        renderForeground={() => (
          <View>
          {this.renderBannerItem(this.state.dataSource)}
        </View>
        )}
      >
        <View >
          {this.ProductView()}
        </View>
        
      </HeaderImageScrollView>
       
      </View>
    );
  };

};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 0,
  },
  imageThumbnail: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 100,
  },
  vwfilter: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnfilter: {
    backgroundColor: res.color.whilteColor,
    height: 40,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    shadowOpacity: 5.0,
    shadowColor: res.color.lightGrayColor,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5F6F8',
  },
  openButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#5B87E5',
    borderRadius: 30,
  },
  openButtonText: {
    fontSize: 12,
    color: 'white',
  },
  subView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: height - 200,
  },
  closeButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 12,
  },
  closeButton: {
    height: 7,
    width: 62,
    backgroundColor: '#D8D8D8',
    borderRadius: 3.5,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  closeButtonStyle: { backgroundColor: res.color.whilteColor, width: 40, height: 40, borderRadius: 20, marginRight: 20, justifyContent: 'center' },
});
