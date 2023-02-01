import React, {Component,Fragment, StrictMode} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../res/Translation/strings';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../Helper/ImageAssets';
import res from '../Helper/index'
import ApiHelper from '../Helper/ApiHelper/ApiHelper';
import Filter from './FilterScreens/Filter'
import Modal from 'react-native-modal';
import { globalVariables } from '../Helper/Constant';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import {BackButton} from '../Helper/Navigation/TabBarController'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DATA = ["red", "blue", "green", "yellow"];



export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      progress: Number,
      isFilterVisible: false,
      arryCategory:[],
      arrySubCategory:[],
      arryBrand: [],
      priceMin: '',
      priceMax: '',
      sortBy: '',
      filterparam: {},
      isFav: false,
    };
   
    this.props.navigation.setOptions({
      title: this.props.route && this.props.route.params.title ? this.props.route.params.title : res.strings.ProductList,
      headerLeft: () => <BackButton nav={this.props.navigation} isWhite={true}/>,
    })
     this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    
  this.onScroll = this.onScroll.bind(this);
  var param = {
      WebCountryCode: 'KW',
      UserID: globalVariables.userId === '' ? 0 : globalVariables.userId,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
    };
    console.log('++++++++', param)
   new ApiHelper().serviceCallGet(
      param,
      this.props.route ? this.props.route.params.url : `${res.api.baseUrlCommon}${res.api.Get_CollectionAllProducts}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          
          console.log(data);
          this.setState({
            dataSource: data.row.Product_List,
            priceMin: data.row.ListMinValue,
            priceMax: data.row.ListMaxValue,
            filterparam: param
          });
      }
    })
  }

  addToWishList(item)
  {
    var param = {
      XCode: item.XCode,
      IpAddress: DeviceInfo.getUniqueId(),
      UserID: globalVariables.userId,
    };
   new ApiHelper().serviceCallGet(
      param,
      item.IsWishListItem === false ? `${res.api.baseUrlCommon}${res.api.AddtoWishlist}` : `${res.api.baseUrlCommon}${res.api.DeleteWishlist_ByXCode}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data);
          item.IsWishListItem = true
          this.setState({

          })
      }
    })
  }


  deleteToWishList(item)
  {
    var param = {
      XCode: item.XCode,
      IpAddress: DeviceInfo.getUniqueId(),
      UserID: globalVariables.userId,
    };
   new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.DeleteWishlist_ByXCode}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data);
          item.IsWishListItem = false
          this.setState({

          })
      }
    })
  }

  ApicallFilter(arrBrand,arrCat,arrSubCat,priceMin,priceMax,sortedBy)
  {
    var param = {
      WebCountryCode: 'KW',
      UserID: 0,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
      Arry_Category: arrCat,
      Arry_SubCategory: arrSubCat,
      Arry_Brand: arrBrand,
      Price_Min: priceMin,
      Price_Max: priceMax,
      SortBy: sortedBy
    };
    console.log(param)
    console.log( this.props.route ? this.props.route.params.filteredProduct : `${res.api.baseUrlCommon}${res.api.Get_CollectionAllProducts_Filterwise}`)
   new ApiHelper().serviceCallGet(
      param,
      this.props.route ? this.props.route.params.filteredProduct : `${res.api.baseUrlCommon}${res.api.Get_CollectionAllProducts_Filterwise}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          
          console.log(data)
          this.setState({
            dataSource: data.row.Product_List,
          });
      }
    })
  }


  parentFunction=(arrBrand,arrCat,arrSubCat,priceMin,priceMax,sortedBy)=>{
   

    this.setState({
      isFilterVisible: false,
      // arryBrand: arrBrand,
      // arryCategory: arrCat,
      // arrySubCategory: arrSubCat,
      // priceMin: priceMin,
      // priceMax: priceMax,
      // sortBy: sortedBy
    })
    this.ApicallFilter(arrBrand,arrCat,arrSubCat,priceMin,priceMax,sortedBy)
  }


  renderTopView(item)
  {
    if (item.AvailableQuantity == 0)
    {
     return( <TouchableOpacity style={{backgroundColor:res.color.redColor}}>
      <Text style={{color:res.color.whilteColor,padding: 5, fontFamily:res.font.ragularFont}}>{res.strings.soldOut} </Text>
       </TouchableOpacity>
     )
    }
    else if (item.IsNew === 1)
    {
      return( <TouchableOpacity style={{backgroundColor:res.color.blackColor}}>
        <Text style={{color:res.color.whilteColor,padding: 5, fontFamily:res.font.ragularFont}}>{res.strings.new} </Text>
         </TouchableOpacity>
       )
    }
    else{
      return( <TouchableOpacity style={{backgroundColor:res.color.blackColor}}>
        <Text style={{width:0,color:res.color.whilteColor, fontFamily:res.font.ragularFont}}> </Text>
         </TouchableOpacity>
       )
    }
    

    

  }
  


  RenderTableComponent = ({ item }) => {
    console.log(item.OldPrice)
    return (
      <View style={{width:'45%', flexDirection: 'column',margin:8,backgroundColor:res.color.whilteColor,borderRadius:10,marginLeft:10,shadowOpacity:5.0,shadowColor:res.color.lightGrayColor}}>
        <TouchableOpacity onPress={() => this.onPressCell(item)}>
         
         <View  style={{height:40,justifyContent:'space-between',flexDirection:'row', alignItems:'center',marginLeft:10,marginRight:10,marginTop:4}}>
    
         {this.renderTopView(item)}

            <TouchableOpacity style={{width:30,height:30}} onPress={()=>{ globalVariables.userId != 0 ? item.IsWishListItem === false ? this.addToWishList(item) : this.deleteToWishList(item) : Toast.show(res.strings.pleaseLogin)}}>
              <Image source={item.IsWishListItem === false ? res.ImageAssets.favUnselectIcon : res.ImageAssets.favselectIcon} />
            </TouchableOpacity>
          </View>
        <View style={{alignItems:'center'}}>
        <Image style={{width:'100%',height: 150,}} resizeMode='contain' source={{
            uri: res.api.baseUrlProductImage.concat(
              item.Image
              ),
          }} />
        <Text style={{marginLeft:8,marginRight:8,fontFamily:res.font.ragularFont,textAlign:'center'}}>{item.XName} </Text>  
        <Text style={{width: '40%',height:2, backgroundColor:res.color.lightGrayColor,marginTop:8,marginBottom:8,fontFamily:res.font.ragularFont}} />
        {item.OldPrice !== 0 ?  <Text style={{textDecorationStyle: 'solid',textDecorationLine: 'line-through',color:res.color.midGrayColor,fontFamily:res.font.ragularFont}}>{item.OldPrice.toFixed(3) + ' ' + item.Currency} </Text> : null}
       
        <Text style={{marginBottom:10,fontFamily:res.font.ragularFont}}>{item.NewPrice.toFixed(3) + ' ' + item.Currency}</Text> 
        </View> 
       </TouchableOpacity> 
    </View>
  );
  };




renderItem = ({item}) => {<RenderTableComponent item={item} />};

  renderBannerItem({item}) {
    return <View style={{height: 100, width: width, backgroundColor: item, borderColor: 'black', borderWidth: 2}} />
  };

  onScroll(e) {
    // Get progress by dividing current FlatList X offset with full FlatList width
    this.setState({ progress : e.nativeEvent.contentOffset.x / ((DATA.length - 1) * width) })
  };


  //cell Click
  onPressCell(item) {
    this.props.navigation.navigate('ProductDetail', {
       itemId: item.XCode,
    });
  }

  toggleDetails = shouldOpen => {
    <Filter />
  };


  closeModal = () =>
  {
    this.setState({isFilterVisible: false});
  };

  changeState = ({item}) =>{
    this.setState({
      isFilterVisible: false
    })
  }
  openFilter(){
    if (this.state.dataSource.length > 0)
    {
      {this.setState({isFilterVisible: !this.state.isFilterVisible})}
    }
  }


  //swipeDirection= {['down']}  onSwipeComplete={this.closeModal}
  render() {
    return (
  
    <View style={styles.MainContainer}>
        <Modal style={{justifyContent: 'flex-end',margin:0}} isVisible={this.state.isFilterVisible}  backdropColor={res.color.blackColor} hasBackdrop={true} >
          <View style={{ height: '80%',backgroundColor:res.color.whilteColor, flexDirection: 'column-reverse',alignItems:'flex-end',borderTopLeftRadius:20,borderTopRightRadius:20 }}>
              <Filter minPrice={this.state.priceMin} maxPrice={this.state.priceMax} changeState = {this.changeState} functionCallFromParent={this.parentFunction.bind(this)} Api={this.props.route ? this.props.route.params.filterUrl : `${res.api.baseUrlCommon}${res.api.Get_CollectionAllProducts_Filter_List}`} param={this.state.filterparam}/>
          </View>
        </Modal>

        <View style= {styles.vwfilter}>
        <TouchableOpacity style={styles.btnfilter} onPress={() => this.openFilter()}>
          <Image source={res.ImageAssets.filterIcon} />
          <Text style={{fontFamily:res.font.ragularFont}} > {res.strings.filterAndSort}</Text>
        </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
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
    shadowColor: res.color.midGrayColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,  
    elevation: 5
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
    height: '85%',
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
