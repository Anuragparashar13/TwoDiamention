import React, {Component, useCallback, useState} from 'react';
import {View, Text, Button, StyleSheet,SectionList,FlatList,Image,StatusBar,ImageBackground,Dimensions,TouchableOpacity,SafeAreaView, Slider} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import strings from '../../res/Translation/strings';
import {ListItem,Avatar, SearchBar} from 'react-native-elements'
import ImageAssets from '../../Helper/ImageAssets';
import res from '../../Helper/index';
import {RangeSlider} from '../../Helper/SliderClass/RangeSlider';


import ApiHelper from '../../Helper/ApiHelper/ApiHelper'




import Thumb from '../../component/sliderComponent/Thumb';
import Rail from '../../component/sliderComponent/Rail';
import RailSelected from '../../component/sliderComponent/RailSelected';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const DATA = ["red", "blue", "green", "yellow"];

export default class Filter extends React.Component
{
 
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      arrSortedBy:[],
      arrBrand:[],
      arrCate: [],
      arrSubCate: [],
      rangeSliderVal: [],
      progress: Number,
      arrySelectedCat:[],
      arrySelectedSubCategory:[],
      arrySelectedBrand: [],
      priceSelectedMin: '',
      priceSelectedMax: '',
      sortSelectedBy: ''
    };
     this.closeModel = this.closeModel.bind(this);
    // alert(this.props.route.params.itemId);
  }

  componentDidMount() {
    
   this.filterApiCall()
  }

  filterApiCall()
  {
    var param = this.props.param;
   new ApiHelper().serviceCallGet(
      param,
      this.props.Api,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          
          console.log(data)
          this.setState({
            arrSortedBy: data.row.Product_SortBy_List,
            arrBrand: data.row.Product_Brand_List,
            arrCate: data.row.Product_Category_List_New,
            priceSelectedMin: this.props.minPrice,
            priceSelectedMax: this.props.maxPrice,
          });
      }
    })
  }


  RenderSortTableComponent = ({ item }) => {
    return (
      <View style={{flexDirection: 'column', marginTop: 8, marginBottom:2, width: '100%',justifyContent:'center'}}>
        <TouchableOpacity onPress={() => this.onPressCellSort(item)}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text style={styles.nameTitleMyAcc}>{item.XName}</Text>
            </View>
            <View style={{flexDirection:'row', marginRight: 20, justifyContent: 'center'}}>
              <Image source={ this.state.sortSelectedBy === item.XCode ? res.ImageAssets.tickIcon : null} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{backgroundColor:res.color.lightGrayColor,height:1,marginLeft:20,marginRight:20}} />
      </View>
  );
  };

  RenderCatTableComponent = ({ item }) => {
    return (
      <View style={{flexDirection: 'column', marginTop: 8, marginBottom:2, width: '100%',justifyContent:'center'}}>
        <TouchableOpacity onPress={() => this.onPressCellCat(item)}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text style={item.XMaster==='Category' ? [styles.nameTitleMyAcc,{fontWeight:'600',fontFamily:res.font.semiBoldFont}] : styles.nameTitleMyAcc}>{item.XName}</Text>
            </View>
            <View style={{flexDirection:'row', marginRight: 20, justifyContent: 'center'}}>
              <Image source={ item.IsSelected === true ? res.ImageAssets.tickIcon : ''} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{backgroundColor:res.color.lightGrayColor,height:1,marginLeft:20,marginRight:20}} />
      </View>
  );
  };
  RenderSubCatTableComponent = ({ item }) => {
    return (
      <View style={{flexDirection: 'column', marginTop: 8, marginBottom:2, width: '100%',justifyContent:'center'}}>
        <TouchableOpacity onPress={() => this.onPressCellSubCat(item)}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text style={styles.nameTitleMyAcc}>{item.XName}</Text>
            </View>
            <View style={{flexDirection:'row', marginRight: 20, justifyContent: 'center'}}>
              <Image source={ item.IsSelected === true ? res.ImageAssets.tickIcon : ''} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{backgroundColor:res.color.lightGrayColor,height:1,marginLeft:20,marginRight:20}} />
      </View>
  );
  };
  RenderBrandTableComponent = ({ item }) => {
    return (
      <View style={{flexDirection: 'column', marginTop: 8, marginBottom:2, width: '100%',justifyContent:'center'}}>
        <TouchableOpacity onPress={() => this.onPressCellBrand(item)}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text style={styles.nameTitleMyAcc}>{item.XName}</Text>
            </View>
            <View style={{flexDirection:'row', marginRight: 20, justifyContent: 'center'}}>
              <Image source={ item.IsSelected === true ? res.ImageAssets.tickIcon : ''} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{backgroundColor:res.color.lightGrayColor,height:1,marginLeft:20,marginRight:20}} />
      </View>
  );
  };



  RenderTableHeaderComponent ( title ){
    return (
      <View style={title===res.strings.filterBy ? [styles.headerStyle,{backgroundColor:res.color.lightWhite}] : styles.headerStyle}>
         <Text style={{margin:10, color:res.color.blackColor,fontFamily:res.font.semiBoldFont,alignSelf:'stretch'}}>{title}</Text>
      </View>
  );
  };


  childFunction=(e)=>{
    e.preventDefault();
    this.props.functionCallFromParent(this.state.arrySelectedBrand,this.state.arrySelectedCat,this.state.arrySelectedSubCategory,this.state.priceSelectedMin,this.state.priceSelectedMax,this.state.sortSelectedBy);
}

