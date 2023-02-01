//https://fontawesome.com/icons?d=gallery&q=radio&m=free
import React, {Component, useCallback, useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,SafeAreaView, Slider,KeyboardAvoidingView, Platform} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {buttonStyles} from '../../Helper/Navigation/TabBarController';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index';
import {RangeSlider} from '../../Helper/SliderClass/RangeSlider';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {ProfileEditCell, ProfilePickerEditCell,PromoCodeCell} from '../TableCellComponent/ProfileCells';
import DeviceInfo from 'react-native-device-info';
import ApiHelper from '../../Helper/ApiHelper/ApiHelper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';


import Thumb from '../../component/sliderComponent/Thumb';
import Rail from '../../component/sliderComponent/Rail';
import RailSelected from '../../component/sliderComponent/RailSelected';
import { ScrollView } from 'react-native-gesture-handler';
import { globalVariables } from '../../Helper/Constant';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('window').width;
const DATA = ["red", "blue", "green", "yellow"];

export default class Checkout extends React.Component
{
 constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      itemList: [],
      paymentMode: [],
      selectedPaymentMode:'',
      isPromoPopUp: false,
      promocode: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      countryCode:'',
      selectedAddress: this.props.route.params.addId
    };
    this.props.navigation.setOptions({
      title: res.strings.Checkout,
      headerRight: () => (
       <TouchableOpacity
       style={buttonStyles.saveButton}
       onPress={() => {this.ApiCallProceedCheckout()}}>
       <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.ragularFont}}>
         {res.strings.proceed}
       </Text>
     </TouchableOpacity>
      ),
    })
  }

  componentDidMount() {
    if (globalVariables.userId != 0)
    {
    this.getuserDetail()
    }
    this.getcheckout()
    this.ApiCallGetcartList()
    this.ApiCallGetcheckoutList()
    
  }

  getuserDetail(){
    var param = {
      StrQuery: `SP_MyAccount 'Get_UserDetails','',${globalVariables.userId},'','','',${res.api.companyId},${globalVariables.CultureId}`,
    };
    console.log(param)
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            firstName: data.row[0].FirstName,
            lastName: data.row[0].LastName,
            email: data.row[0].Email,
            mobile: data.row[0].MobileNo,
            countryCode: data.row[0].Country
          });
        }
      },
    );
  }

  ApiCallGetcartList()
  {
    var param = {
      WebCountryCode: 'Kw',
      UserID: globalVariables.userId,
      CultureId: globalVariables.CultureId,
      UniqueId: globalVariables.UniqueId,
      IpAddress: DeviceInfo.getUniqueId(),
      // Id: this.props.route.params.itemId
      BuyNow: globalVariables.BuyNow
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
            // dataSource: data.row[0],
            itemList: data.row[0].CartItemsList,
          });
      }
    })
  }

  ApiCallGetcheckoutList()
  {
    var param = {
      WebCountryCode: 'KW',
      UserID: globalVariables.userId,
      CultureId: globalVariables.CultureId,
      UniqueId: globalVariables.UniqueId,
      IpAddress: DeviceInfo.getUniqueId(),
      // Id: this.props.route.params.itemId
      BuyNow: globalVariables.BuyNow,
      CompanyId: res.api.companyId,
      City: this.state.selectedAddress
    };
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.Get_Checkout_OrderDetails}`,
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

  ApiCallApplyPromoCode()
  {
    var param = {
      WebCountryCode: 'KW',
      UserID: globalVariables.userId,
      CultureId: globalVariables.CultureId,
      UniqueId: globalVariables.UniqueId,
      IpAddress: DeviceInfo.getUniqueId(),
      PromoCode: this.state.promocode,
      CompanyId: res.api.companyId
      // Id: this.props.route.params.itemId
    };
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.Apply_promoCode}`,
      (data, err) => {

        if (err) {
          alert(err);
          Toast.show(err);
          this.openCloseModal()
        } else {
          console.log('Anurag Data Comes',data)
          Toast.show(data.message);
          this.openCloseModal()
         this.ApiCallGetcheckoutList()
      }
    })
  }

  getcheckout()
  {
    var param = {
      StrQuery: `SP_CheckoutMST 'Get_PaymentMode_List','${DeviceInfo.getUniqueId()}','${globalVariables.UniqueId}','','',${globalVariables.CultureId},'${res.api.companyId}','${globalVariables.userId}'`,
    };
    console.log(param)
    new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.urlForSp}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.setState({
            paymentMode: data.row,
            selectPaymentMode: data.row[0].XCode,
          });
        }
      },
    );
  }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      
      alert(res.strings.inValidEmail)
      return false;
    }
    else {
      return true;
    }
  }

  validateName = (text) => {
    console.log(text);
    let reg = /^[0-9\b]+$/;
    if (reg.test(text) === true) {
      console.log("Email is Not Correct");
      
      // alert(res.strings.inValidEmail)
      return false;
    }
    else {
      return true;
    }
  }

  ApiCallProceedCheckout()
  {
    if(this.state.firstName === '')
    {
      alert( res.strings.emptyFirstName)
    }else if (!this.validateName(this.state.firstName.trim())){
      alert(res.strings.invalidFirstname)
    }else if(this.state.lastName === ''){
      alert( res.strings.emptyLastName)
    }else if (!this.validateName(this.state.lastName.trim())){
      alert(res.strings.invalidLastname)
    }
    else if(this.state.email == '')
    {
      alert(res.strings.emptyEmail)
    }
    else if (!this.validate(this.state.email.trim())){
      alert(res.strings.inValidEmail)
    }
    else if(this.state.mobile == '')
    {
      alert(res.strings.emptyMobile)
    }
    else if(this.state.mobile.length < 8)
    {
      alert(res.strings.invalidMobile)
    }
    else
    {
    var param = {
      ShippingAddressId: this.state.selectedAddress,
      PaymentMode: this.state.selectPaymentMode,
      CountryCode:this.state.countryCode ? this.state.countryCode : 'KW',
      BuyNow: globalVariables.BuyNow,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Email: this.state.email,
      MobileNo: this.state.mobile,
      Source: Platform.OS,
      Corpcentreby: '2',
      IpAddress: DeviceInfo.getUniqueId(),
      UserId: globalVariables.userId,
      WebCountryCode: 'KW',
      CultureId: globalVariables.CultureId,
      UniqueId: globalVariables.UniqueId,
      
      // Id: this.props.route.params.itemId
    };
    console.log(param)
   new res.ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.Save_Checkout}`,
      (data, err) => {
        if (err) {
          alert(err);
          globalVariables.BuyNow = ''
        } else {
          console.log(data)
          globalVariables.BuyNow = ''
          this.props.navigation.navigate('WebViewComponent', {
            url: data.RedirectUrl ,
            title: ''
          });
         
      }
    })
  }
  }

  RenderTableComponent = ({ item }) => {
    return (
      <View style={{flexDirection: 'column', margin: 1, width: '100%'}}>
        <TouchableOpacity onPress={() => this.onPressCell(item)}>
          <View style={styles.container}>
            <Image style={styles.userImage} source={ImageAssets.cartSelected} />
            <View style={styles.subContainer}>
              <Text style={styles.nameTitleMyAcc}>product name</Text>
              <Text style={[styles.nameSubTitleMyAcc,{fontFamily:res.font.ragularFont}]}>price</Text>
            </View>
            <View style={{flexDirection:'row', marginRight: 20, justifyContent: 'center'}}>
            <Text style={styles.quantityButton}>Shop Now</Text>     
            </View>        
          </View>
        </TouchableOpacity>
      </View>
  );
  };

  RenderTableComponent = ({item}) => {
    return (
      <View style={{flexDirection: 'column', margin: 1, width: '100%'}}>
        <TouchableOpacity onPress={() => this.onPressCell(item)}>
          <View style={styles.container}>
            <Image style={styles.userImage} source={{ uri: res.api.baseUrlProductImage.concat(
                item.Image1
                )}} />
            <View style={styles.subContainer}>
              <Text style={styles.nameTitleMyAcc} numberOfLines={1}>{item.XName}</Text>
              <Text style={[styles.nameSubTitleMyAcc,{fontFamily:res.font.ragularFont,}]}>{item.NewPrice.toFixed(3)} {item.Currency}</Text>
            </View>

            <View style={{flexDirection:'row', marginRight: 20, justifyContent: 'center',alignItems:'center'}}>
            
              <Text style={{fontFamily:res.font.ragularFont}}>{res.strings.QTY} {item.Quantity}</Text>
             
            </View>
           
          </View>
        </TouchableOpacity>
      </View>
  );
  };


  RenderPaymentOptionComponent = ({ item }) => {
    return (
      <View style={{flexDirection: 'column', margin: 1, width: '100%',height:40}}>
        <TouchableOpacity onPress={() => this.selectPaymentMode(item)} style={{backgroundColor:res.color.whilteColor,height:'100%'}}>
          <View style={{flexDirection:'row',alignItems:'center',marginLeft:20,height:'100%'}}>
            <Icon name= {this.state.selectPaymentMode === item.XCode ? 'dot-circle-o' : 'circle-o'} size={20} color={res.color.blackColor} style={{justifyContent:'center',alignSelf:'center'}} />
            <Text style={{fontFamily:res.font.ragularFont,marginLeft:10}}>{item.XName}</Text>       
          </View>
        </TouchableOpacity>
      </View>
  );
  };

  RenderTableHeaderComponent ( title ){
    return (
      <View style={styles.headerStyle}>
         <Text style={{margin:10, color:res.color.darkGrayColor,fontFamily:res.font.semiBoldFont}}>{title}</Text>
      </View>
  );
  };
  RenderPromoPopup ( )
  {
    return(
      <KeyboardAvoidingView      
       behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={{backgroundColor:res.color.whilteColor, flexDirection: 'column',alignItems:'flex-end',borderTopRightRadius:10,borderTopLeftRadius:10 }}>
          
            <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:20,alignSelf:'center'}}>  
              <Text style={{fontFamily:res.font.ragularFont}}> {res.strings.PromoCode} </Text>
              <TouchableOpacity onPress={()=>{this.openCloseModal()}}> 
              <Image source={res.ImageAssets.closeIcon} />
              </TouchableOpacity>
            </View>  
            <View style={{width:'100%',borderTopColor:res.color.darkGrayColor,borderBottomColor:res.color.darkGrayColor,borderTopWidth:1,borderBottomWidth:1,marginTop:20}}>
            <PromoCodeCell
                  name={strings.EnterPromocodeHere}
                  type="text"
                  value={this.state.promocode}
                  onChange={(text) => {
                    this.setState({
                      promocode: text.text,
                    });
                  }}
                />  
            </View>    
            <TouchableOpacity style={styles.blackButtonViewCart} onPress={()=>{this.ApiCallApplyPromoCode()}}>
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.semiBoldFont}}> {res.strings.RedeemCode} </Text>
             </TouchableOpacity> 
          </View>
     </KeyboardAvoidingView>
    )
  }

  

  openCloseModal()
{
  this.setState({
    isPromoPopUp: !this.state.isPromoPopUp,
  })
}  
selectPaymentMode(item)
{
  console.log('------------------------',item)
  this.setState({
    selectPaymentMode: item.XCode,
  })
}  
  
// onPress={this.props.closeModal()}
  render() {
    return (
      <View>
        <Modal style={{justifyContent: 'flex-end',margin:0}} isVisible={this.state.isPromoPopUp} coverScreen={false}  backdropColor={res.color.blackColor} hasBackdrop={true} swipeDirection= {['down']}  onSwipeStart={this.closeModal}   >
           {this.RenderPromoPopup()}
        </Modal>
        
        <ScrollView >
          
         <View style= {{justifyContent:'space-between',height:'100%'}}> 
          <View >
          {this.RenderTableHeaderComponent(res.strings.BillingDetails)}
          <ProfileEditCell
                  name={strings.firstName}
                  type="text"
                  value={this.state.firstName}
                  onChange={(text) => {
                    this.setState({
                      firstName: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.lastName}
                  type="text"
                  value={this.state.lastName}
                  onChange={(text) => {
                    this.setState({
                      lastName: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.email}
                  type="text"
                  value={this.state.email}
                  onChange={(text) => {
                    this.setState({
                      email: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={strings.mobileno}
                  type="text"
                  value={this.state.mobile}
                  onChange={(text) => {
                    this.setState({
                      mobile: text.text,
                    });
                  }}
                />
          </View>  

          <FlatList
          data={this.state.itemList}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          ListHeaderComponent= {this.RenderTableHeaderComponent(res.strings.orderDetails)}
          scrollEnabled={false}
        />

          <View style={{alignItems:'center',justifyContent:'center'}} >
            <TouchableOpacity style={{width:'80%',backgroundColor:res.color.whilteColor,borderRadius:10,height:50,alignItems:'center',justifyContent:'center',marginTop:20,marginBottom:20}} onPress={()=>{this.openCloseModal()}}>
              <Text style={{color:res.color.blueColor,fontWeight:'500',fontFamily:res.font.ragularFont}}> {res.strings.RedeemPromotion} </Text>
            </TouchableOpacity>   
          </View>  

          <FlatList
          data={this.state.paymentMode}
          renderItem={this.RenderPaymentOptionComponent}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          ListHeaderComponent= {this.RenderTableHeaderComponent(res.strings.paymentMode)}
          scrollEnabled={false}
        />
        <View style={{width:'100%',marginBottom:8}}>
          <Image source={res.ImageAssets.cardsIcon}  style={{alignSelf:'flex-end',justifyContent:'space-between',resizeMode:'contain',margin:10}} />
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
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:4,borderTopColor:res.color.lightGrayColor,borderEndColor:res.color.lightGrayColor,borderTopWidth:1,borderBottomWidth:1}}>
            <Text style={[styles.Totalstyle]}> {res.strings.grandTotal}</Text>
            <Text style={[styles.Totalstyle]}> {this.state.dataSource.GrandTotal ? this.state.dataSource.GrandTotal.toFixed(3) : '0.000'} {res.strings.kd}</Text>
          </View> 

        </View>
        

        </View>
       </ScrollView> 
       </View>
    );
  }
}








const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
    height: '100%',
    justifyContent: 'space-between',
    width:'100%'
  },
  subTotal:{fontFamily:res.font.ragularFont,color:res.color.darkGrayColor},
  Totalstyle:{fontFamily:res.font.boldFont,color:res.color.blackColor,paddingTop:10,paddingBottom:10},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '50%',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
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
    textAlign:'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
    width: 80,
  },
  blackButtonViewCart: {margin:'5%',width:'80%',alignItems:'center',backgroundColor:res.color.blackColor,height:40,alignSelf:'center',justifyContent:'center',borderRadius:10},
});
