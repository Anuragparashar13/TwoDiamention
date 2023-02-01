import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import {PageControlAji} from 'react-native-chi-page-control';
import { ScrollView } from 'react-native-gesture-handler';
import { Thumbnail } from 'react-native-thumbnail-video';
import globalVariables from '../../Helper/Constant'

const widthScreen = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      designerDetail: {},
      ProjectImages: [],
      VideoLinks: '',
    };
    
  }

  componentDidMount() {
   
    // this.serviceCallGet();
  var param = {
      WebCountryCode: 'KW',
      UserID: 0,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
      Id: this.props.route.params.itemId
    };
   new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.SingleProjects}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
        //   alert(data.Message);
          this.setState({
            dataSource: data.Project_Details,
            designerDetail: data.Designer_Details,
            ProjectImages: data.Project_Images_List != null ? data.Project_Images_List : res.ImageAssets.logoBlack,
            VideoLinks: data.Project_Details.YoutubeLink,
          });
          console.log('Imagessssssss',this.state.ProjectImages)
      }
    })
  }


  renderHeading = ({item}) =>
  {
    <View >
        <Thumbnail url={this.state.VideoLinks}  imageWidth= '100%' onPress={console.log('play pressed')}/>
    </View>
  }


  ProductView = () => {
    return(
      <View>
         <View style={{marginLeft:20,marginRight:20,justifyContent:'center'}}>
         <Text style={{fontFamily:res.font.boldFont,fontSize:25,marginTop:10}}> {this.state.dataSource.ProjectName} </Text>
         <Text style={{fontFamily:res.font.ragularFont,fontSize:18,marginTop:10,color:res.color.darkGrayColor}}> {this.state.dataSource.ProjectDescription} </Text>
         </View> 
         <View style={{marginLeft:20,marginRight:20,justifyContent:'center'}}>
         <View style={styles.boxWithShadow}>
         <Image style={{height: 300,marginLeft:20,marginRight:20,shadowColor:res.color.darkGrayColor,shadowOpacity:0.23,shadowRadius:5, shadowOffset:{width:0,height:2}}} elevation={4} resizeMode='contain' source={{
            uri: res.api.baseUrlNewsAndEvent.concat(
                this.state.designerDetail.DesignerImage
              ),
          }} />
          </View>  
          <View style={{height:1,width:'120%',backgroundColor:res.color.lightGrayColor,marginTop:8,marginBottom:8,marginLeft:-20}} />
         <Text style={{fontFamily:res.font.boldFont,fontSize:25,marginTop:10,textAlign:'center'}}> {this.state.designerDetail.DesignerName} </Text>
         <Text style={{fontFamily:res.font.ragularFont,fontSize:18,marginTop:10,color:res.color.darkGrayColor}}> {this.state.designerDetail.DesignerDescription} </Text>
         <Text style={{fontFamily:res.font.boldFontpl,fontSize:22,marginTop:10,marginBottom:10}}> {res.strings.ProjectVideo} </Text>
         </View> 
         <Thumbnail url={this.state.dataSource.YoutubeLink ? this.state.dataSource.YoutubeLink : ''}   imageWidth= '100%' onPress={()=>{ this.props.navigation.navigate('WebViewComponent', {
                          url: this.state.dataSource.YoutubeLink ? this.state.dataSource.YoutubeLink : '',
                         title: 'YouTube',
   });}}/>
        <FlatList
           style={{marginTop:10}}
            data={2}
            renderItem={this.renderHeading}
            keyExtractor={(item) => item}
        /> 
      </View>   
    );
  }

  recentProducts = () => {
    <FlatList
    style={{marginTop:10}}
    data={this.state.recentNews}
    renderItem={this.renderHeading}
    keyExtractor={(item) => item}
  /> 
  }

  renderBannerItem = ({item}) => {
    return (
      <View
        style={{
          height: '100%',
          width: Dimensions.get('window').width,
          backgroundColor: item,
        }} >  
          <ImageBackground
            source={{
              uri: `${res.api.baseUrlProjectimage}${item.ImageName}`
            }}
            resizeMode='contain'
            style={{width:'100%',height:'100%',justifyContent:'space-between',alignSelf:'stretch'}}>
            <View style={{alignItems: 'center',justifyContent:'center'}}>
            <PageControlAji
            progress={this.state.progress}
            
            numberOfPages={this.state.ProjectImages.length}
            style={{marginTop: 60, width:'80%',alignItems:'center'}}
            />
            </View>
            <View style ={{marginBottom:20, justifyContent:'space-between',width:'100%',flexDirection:'row'}}>
              <TouchableOpacity style={[styles.closeButtonStyle,{marginLeft:20}] } onPress={() => {this.props.navigation.goBack()}}>
              <Image
               style = {{justifyContent:'center',alignSelf:'center'}}
               source={res.ImageAssets.cancelWhiteBg}
             />
              </TouchableOpacity>
             
                
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
    console.log('Imagessssssss',this.state.ProjectImages)
    return (
      <View style={styles.MainContainer}>
      <HeaderImageScrollView
        maxHeight={400}
        minHeight={60}
        headerImage={this.state.ProjectImages && this.state.ProjectImages.length>0 ? `${res.api.baseUrlProductImage}${this.state.ProjectImages[0].ImageName}` : res.ImageAssets.logoBlack}
        renderHeader={<View style={{backgroundColor:'blue'}} />}
        renderForeground={() => (
          <View>
          <FlatList
            data={this.state.ProjectImages}
            pagingEnabled={true}
            horizontal
            renderItem={this.renderBannerItem}
            onScroll={this.onScroll}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        )}
      >
        <View style={{marginBottom:20,borderTopLeftRadius:20,borderTopRightRadius:20}} >
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
  boxWithShadow: {
    shadowColor: res.color.midGrayColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
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