resetFunction=(e)=>{

  this.setState({
    arrySelectedCat:[],
    arrySelectedSubCategory:[],
    arrySelectedBrand: [],
    priceSelectedMin: this.props.minPrice,
    priceSelectedMax: this.props.maxPrice,
    sortSelectedBy: ''
  })
    
  e.preventDefault();
  this.props.functionCallFromParent(this.state.arrySelectedBrand,this.state.arrySelectedCat,this.state.arrySelectedSubCategory,this.state.priceSelectedMin,this.state.priceSelectedMax,this.state.sortSelectedBy);
}

 


  //cell Click
  onPressCellSort(item) {
    this.setState({
      sortSelectedBy: item.XCode
    })
  }

  removecate(e) {
    this.setState({people: this.state.arrySelectedCat.filter(function(cat) { 
        return cat !== e.XCode 
    })});
}

  onPressCellCat(item) {
    if (item.IsSelected == true)
    {
      item.IsSelected = false
      this.setState({arrySelectedCat: this.state.arrySelectedCat.filter(function(cat) { 
        return cat !== item.XCode 
    })});
     
    }
    else
    {
      item.IsSelected = true
      this.setState({
        arrySelectedCat: [...this.state.arrySelectedCat, item.XCode]
      })
    }
   
  }
  onPressCellSubCat(item) {
    if (item.IsSelected == true)
    {
      item.IsSelected = false
      this.setState({arrySelectedSubCategory: this.state.arrySelectedSubCategory.filter(function(cat) { 
        return cat !== item.XCode 
    })});
      
    }
    else
    {
      item.IsSelected = true
      this.setState({
        arrySelectedSubCategory: [...this.state.arrySelectedSubCategory, item.XCode]
      })
     
    }
  
  }
  onPressCellBrand(item) {
    if (item.IsSelected == true)
    {
      item.IsSelected = false
      this.setState({arrySelectedBrand: this.state.arrySelectedBrand.filter(function(cat) { 
        return cat !== item.XCode 
    })});
    }
    else
    {
      item.IsSelected = true
      this.setState({
        arrySelectedBrand: [...this.state.arrySelectedBrand, item.XCode]
      })
    }
  }


