import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import globalVariables from '../../Helper/Constant';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




export default class InspritationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
   
    var param = {
      StrQuery: `SP_HeaderMST 'Get_Inspiration_List_Apps','','','','','','2',1`,
    };

    new ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            dataSource: data.row,
          });
        }
      },
    );
  }

  RenderTableComponent = ({ item }) => {
    return (
      
        <TouchableOpacity style={{width:'100%',height:300,alignItems:'center',justifyContent:'center'}} onPress={() => this.onPressCell(item)}>
        <View style={{alignItems:'center',width:'100%'}}>
        <ImageBackground style={{width:'95%',height: '95%',alignSelf:'flex-end',justifyContent:'flex-end',borderRadius:10,}} source={{
            uri: res.api.inspriationCatImagebaseUrl.concat(
              item.Image1
              ),
          }} >

          <Text style={{fontFamily:res.font.ragularFont,fontSize:22,fontWeight:'500',color:res.color.whilteColor, marginBottom:20,alignSelf:'center'}}>{item.XName} </Text>     

         </ImageBackground>     
        </View>
        
       </TouchableOpacity> 
    
  );
  };




renderItem = ({item}) => {<RenderTableComponent item={item} />};

  renderBannerItem({item}) {
    return <View style={{height: 100, width: width, backgroundColor: item, borderColor: 'black', borderWidth: 2}} />
  };


  //cell Click
  onPressCell(item) {
    
    this.props.navigation.navigate('InspritionCateList', {
       itemId: item.XCode,
       title: item.XName,
    });
  }


  render() {
    return (
      

    <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
          
        />
      </View>
    
    )
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
});
