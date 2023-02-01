import React, {Component} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import DeviceInfo from 'react-native-device-info';
import { globalVariables } from '../../Helper/Constant';
import res from '../../Helper/index'
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('window').width;
const DATA = ["red", "blue", "green", "yellow"];



export default class CartList extends React.Component
{
 
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      itemList: [],
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
     
      this.ApiCallGetcartList()
      //Put your Data loading function here instead of my this.LoadData()
  });
    
  }

  ApiCallGetcartList()
  {
    var param = {
      WebCountryCode: 'KW',
      UserID: globalVariables.userId,
      CultureId: globalVariables.CultureId,
      UniqueId: globalVariables.UniqueId,
      IpAddress: DeviceInfo.getUniqueId(),
      // Id: this.props.route.params.itemId
    };
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.Get_CartProducts_List}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            dataSource: data.row[0],
            itemList: data.row[0].CartItemsList,
          });
      }
    })
  }

  ApiCallUpdateQuantity(item)
  {
    var param = {
      XCode: item.CartId,
      Quantity: item.Quantity,
    };
    console.log(param)
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.UpdateCartQty}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          if (item.Quantity == 0)
          {
            this.ApiCalldeleteCart(item)
          }
          else
          {
             this.ApiCallGetcartList()
          }
         
      }
    })
  }

  ApiCalldeleteCart(item)
  {
    var param = {
      CartId: item.CartId,
    };
    console.log(param)
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.DeleteCartByXCode}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          console.log(this.state.itemList.length)
          if(this.state.itemList.length===1)
          {
           this.setState({ itemList:[], dataSource:[]})
          }
          this.ApiCallGetcartList()
         
      }
    })
  }


  quantityUpdate(item, isAdd)
  {
    if (isAdd==true)
    {
      item.Quantity = item.Quantity + 1
    }
    else
    {
      item.Quantity = item.Quantity - 1
    }
    this.ApiCallUpdateQuantity(item)

  }

  moveToCheckout()
  {
    if (this.state.itemList.length>0)
    {
    globalVariables.isCheckout = true
    globalVariables.BuyNow = ''
    if (globalVariables.userId == 0)
    {
      this.props.navigation.navigate('Login')
    }
    else
    {
      globalVariables.isCheckout = true
      this.props.navigation.navigate('AddressList')
    }
  }
  else{
    Toast.show('cart is Empty');
  }
  }

  


  RenderTableComponent = ({item}) => {
    return (
      <View style={{flexDirection: 'column', margin: 1, width: '100%', marginTop:8}}>
        <TouchableOpacity onPress={() => this.onPressCell(item)}>
          <View style={styles.container}>
            <Image style={styles.userImage} source={{ uri: res.api.baseUrlProductImage.concat(
                item.Image1
                )}} />
            <View style={styles.subContainer}>
              <Text style={styles.nameTitleMyAcc} numberOfLines={1}>{item.XName}</Text>
              <Text style={[styles.nameSubTitleMyAcc,{fontFamily:res.font.ragularFont,color:res.color.midGrayColor}]}>{item.NewPrice.toFixed(3)} {item.Currency} QTY: {item.Quantity}</Text>
            </View>

            <ImageBackground source={res.ImageAssets.stepperIcon} style={{width:100,height:30,flexDirection:'row',alignSelf:'center',borderRadius:10,marginEnd:10}}>
                <TouchableOpacity style={styles.quantityButton}  onPress={()=>{this.quantityUpdate(item,false)}}>
                  
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quantityButton} onPress={()=>{this.quantityUpdate(item,true)}}>
                 
                  </TouchableOpacity>
             </ImageBackground> 
           
          </View>
        </TouchableOpacity>
        <Text style={{backgroundColor:res.color.lightGrayColor,height:1,marginStart:60,marginTop:8,marginEnd:-10}}></Text>
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
     // title: item.title.rendered,
   });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={[styles.container,{width:'100%',height:'15%',alignItems:'flex-end',justifyContent:'flex-start',borderBottomWidth:2,borderBottomColor:res.color.lightGrayColor}]}>
         <Text style={styles.mainTitle}>{res.strings.cart}</Text>
        </View>
        <FlatList
         
          data={this.state.itemList}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{width:'100%'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:4}}>
            <Text style={styles.subTotal}> {res.strings.subTotal} </Text>
            <Text style={styles.subTotal}> {this.state.dataSource.SubTotal ? this.state.dataSource.SubTotal.toFixed(3) : '0.000'} {res.strings.kd} </Text>
          </View> 
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:4}}>
            <Text style={styles.subTotal}> {res.strings.discount} </Text>
            <Text style={styles.subTotal}> {this.state.dataSource.Discount ? this.state.dataSource.Discount.toFixed(3) : '0.000'} {res.strings.kd}</Text>
          </View> 
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:4}}>
            <Text style={styles.subTotal}> {res.strings.Shipping} </Text>
            <Text style={styles.subTotal}> {this.state.dataSource.ShippingCharge ? this.state.dataSource.ShippingCharge.toFixed(3) : '0.000'} {res.strings.kd}</Text>
          </View>  
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:4,borderTopColor:res.color.lightGrayColor,borderBottomColor:res.color.lightGrayColor,borderTopWidth:1,borderBottomWidth:1}}>
            <Text style={[styles.Totalstyle]}> {res.strings.grandTotal}</Text>
            <Text style={[styles.Totalstyle]}> {this.state.dataSource.GrandTotal ? this.state.dataSource.GrandTotal.toFixed(3) : '0.000'} {res.strings.kd}</Text>
          </View> 
          <TouchableOpacity style={styles.blackButtonViewCart} onPress={()=>{this.moveToCheckout()}}>
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.boldFont,fontSize:20}}> {res.strings.Checkout} </Text>
          </TouchableOpacity>  
        </View>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:res.color.whilteColor,
    width:'100%',
    height:'100%'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subTotal:{fontFamily:res.font.ragularFont,color:res.color.darkGrayColor},
  Totalstyle:{fontFamily:res.font.boldFont,color:res.color.blackColor,paddingTop:10,paddingBottom:10},
  blackButtonViewCart: {margin:'5%',width:'80%',alignItems:'center',backgroundColor:res.color.blackColor,height:50,alignSelf:'center',justifyContent:'center',borderRadius:10},
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
    fontSize: 30,
    fontWeight: 'bold',
    paddingStart: 20,
    alignSelf:'flex-end',
    fontFamily: res.font.ragularFont,
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '50%',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
    borderColor: res.color.lightGrayColor,
    borderWidth: 1
  },
  nameTitleMyAcc: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily:res.font.ragularFont,
    justifyContent: 'center',
    paddingBottom: 8,
  },
  quantityButton: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent:'center',
    height: 30,
    width: '50%',
  },
});
