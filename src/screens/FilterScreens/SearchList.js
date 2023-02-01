import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index'
import { globalVariables } from '../../Helper/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const DATA = ["red", "blue", "green", "yellow"];

export default class SearchList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            sortedDataSource:[],
            textSearch: '',
        };
        this.props.navigation.setOptions({
          title: res.strings.searchProduct
       
        })
    }
    componentDidMount(){
      this.getWishlist()
    }

    getWishlist()
  {
    var param = {
      StrQuery: `SP_IndexMST 'Get_WebSearch_List_Apps','${this.state.textSearch}','','','','KW',${res.api.companyId},${globalVariables.CultureId}`,
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

  sortedList(text){
    
   const data = this.state.dataSource.filter(function(item){
      return (item.XName.toLowerCase().includes(text.toLowerCase()));
   }).map(function(item){
       return item;
   });
   
   this.setState({textSearch:text, sortedDataSource: data})

  }

    RenderTableComponent = ({ item }) => {
        return (
          <View style={{flexDirection: 'column', margin: 8, width: '80%'}}>
            <TouchableOpacity onPress={() => this.onPressCell(item)}>
              <View style={styles.container}>
                <Image style={styles.userImage} source={{ uri: res.api.baseUrlProductImage.concat(
                item.Image1
                )}} />
                <View>
                  <Text style={styles.nameTitleMyAcc} >{item.XName}</Text>
                </View>
                      
              </View>
            </TouchableOpacity>
          </View>
      );
      };

      // renderItem =({item}) => {<this.RenderTableComponent item={item}/>};
      rendreBannerItem({item}){
          return <View style={{height:100, width:width, backgroundColor:item,borderColor:'black',borderWidth:2}}/>
      }
      onscroll(e){
          this.setState({progress:e.NativeEvent.contentOffset.x/((DATA.length-1)*width)})
      }

      //cell back
      onPressCell(item){
        this.props.navigation.navigate('ProductDetail', {
            itemId: item.XCode,
           // title: item.title.rendered,
         });
      }
      
      render() {
        return (
          <View style={styles.MainContainer}>
            
            <View style={{backgroundColor: res.color.whilteColor, height:40, margin:20, borderRadius:10, justifyContent:'flex-start',flexDirection:'row',width:'90%'}} onPress={()=>{this.searchClick()}}>
              <Icon name='search' size={20} color={res.color.darkGrayColor} style={{alignSelf:'center',width:40,marginLeft:20}}/>
             
              <TextInput
                style={{fontFamily:res.font.ragularFont,color:res.color.blackColor,alignSelf:'center',width:'80%',textAlign:globalVariables.keyAppLanguageGlobal==='ar'?'right':'left',marginStart:8}}
                value={this.state.textSearch}
                placeholderTextColor={res.color.blueColor}
                onChangeText={(text) => {this.sortedList(text)}}
                />
            </View> 
            <FlatList
              style={{marginLeft:10,marginRight:10,alignSelf:'center',width:'90%'}}
              data={this.state.textSearch == '' ? [] : this.state.sortedDataSource}
              renderItem={this.RenderTableComponent}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      }
}
const styles=StyleSheet.create({
    MainContainer:{
        
        justifyContent:'space-between',
        alignItems:'center',
    },
    imageThumbnail: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 100,
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      subContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // width:'80%'

        
      },
      userImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
       
        marginRight: 20,
        marginLeft: 20,
        justifyContent: 'center',
      },
      nameTitleMyAcc: {
        fontSize: 20,
        fontWeight: '300',
        justifyContent: 'center',
        paddingBottom: 8,
        alignContent:'flex-start',
        overflow:'hidden',
        fontFamily: res.font.ragularFont,
        marginEnd:8,
      },
      quantityButton: {
        borderColor: 'black',
        borderWidth: 1,
        textAlign:'center',
        alignSelf: 'center',
        borderRadius: 5,
        height: '100%',
        width: 80,
      },
});