closeModel = () => {   
  this.props.changeState;
}


  
// onPress={this.props.closeModal()}
  render() {
    return (
      <SafeAreaView>
      <View style={styles.MainContainer}>
      <View style={{flexDirection:'row',width:'100%',height:50,justifyContent:'center',alignItems:'center', backgroundColor:res.color.whilteColor,borderTopLeftRadius:20, borderTopRightRadius:20}}>
              <Text style={{marginLeft:20,alignItems:'flex-start',width:'80%',fontFamily:res.font.ragularFont,fontSize:24,textAlign:'left' }}>{res.strings.filterAndSort}</Text>
              <TouchableOpacity style={{marginRight:20}} onPress={this.resetFunction.bind(this)}  >
              <Image source={res.ImageAssets.closeIcon}  />
              </TouchableOpacity> 
        </View>  
        
        <ScrollView style={{height:'100%',width:'100%'}}>
         <View> 
        <FlatList
          style={{width:width}}
          data={this.state.arrSortedBy}
          renderItem={this.RenderSortTableComponent}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent= {this.RenderTableHeaderComponent(res.strings.SortedBy)}
          scrollEnabled={false}
        />
        {/* <RangeSlider /> */}
          <View style={{alignItems:'center',justifyContent:'center'}}>
            {this.RenderTableHeaderComponent(res.strings.filterBy)}
            <View style={{width:'100%'}}>
                    <Text style={{paddingTop:20,paddingLeft:20,paddingRight:20,fontFamily:res.font.semiBoldFont}}> {res.strings.priceRange}  </Text>  
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                       <Text style={{fontFamily:res.font.semiBoldFont,paddingLeft:50}}> 
                       {this.state.priceSelectedMin} {res.strings.kd}
                        </Text>
                        <Text style={{fontFamily:res.font.semiBoldFont,paddingRight:50}}> 
                           {this.state.priceSelectedMax} {res.strings.kd}
                        </Text>   

                    </ View>    
            </View>
            <RangeSlider 
                  minVal = {this.props.minPrice}
                  maxVal = {this.props.maxPrice}
                  step = '10'
                  onChange={(value) => {  
                    this.setState({
                      rangeSliderVal: value,
                      priceSelectedMin: value[0],
                      priceSelectedMax: value[1],
                    });
                  }}/>
              </View>
                  <FlatList
                        style={{width:width}}
                        data={this.state.arrBrand}
                        renderItem={this.RenderBrandTableComponent}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent= {this.RenderTableHeaderComponent(res.strings.Brand)}
                        numColumns={1}
                        scrollEnabled={false}
                      />                    

                  <FlatList
                        style={{width:width}}
                        data={this.state.arrCate}
                        renderItem={this.RenderCatTableComponent}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent= {this.RenderTableHeaderComponent(res.strings.CateAndSubCate)}
                        numColumns={1}
                        scrollEnabled={false}
                      /> 
          </View>            
        </ScrollView>
        
        <View style={{flexDirection:'row',height:80,justifyContent:'center',alignItems:'center',borderColor:res.color.midGrayColor,borderWidth:1}}>
          <TouchableOpacity style={{margin:'5%',width:'40%',alignItems:'center',borderColor:res.color.midGrayColor,borderWidth:1,height:40,justifyContent:'center',alignSelf:'center',borderRadius:5}} onPress={this.childFunction.bind(this)}>
            <Text style={{fontFamily:res.font.ragularFont}}> {res.strings.Reset} </Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={this.childFunction.bind(this)} style={{margin:'5%',width:'40%',alignItems:'center',backgroundColor:res.color.blackColor,height:40,alignSelf:'center',justifyContent:'center',borderRadius:5}}>
            <Text style={{color:res.color.whilteColor,fontFamily:res.font.semiBoldFont}}> {res.strings.Apply} </Text>
          </TouchableOpacity>  
        </View>  


      </View>
      </SafeAreaView>
    );
  }
}








const styles = StyleSheet.create({
  MainContainer: {
    
    justifyContent: 'space-between',
    alignItems: 'center',
    
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
    width: '80%',
    marginLeft: 20,
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
    
    fontWeight: '300',
    justifyContent: 'center',
    paddingBottom: 8,
    fontFamily: res.font.ragularFont,
    color: res.color.darkGrayColor
  },
  quantityButton: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    height: 20,
    width: 40,
  },
  headerStyle: {justifyContent:'center',flexDirection: 'column', height: 50, width: '100%', borderTopColor:res.color.lightGrayColor, borderTopWidth:2,borderBottomColor:res.color.lightGrayColor, borderBottomWidth:2}
});
