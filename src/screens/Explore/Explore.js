import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import SegmentedControl from '@react-native-community/segmented-control';
import ProjectList from '../ProjectPage/ProjectList';
import ProductList from '../ProductList';
import NewsAndEventList from '../NewsAndEvent/NewsAndEventList';
import ProductListIns from '../Inspriation/ProductListIns'
import Categories from './Categories';
import InspritationList from '../Inspriation/InspritationList'
import { globalVariables } from '../../Helper/Constant';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DATA = ["red", "blue", "green", "yellow"];



export default class Explore extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: {},
      progress: Number,
      arrSegment: [res.strings.Collections, res.strings.OnlineShop, res.strings.Inspiration],
      selectedIndex: globalVariables.goToOnline === 1 ? 1 : 0,
    };
    
  }

  componentDidMount() {
    
    this.focusListener = this.props.navigation.addListener('focus', () => {
      
      // this.setState({
      //   selectedIndex: globalVariables.goToOnline === 1 ? 1 : 0,
      // })
      //Put your Data loading function here instead of my this.LoadData()
  });
    
    
    // this.serviceCallGet();
//   var param = {
//       WebCountryCode: 'KW',
//       UserID: 0,
//       Corpcentreby: '2',
//       CultureId: globalVariables.CultureId,
//     };
//    new ApiHelper().serviceCallGet(
//       param,
//       this.props.route.params.url,
//       (data, err) => {
//         if (err) {
//           alert(err);
//         } else {
//           alert(data.Message);
//           this.setState({
//             dataSource: data.row,
//           });
//       }

//     })
  }

  RenderTableComponent = ({ item }) => {
    return (
      
      <View style={{width:'90%',margin:'5%',shadowColor:res.color.lightGrayColor,alignSelf:'center'}}>
        <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={() => this.onPressCell(item)}>
        <View style={{alignItems:'center',width:'100%'}}>
        <Image style={{width:'100%',height: 300,}} source={{
            uri: res.api.baseUrlProjectimage.concat(
              item.ProjectImg1
              ),
          }} />
        </View>
        <View style={{marginTop:-50,height:100, width:'50%',backgroundColor:res.color.whilteColor,borderRadius:10,shadowOpacity:5.0,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontFamily:res.font.ragularFont,fontSize:22,fontWeight:'600'}}>{item.ProjectName} </Text>
        </View>  
       </TouchableOpacity> 
    </View>
  );
  };


  getScreenOnsegmentClick() {
     
    if (this.state.selectedIndex === 0) {
      globalVariables.goToOnline = 0
        return <ProductList navigation={this.props.navigation} />;
    } else if (this.state.selectedIndex === 1)  {
      globalVariables.goToOnline = 1
        return <Categories navigation={this.props.navigation} />;
    }
    else {
      globalVariables.goToOnline = 2
       return <InspritationList navigation={this.props.navigation}/>
    }
}

  render() {
    return (
    <View style={styles.MainContainer}>
       <View style={[styles.container,{width:'100%',height:'15%',alignItems:'flex-end',justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:res.color.lightGrayColor}]}>
         <Text style={[styles.mainTitle,{paddingStart:20}]}>{this.state.arrSegment[this.state.selectedIndex]}</Text>
        </View>
    <SegmentedControl
    style={{margin:10}}
    values={this.state.arrSegment}
    selectedIndex={this.state.selectedIndex}
    onChange={(event) => {
      this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
    }}
  />
     {this.getScreenOnsegmentClick()}
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
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingStart: 20,
    alignSelf:'flex-end',
    fontFamily: res.font.ragularFont,
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
