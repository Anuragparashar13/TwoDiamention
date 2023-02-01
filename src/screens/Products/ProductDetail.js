//https://www.npmjs.com/package/react-native-image-header-scroll-view
import React, { Component, Fragment } from 'react';
import { View, Text, Button, StyleSheet, SectionList, FlatList, Image, StatusBar, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
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

const widthScreen = Dimensions.get('window').width;


export default class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      banners: [],
      relatedProducts: [],
      progress: Number,
      colors: [],
      arrSize: [],
      // detailHeading: [res.strings.productDescription,res.strings.Dimention],
      detailHeading: [{ 'title': res.strings.productDescription, 'isExpand': false }, { 'title': res.strings.Dimention, 'isExpand': false }],
      isExpandDes: false,
      isExpandDie: false,
      desExpandHeight: 60,
      dieExpandHeight: 60,
      selectedSize: '',
      selectedSizeKey: '',
      selectedColor: '',
      selectedColorKey: '',
      isCartPopUp: false,
      itemId: this.props.route.params.itemId
    };

  }

  componentDidMount() {

    { this.ApiCalls( this.state.itemId) }
  }

  ApiCalls(itemId) {
    var param = {
      WebCountryCode: 'KW',
      UserID: 0,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
      // Id: 'IM20000004'
      Id: itemId,
    };
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.SingleProduct}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.state.banners = []
          if (data.row.SingleProduct_Details.Image1 !== 'Default.jpg') {
            this.state.banners.push(data.row.SingleProduct_Details.Image1)
          }
          if (data.row.SingleProduct_Details.Image2 !== 'Default.jpg') {
            this.state.banners.push(data.row.SingleProduct_Details.Image2)
          }
          if (data.row.SingleProduct_Details.Image3 !== 'Default.jpg') {
            this.state.banners.push(data.row.SingleProduct_Details.Image3)
          }
          if (data.row.SingleProduct_Details.Image4 !== 'Default.jpg') {
            this.state.banners.push(data.row.SingleProduct_Details.Image4)
          }
          if (data.row.SingleProduct_Details.Image5 !== 'Default.jpg') {
            this.state.banners.push(data.row.SingleProduct_Details.Image5)
          }
          if (data.row.SingleProduct_Details.Image6 !== 'Default.jpg') {
            this.state.banners.push(data.row.SingleProduct_Details.Image6)
          }
          console.log(this.state.banners);
          this.setState({
            dataSource: data.row.SingleProduct_Details,
            colors: data.row.Color_List,
            arrSize: data.row.Size_List,
            relatedProducts: data.row.SingleProduct_Related_list,
          });
        }
      })
  }

  ApiCallSelectedColor() {
    var param = {
      WebCountryCode: 'KW',
      UserID: 0,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
      Id: this.state.itemId,
      ProductSize: this.state.selectedSizeKey,
      ProductColor: this.state.selectedColorKey,
      // Id: this.props.route.params.itemId
    };
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.colorSelectApi}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          alert(data.row.SingleProduct_Details.XCode);
          if (data.row.SingleProduct_Details.Image1 != '') {
            this.state.banners.push(ata.row.SingleProduct_Details.Image1)
          } else if (data.row.SingleProduct_Details.Image2 != '') {
            this.state.banners.push(ata.row.SingleProduct_Details.Image2)
          } else if (data.row.SingleProduct_Details.Image3 != '') {
            this.state.banners.push(ata.row.SingleProduct_Details.Image3)
          } else if (data.row.SingleProduct_Details.Image4 != '') {
            this.state.banners.push(ata.row.SingleProduct_Details.Image4)
          } else if (data.row.SingleProduct_Details.Image5 != '') {
            this.state.banners.push(ata.row.SingleProduct_Details.Image5)
          } else if (data.row.SingleProduct_Details.Image6 != '') {
            this.state.banners.push(ata.row.SingleProduct_Details.Image6)
          }
          this.setState({
            dataSource: data.row.SingleProduct_Details,
            colors: data.row.Color_List,
          });
        }
      })
  }

  ApiCallSelectedSize() {

    var param = {
      WebCountryCode: 'KW',
      UserID: 0,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
      XCode: this.state.itemId,
      ProductSize: this.state.selectedSizeKey,
      // Id: this.props.route.params.itemId
    };
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.sizeSelectApi}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          alert(data.row.SingleProduct_Details.XCode);
          this.setState({
            dataSource: data.row.SingleProduct_Details,
            colors: data.row.Color_List,
          });
        }
      })
  }


  addToWishList(item) {
    var param = {
      XCode: item.XCode,
      IpAddress: DeviceInfo.getUniqueId(),
      UserID: globalVariables.userId,
    };
    new ApiHelper().serviceCallGet(
      param,
     `${res.api.baseUrlCommon}${res.api.AddtoWishlist}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data);
          item.IsWishListItem = true
          this.setState({
            dataSource: item
          })
          Toast.show(data.Message)
        }
      })
  }


  deleteToWishList(item) {
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
            dataSource: item
          })
          Toast.show(data.Message)
        }
      })
  }


  ApiCallAddToCart(item, isBuy) {
    if (item.AvailableQuantity > 0)
    {
    var param = {
      WebCountryCode: 'KW',
      UserID: globalVariables.userId,
      Corpcentreby: '2',
      CultureId: globalVariables.CultureId,
      NewPrice: item.NewPrice,
      XCode: item.XCode,
      Quantity: 1,
      Color: this.state.selectedColorKey,
      Size: this.state.selectedSizeKey,
      UniqueKey: globalVariables.UniqueId,
      IpAddress: DeviceInfo.getUniqueId()
    };
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.apiCallAddTocart}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          if(isBuy === true)
          {

            globalVariables.BuyNow = item.XCode
            globalVariables.isCheckout = true
            if (globalVariables.userId == 0)
            {
              this.props.navigation.navigate('Login')
            }
            else
            {
              this.props.navigation.navigate('AddressList')
            }     
            
          }
          else
          {
          this.setState({
            isCartPopUp: true
          });
          setTimeout(()=>{this.setState({isCartPopUp: false})}, 3000); 

        }
        }
      })
    }
    else
    {
       Toast.show(res.strings.productNotavailableinStock)
    }
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}

  renderBannerItem = ({ item }) => {
    return (
      <View
        style={{
          height: '100%',
          width: Dimensions.get('window').width,
        
        }} >
        <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{this.onPressImageShow(item)}}>
        <ImageBackground
          source={{
            uri: res.api.baseUrlProductImage.concat(
              item
            ),
          }}
          style={{ width: '100%', height: '100%', justifyContent: 'space-between',}} resizeMode='contain' >
          <View style={{backgroundColor:'rgba(52, 52, 52, 0.1)', height:'100%',justifyContent: 'space-between',}}> 
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <PageControlAji
              progress={this.state.progress}
              numberOfPages={this.state.banners}
              style={{ marginTop: 60, width: '80%', alignItems: 'center' }}
              inactiveTintColor={res.color.midGrayColor}
            />
          </View>
          
          <View style={{ marginBottom: 40, justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.closeButtonStyle, { marginLeft: 20 }]} onPress={() => { this.props.navigation.goBack() }}>
              <Image
                style={{ justifyContent: 'center', alignSelf: 'center' }}
                source={res.ImageAssets.cancelWhiteBg}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButtonStyle} onPress={() => { globalVariables.userId != 0 ? this.state.dataSource.IsWishListItem === true ? this.deleteToWishList(this.state.dataSource) : this.addToWishList(this.state.dataSource): Toast.show(res.strings.pleaseLogin) }}>
              <Image
                style={{ justifyContent: 'center', alignSelf: 'center' }}
                source={res.ImageAssets.favBlack}
              />
            </TouchableOpacity>

          </View>
          </View>
        </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  bottomButtons = () => {
    return (
      <View style={{ flexDirection: 'row', height: '10%', justifyContent: 'center', alignItems: 'center',backgroundColor:res.color.whilteColor, shadowColor: res.color.midGrayColor, shadowOpacity: 5, shadowRadius: 10 }}>
        <TouchableOpacity style={styles.blackButtonBottom} onPress={() => { this.ApiCallAddToCart(this.state.dataSource, false) }}>
          <Text style={{ color: res.color.whilteColor, fontFamily: res.font.ragularFont }}> {res.strings.AddToCart} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blackButtonBottom} onPress={() => { this.buyNow(this.state.dataSource) }}>
          <Text style={{ color: res.color.whilteColor, fontFamily: res.font.semiBoldFont }}> {res.strings.proceedToPay} </Text>
        </TouchableOpacity>
      </View>
    );
  }

  buyNow(item) {
    this.ApiCallAddToCart(item,true)
  }


  pickerView = () => {
    const ItemArr = this.state.arrSize.map(({ XCode, XName }) => {
      return {
        label: XName,
        value: XName,
        key: XCode
      }
    });
    return (
      <RNPickerSelect

        items={ItemArr}
        inputLabel='asdad'

        onValueChange={(value, index) => {
          this.setState({
            selectedSize: value,
            selectedSizeKey: ItemArr[index - 1].key,
          });
        }}
        value={this.state.selectedSize}
        useNativeAndroidPickerStyle={false}
        textInputProps={{ underlineColorAndroid: 'cyan' }}
        onDonePress={() => { this.ApiCallSelectedSize() }}
        style={{ color: res.color.whilteColor, fontFamily: res.font.semiBoldFont, width: '100%', height: '100%' }}
      />
    );
  }

  varientView = () => {
    if (this.state.colors.length != 0 && this.state.arrSize.length != 0) {
      return (
        <View style={{ flexDirection: 'row', height: 60, justifyContent: 'space-between', alignItems: 'center', shadowColor: res.color.lightGrayColor, backgroundColor: res.color.whilteColor }}>
          <View style={{ width: '60%' }}>
            <FlatList
              data={this.state.colors}
              renderItem={this.renderVarientColor}
              keyExtractor={(item) => item}
              horizontal
            />
          </View>
          <View style={[styles.blackButtonBottom, { width: '30%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }]}>
            {this.pickerView()}
          </View>

        </View>
      );
    }
  }


  ProductView = () => {
    return (
      <View>
        <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: res.font.boldFontpl, fontSize: 25, marginTop: 10, textAlign: 'center' }}> {this.state.dataSource.XName} </Text>
          <Text style={{ fontFamily: res.font.ragularFont, fontSize: 18, marginTop: 10, color: res.color.darkGrayColor }}> Brand : {this.state.dataSource.ProdBrandName} </Text>
          <Text style={{ fontFamily: res.font.boldFont, fontSize: 22, marginTop: 10 }}>  {this.state.dataSource.NewPrice ? this.state.dataSource.NewPrice.toFixed(3) : 0} KD </Text>
        </View>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.detailHeading}
          renderItem={this.renderHeading}
          keyExtractor={(item, index) => String(index)}
        />
        <View style={{ backgroundColor: res.color.lightWhite, marginTop: 20 }}>
          <Text style={{ fontFamily: res.font.semiBoldFontpl, margin: 8, fontSize: 25,textAlign:'left' }}>{res.strings.relatedProduct}</Text>
          <FlatList
            style={{ margin: 10 }}
            data={this.state.relatedProducts}
            renderItem={this.RenderRelatedProductComponent}
            keyExtractor={(item, index) => String(index)}
            horizontal
          />
        </View>


      </View>
    );
  }

  changeColor(item) {
    this.setState({
      selectedColorKey: item.XCode,
      selectedColor: item.Descript,
    })
    this.ApiCallSelectedColor()
  }

  renderVarientColor = ({ item }) => {
    const colors = item.Descript
    return (
      <TouchableOpacity onPress={() => { this.changeColor(item) }}>
        <View style={item.XCode === this.state.selectedColorKey ? [{ backgroundColor: colors, borderColor: res.color.blackColor, borderWidth: 2 }, styles.colorAttributeView] : [{ backgroundColor: colors }, styles.colorAttributeView]} />
      </TouchableOpacity>
    );
  }

  exapndTap(item) {
    if (item === res.strings.productDescription) {
      this.setState({
        isExpandDes: !this.state.isExpandDes,
        desExpandHeight: this.state.desExpandHeight == 60 ? null : 60
      })
    }
    else {
      this.setState({
        isExpandDie: !this.state.isExpandDie,
        dieExpandHeight: this.state.dieExpandHeight == 60 ? null : 60
      })
    }
  }
  renderHeading = ({ item }) => {
    const heights = item.title == res.strings.productDescription ? this.state.desExpandHeight : this.state.dieExpandHeight
    return (

      <TouchableOpacity onPress={() => { this.exapndTap(item.title) }}>
        <View style={{ backgroundColor: res.color.whilteColor, height: item.title == res.strings.productDescription ? this.state.desExpandHeight : this.state.dieExpandHeight, width: '100%' }} >
          <View style={{ height: 60, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginLeft: 20, fontFamily: res.font.ragularFont, fontSize: 20, fontFamily: res.font.ragularFont }}> {item.title}</Text>
            {/* <Image style={{marginRight:20}} source={heights == 60 ? res.ImageAssets.downIcon : res.ImageAssets.upIcon} /> */}
            <Icon name={heights == 60 ? 'angle-down' : 'angle-up'} size={20} color={res.color.midGrayColor} style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 20 }} />
          </View>
          <Text style={{ marginRight: 20, marginLeft: 20, fontFamily: res.font.ragularFont, fontFamily: res.font.ragularFont,marginBottom:20 }}> {item.title === res.strings.productDescription ? this.state.dataSource.ProdDescription : this.state.dataSource.Dimension} </Text>
        </View>
      </TouchableOpacity>
    );
  }

  onPressCell(item) {
    this.setState({
      itemId: item.XCode
    });
    this.ApiCalls(item.XCode)


  }

  RenderRelatedProductComponent = ({ item }) => {
    return (
      <View style={{ width: 150, flexDirection: 'column', margin: 8,  borderRadius: 10, marginLeft: 10, }}>
        <TouchableOpacity onPress={() => this.onPressCell(item)}>
          <View style={{
            alignItems: 'center', shadowOpacity: 10.0, shadowColor: res.color.lightGrayColor, shadowRadius: 5,}}>
            <Image style={{ height: 150,width:'100%' }} source={{
              uri: res.api.baseUrlProductImage.concat(
                item.Image1
              ),
            }} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontFamily: res.font.ragularFont }} numberOfLines={1}>{item.XName} </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
             {item.OldPrice !== 0 ?  <Text style={{ textDecorationStyle: 'solid', textDecorationLine: 'line-through', color: res.color.midGrayColor, fontFamily: res.font.ragularFont }}>{item.OldPrice.toFixed(3) + ' ' + item.Currency}</Text> : null}           
            <Text style={{ fontFamily: res.font.ragularFont }}>{item.NewPrice.toFixed(3) + ' ' + item.Currency} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  closeModal() {
    this.setState({
      isCartPopUp: false
    });
    //  this.props.navigation.navigate('Cart')
    this.props.navigation.navigate(
      res.strings.cart,
      { screen: 'Cart' },
    )
  }

  onPressImageShow(item) {
    this.props.navigation.navigate('FullImage', {
      productImg: this.state.banners,
    });
  }






  onScroll = (e) => {
    this.setState({
      progress: e.nativeEvent.contentOffset.x / ((this.state.banners.length - 1) * widthScreen),
    });
  }

  render() {
    return (


      <View style={styles.MainContainer}>
        <Modal style={{ justifyContent: 'flex-end', margin: 0 }} isVisible={this.state.isCartPopUp} coverScreen={false} backdropColor={res.color.blackColor} hasBackdrop={true}   >
          <View style={{ backgroundColor: res.color.whilteColor, flexDirection: 'column', alignItems: 'flex-end', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, alignSelf: 'center' }}>
              <Image source={res.ImageAssets.checkGreen} />
              <Text style={{fontFamily:res.font.ragularFont}}> {res.strings.ItemAddedToYourCart} </Text>
            </View>
            <TouchableOpacity style={styles.blackButtonViewCart} onPress={() => { this.closeModal() }}>
              <Text style={{ color: res.color.whilteColor, fontFamily: res.font.boldFont, fontWeight:'bold' }}> {res.strings.viewCart} </Text>
            </TouchableOpacity>


          </View>
        </Modal>

        <HeaderImageScrollView
          maxHeight={400}
          minHeight={60}
          headerImage={`${res.api.baseUrlProductImage}${this.state.banners[0]}`}
          renderHeader={<View style={{ backgroundColor: 'blue' }} />}
          renderForeground={() => (
            <View style={{width:'100%'}}>
              <FlatList
                data={this.state.banners}
                pagingEnabled={true}
                horizontal
                renderItem={this.renderBannerItem}
                onScroll={this.onScroll}
                keyExtractor={(item, index) => index.toString()}
                
              />
            </View>
          )}
           >
          <View style={{ backgroundColor: res.color.lightWhite }}>
            {this.varientView()}
            {this.ProductView()}
          </View>

        </HeaderImageScrollView>

        {this.bottomButtons()}
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
  closeButtonStyle: { backgroundColor: res.color.whilteColor, width: 40, height: 40, borderRadius: 20, marginRight: 20, justifyContent: 'center' },
  blackButtonBottom: { margin: '5%', width: '40%', alignItems: 'center', backgroundColor: res.color.blackColor, height: 40, alignSelf: 'center', justifyContent: 'center' },
  colorAttributeView: { height: 40, width: 40, margin: 8, justifyContent: 'center', alignSelf: 'center', borderRadius: 20 },
  blackButtonViewCart: { margin: '5%', width: '80%', alignItems: 'center', backgroundColor: res.color.blackColor, height: 40, alignSelf: 'center', justifyContent: 'center', borderRadius: 10 },
});
