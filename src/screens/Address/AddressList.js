import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import {globalVariables} from '../../Helper/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import {buttonStyles,BackButton} from '../../Helper/Navigation/TabBarController';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DATA = ["red", "blue", "green", "yellow"];



export default class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };

    this.props.navigation.setOptions({
      title: res.strings.AllAddresses,
      headerRight: () => (
        <TouchableOpacity
        style={[buttonStyles.saveButton,{flexDirection:'row'}]}
        onPress={() => this.props.navigation.navigate('AddressAdd', {
          isCheckout: globalVariables.isCheckout
        })}>
          <Icon name='plus' size={20} color={res.color.whilteColor} />
        {/* <Text style={{fontFamily:res.font.boldFont, fontWeight:'bold',color:res.color.whilteColor,fontSize:40,margin: 8,alignSelf:'center'}}>+</Text> */}
        <Text style={{color: res.color.whilteColor, margin: 8,fontFamily:res.font.boldFont}}>
          {res.strings.Add}
        </Text>
      </TouchableOpacity>
      ),
      headerLeft: () => <BackButton nav={this.props.navigation} isWhite={false}/>,
    })
  }


  componentDidMount() {
   
    this.focusListener = this.props.navigation.addListener('focus', () => {
     
      var param = {
        StrQuery: `SP_MyAccount 'Get_UserShippingAddress_Checkout_App',${globalVariables.userId},'','','','',${res.api.companyId},${globalVariables.CultureId}`,
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
              dataSource: data.row,
            });
          }
        },
      );
  });
    
   
  }

  

  RenderTableComponent = ({ item }) => {
    return (
      <View style={{flexDirection: 'column', margin: 1, width: '100%',backgroundColor:res.color.whilteColor,paddingTop:8}}>
        <TouchableOpacity onPress={() => this.onPressCell(item)}>
          <View style={styles.container}>
            <View style={[styles.subContainer,{marginBottom:8}]}>
              <Text style={styles.nameTitleMyAcc}>{item.XCode}</Text>
              <Text style={[styles.nameSubTitleMyAcc,{fontFamily:res.font.ragularFont,color:res.color.midGrayColor}]}>{item.XName}</Text>
            </View>
            <View style={{flexDirection:'row', marginRight: 20, justifyContent: 'center'}}>
            {/* <Image source={res.ImageAssets.favBlack} />  */}
            <Icon name='chevron-right' size={20} color={res.color.midGrayColor} style={{justifyContent:'center',alignSelf:'center'}} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
  );
  };


  addAddress(item) {
    if (globalVariables.isCheckout == true)
    {
      this.props.navigation.navigate('Checkout', {
        addId: item.ShippingAddressId,
       // title: item.title.rendered,
     });
    }
    else
    {
    this.props.navigation.navigate('AddressAdd', {
       itemId: item.ShippingAddressId,
       title: item.XCode,
    });
  }
  }


  //cell Click
  onPressCell(item) {
    if (globalVariables.isCheckout == true)
    {
      this.props.navigation.navigate('Checkout', {
        addId: item.ShippingAddressId,
       // title: item.title.rendered,
     });
    }
    else
    {
    this.props.navigation.navigate('AddressView', {
       itemId: item.ShippingAddressId,
       title: item.XCode,
    });
  }
  }

  RenderTableHeaderComponent ( title ){
    return (
      <View style={styles.headerStyle}>
         <Text style={{margin:10, color:res.color.midGrayColor,fontFamily:res.font.semiBoldFont,textAlign:'left'}}>{title}</Text>
      </View>
  );
  };


  render() {
    return (
      

    <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.RenderTableComponent}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          ListHeaderComponent= {this.RenderTableHeaderComponent(res.strings.AllAddresses)}
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

  imageThumbnail: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 100,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
    width: '80%',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  nameTitleMyAcc: {
    fontSize: 20,
    fontWeight: '300',
    justifyContent: 'center',
    paddingBottom: 8,
    fontFamily: res.font.ragularFont,
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
  
});
