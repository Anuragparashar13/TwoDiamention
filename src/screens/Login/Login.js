import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import {ProfileEditCell, ProfilePickerEditCell, LoginEditCell} from '../TableCellComponent/ProfileCells';
import res from '../../Helper/index';
import DeviceInfo from 'react-native-device-info';
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import {BackButton} from '../../Helper/Navigation/TabBarController';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncKeys, globalVariables} from '../../Helper/Constant';
import  {
  appleAuth,
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'



export default class Login extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      
      email: '',
      password: '',
      userInfo: {},
      
    };
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


  ApiCallLogin()
  {

    if (this.state.email === '')
    {
      alert( res.strings.emptyEmail)
    }
    else if(this.state.password === ''){
      
      alert( res.strings.emptyPassword)
    }
    else if (!this.validate(this.state.email.trim()))
    {
      alert(res.strings.inValidEmail)
    }
    else
    {
    var param = {
      Password: this.state.password,
      Email: this.state.email,
    };
    new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.UserLogin}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          this.saveData(data.UserDetails.Email,data.UserDetails.FirstName,data.UserDetails.LastName,data.UserDetails.UserID,data.UserDetails.Password,);
           alert(data.Message)
      }
    })
  }
  }

  ApiCallfbLogin(user,type)
  {
    var param = {
      SocialId:user.id,
    };
   new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.UserLogin_Facebook}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          if (data.ResponseCode === '-4')
          {
            if (type === 'AppleId'){
              this.setState({
                firstName: user.first_name ?? '',
                lastName: user.last_name ?? '',
                email: user.email ?? `${user.id}@2d.com`,
                mobile: user.mobile ?? '',  
                password: user.id ?? '',
                type: type,   
              })
              this.ApiCallfbRegister()
            }
            else{
            this.props.navigation.navigate('SignUp',{
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email != null ? user.email : '',
              password: user.id,
              type: type,
              fbUser: user,
          })  
        }

          }
          else
          {
          // this.ApiCallfbRegister()
          this.saveData(data.UserDetails.Email,data.UserDetails.FirstName,data.UserDetails.LastName,data.UserDetails.UserID,data.UserDetails.Password,);
          //  alert(data.Message)
          }
      }
    })
  }

  ApiCallfbRegister()
  {
    var param = {
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Password:this.state.password,
      Email:this.state.email,
      IpAddress: DeviceInfo.getUniqueId(),
      SocialId: this.state.password,
      Social_Description: this.state.type,
    };
    console.log('fb',param)
   new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.UserLoginFromFacebook}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log(data)
          if(data.ResponseCode === '4')
          {
            Toast.show(data.Message)
          }
          else
          {
            this.ApiCallfbLogin(this.state.fbUser,"FacebookId");
            // this.saveData(data.UserDetails.Email ? data.UserDetails.Email : '',data.UserDetails.FirstName,data.UserDetails.LastName,data.UserDetails.UserID,data.UserDetails.Password,);
          }
        }
    })
  }

  saveData = async (email,firstName,lastName,userId,password) => {
    try {
       globalVariables.userId = userId;
       await AsyncStorage.multiSet([['FirstName', firstName],['LastName', lastName],['Password',password],[asyncKeys.keyUserId,`${userId}`],['Email',email]]);
       console.log(globalVariables.userId);
       if (globalVariables.isCheckout === true)
       {
        this.props.navigation.navigate('AddressList', {
          isCheckout: true
        });
       }
       else
       {
       this.props.navigation.navigate('Home');
       }
      // alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
    
  }

  readData = async () => {
    try {
      const userLang = await AsyncStorage.getItem('save_language');
      if (userLang !== null) {
        this.props.navigation.navigate('Home');
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

// fb Login
logoutWithFacebook = () => {
  LoginManager.logOut();
  this.setState({userInfo: {}});
};

getInfoFromToken = token => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id,name,first_name,last_name,email',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    {token, parameters: PROFILE_REQUEST_PARAMS},
    (error, user) => {
      if (error) {
        console.log('login info has error: ' + error);
      } else {
        console.log('result:', user);
        this.ApiCallfbLogin(user,'FacebookId')   
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};

loginWithFacebook = () => {
  // Attempt a login using the Facebook login dialog asking for default permissions.
  LoginManager.logInWithPermissions(['public_profile']).then(
    login => {
      if (login.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          const accessToken = data.accessToken.toString();
          this.getInfoFromToken(accessToken);
        });
      }
    },
    error => {
      console.log('Login fail with error: ' + error);
    },
  );
};

fetchAndUpdateCredentialState = async (updateCredentialStateForUser) => {
  if (user === null) {
    updateCredentialStateForUser('N/A');
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      updateCredentialStateForUser('AUTHORIZED');
    } else {
      updateCredentialStateForUser(credentialState);
    }
  }
}





onAppleButtonPress = async () => {
  console.warn('Beginning Apple Authentication');

  // start a login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
     // get current authentication state for user
  
    console.log('appleAuthRequestResponse', appleAuthRequestResponse);
    if (appleAuthRequestResponse.realUserStatus === 1) {
      console.log("I'm a real person!");
      const user = {first_name:appleAuthRequestResponse.fullName.givenName,last_name:appleAuthRequestResponse.fullName.familyName,email:appleAuthRequestResponse.email,id:appleAuthRequestResponse.user}
      // this.setState({userInfo: {first_name:appleAuthRequestResponse.fullName.givenName,last_name:appleAuthRequestResponse.fullName.familyName,email:appleAuthRequestResponse.email,id:appleAuthRequestResponse.user}});
      
       this.ApiCallfbLogin(user,'AppleId')
    }
  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('User canceled Apple Sign in.');
    } else {
      console.error(error);
    }
  }
}



  render() {
    const isLogin = this.state.userInfo.name;
    const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
    const onPressButton = isLogin
      ? this.logoutWithFacebook
      : this.loginWithFacebook;

    return (
      <SafeAreaView style={{marginTop:Platform.OS === 'android' ? 40:0}}>
        <BackButton isWhite = {false} nav = {this.props.navigation} />
        <ScrollView contentContainerStyle={styles.stage}>
          <KeyboardAvoidingView>
          <Text style={{fontFamily:res.strings.boldFont, fontWeight:'bold', fontSize:24,marginLeft:'5%',marginTop:20,marginRight:'5%',textAlign:'left'}}> {res.strings.SignIn} </Text>  
            <Text style={{fontFamily:res.strings.ragularFont, color:res.color.midGrayColor,marginLeft:'5%',marginTop:8,marginRight:'5%',textAlign:'left'}}> {res.strings.AlreadyHaveAnAccount} </Text>   
            <TableView>
              <Section>
                <LoginEditCell
                  name={res.strings.emailMobileno}
                  type="text"
                  value={this.state.email}
                  onChange={(text) => { 
                    this.setState({
                      email: text.text,
                    });
                  }}
                />
                <LoginEditCell
                  name={res.strings.password}
                  type="text"
                  value={this.state.password}
                  onChange={(text) => {
                    this.setState({
                      password: text.text,
                    });
                  }}
                />
              </Section>
            </TableView>
            <TouchableOpacity style={styles.blackButtonViewCart} onPress={()=>{this.ApiCallLogin()}}>
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.semiBoldFont,fontSize:20}}> {res.strings.SignIn} </Text>
             </TouchableOpacity>
             <TouchableOpacity style={{justifyContent:'center',alignItems:'center', marginTop:0}} onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}>
              <Text style={{color:res.color.blueColor,fontFamily:res.font.ragularFont}}> {res.strings.forgotYourPassword} </Text>
             </TouchableOpacity>
             {Platform.OS === 'ios' ?
            <View>
             <Text style={{color: res.color.midGrayColor,marginLeft:'5%',marginRight:'5%',fontFamily:res.font.ragularFont,marginTop:20,textAlign:'left'}}>{res.strings.signInwithApple}</Text>
             <View style={[styles.blackButtonViewCart,{marginTop:8}]}>
             <AppleButton
                  buttonStyle={AppleButton.Style.BLACK}
                  buttonType={AppleButton.Type.SIGN_IN}
                  style={styles.blackButtonViewCart}
                  onPress={() => {this.onAppleButtonPress()}}
                />
              </View>
              </View>  
              : null
            }

             <Text style={{color: res.color.midGrayColor,marginLeft:'5%',marginRight:'5%',fontFamily:res.font.ragularFont,textAlign:'left'}}>{res.strings.signInwith}</Text>
             <TouchableOpacity style={[styles.blackButtonViewCart,{backgroundColor:res.color.blueColor,marginTop:8}]} onPress={onPressButton}>
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.boldFont,fontWeight:'bold',fontSize:22}}> {res.strings.Facebook} </Text>
             </TouchableOpacity>
             {globalVariables.isCheckout === true ?
             <TouchableOpacity style={[styles.blackButtonViewCart,{backgroundColor:res.color.darkGrayColor}]} onPress={()=>{  this.props.navigation.navigate('AddressAdd')}}>
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.boldFont,fontWeight:'bold',fontSize:22}}> {res.strings.continueAsGuest} </Text>
             </TouchableOpacity> 
             : null }
             <View style={{width:'60%',justifyContent:'center',alignSelf:'center',flexDirection:'row'}}>
                <Text style={{fontFamily:res.font.ragularFont}} >{res.strings.DontHaveAnAccount}</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUp')}}>
                <Text style={{fontFamily:res.font.ragularFont,color:res.color.blueColor}} >{res.strings.SignUp}</Text>
                </TouchableOpacity> 
             </View>
          
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
  blackButtonViewCart: {margin:8,width:'90%',alignItems:'center',backgroundColor:res.color.blackColor,height:45,alignSelf:'center',justifyContent:'center',borderRadius:10},
});
