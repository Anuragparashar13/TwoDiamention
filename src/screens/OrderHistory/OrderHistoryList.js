import React, {Component,Fragment} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,Animated} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Font from '../../res/Font/Font';
import {globalVariables} from '../../Helper/Constant'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DATA = ["red", "blue", "green", "yellow"];



export default class OrderHistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
   this.getOrderHistory()
 
  }

  getOrderHistory()
  {
    var param = {
      StrQuery: `SP_MyAccount 'Get_MyOrder_App','${res.api.baseCountry}','${globalVariables.userId}','','','',${res.api.companyId},${globalVariables.CultureId}`,
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
            dataSource: data.row,
          });
        }
      },
    );
  }

  RenderTableComponent = ({ item }) => {
    return (
    <View style={{width:'100%',alignSelf:'center'}}>  
    <View style={{flexDirection: 'column', margin: 1, width: '100%'}}>
    <TouchableOpacity onPress={() => this.onPressCell(item)} >
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
        <Image style={styles.userImage} source={{ uri: res.api.baseUrlProductImage.concat(
                item.Image1
                )}} />
        <View style={styles.subContainer}>
          <Text style={styles.nameTitleMyAcc} numberOfLines={1}>{item.XName}</Text>
          <Text style={[styles.nameSubTitleMyAcc,{fontFamily:res.font.ragularFont}]}>{item.NewPrice.toFixed(3)} {item.Currency}</Text>
        </View>
        </View>
        <Image style={{height:30,width:30,alignSelf:'center',marginRight:10,marginLeft:10}} source={ImageAssets.infoIcon} />
      </View>
    </TouchableOpacity>
  </View>
  </View>
  );
  };

  onPressCell(item){
    this.props.navigation.navigate('OrderHistoryDetail', {
      itemId: item.TrackId,
      XCode: item.XCode,
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
  paddingTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  quantityButton: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    height: 20,
    width: 40,
  },
  nameTitleMyAcc: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily:res.font.ragularFont,
    justifyContent: 'center',
    paddingBottom: 8,
  },
  userImage: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // width: '70%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor:'white'
  },
  imageThumbnail: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 100,
  },
});
