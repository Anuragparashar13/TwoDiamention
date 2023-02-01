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
import {ProfileEditCell, ProfilePickerEditCell} from '../TableCellComponent/ProfileCells';
import res from '../../Helper/index';
import DeviceInfo from 'react-native-device-info';
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import {globalVariables, asyncKeys} from '../../Helper/Constant';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import Toast from 'react-native-simple-toast';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SignUp extends React.Component
{
  

  
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.route.params ? this.props.route.params.firstName : '',
      lastName: this.props.route.params ? this.props.route.params.lastName : '',
      email:  this.props.route.params ? this.props.route.params.email : '',
      mobile: '',
      password:  this.props.route.params ? this.props.route.params.password : '',
      confirmPassword: '',
      userInfo: {},
      type: this.props.route.params ? this.props.route.params.type : '',
      fbUser: this.props.route.params ? this.props.route.params.fbUser : {},
    };
    this.props.navigation.setOptions({
      title: this.state.type != '' ? res.strings.requiredInfo : res.strings.register,
     
    })
    
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

  ApiCallRegister()
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
    } else if(this.state.email === ''){
      alert( res.strings.emptyEmail)
    } else if (!this.validate(this.state.email.trim())){
      alert(res.strings.inValidEmail)
    }else if(this.state.mobile === ''){
      alert( res.strings.emptyMobile)
    }else if(this.state.mobile.length < 8){
      alert(res.strings.invalidMobile)
    }else if(this.state.password === ''){
      alert( res.strings.emptyPassword)
    }else if(this.state.password.length < 6){
      alert( res.strings.invalidPassword)
    }else if(this.state.confirmPassword === ''){
      alert( res.strings.emptyConfrimPassword)
    }else if(this.state.password != this.state.confirmPassword){
      alert( res.strings.emptyMatchPass)
    }else{
        var param = {
          FirstName: this.state.firstName,
          LastName: this.state.lastName,
          Password: this.state.password,
          Email: this.state.email,
          Mobile: this.state.mobile,
          IpAddress: DeviceInfo.getUniqueId(),
          ConfirmPassword: this.state.confirmPassword,

        };
      new ApiHelper().serviceCallGet(
          param,
          `${res.api.baseUrlCommon}${res.api.SaveUserRegistration}`,
          (data, err) => {
            if (err) {
              alert(err);
            } else {
              if(data.ResponseCode==2)
              {
              console.log(data)
              if (globalVariables.isCheckout == true)
              {
                this.props.navigation.navigate('Login');
              }
              else
              {
              Toast.show(data.Message);
              this.props.navigation.navigate('Home');
              }
              }
              else
              {
                alert(data.Message)
              }
          }
        })
    }
  }

  ApiCallfbLogin(user,type)
  {
    var param = {
      SocialId:user.id,
    };
    console.log(param);
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
            this.setState({
              firstName: user.first_name ?? '',
              lastName: user.last_name ?? '',
              email: user.email ?? '',
              mobile: user.mobile ?? '',  
              password: user.id ?? '',
              type: type,   
            })
          }

          }
          else
          {
          // this.ApiCallfbRegister()
          this.saveData(data.UserDetails.Email ? data.UserDetails.Email : '' ,data.UserDetails.FirstName,data.UserDetails.LastName,data.UserDetails.UserID,data.UserDetails.Password,);
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
  ApiCallfbRegisterWithEmail()
  {
    var param = {
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Password:this.state.password,
      Email:this.state.email,
      IpAddress: DeviceInfo.getUniqueId(),
    };
    console.log('fb',param)
   new ApiHelper().serviceCallGet(
      param,
      `${res.api.baseUrlCommon}${res.api.UserLoginFromFacebook}`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          if (data.ResponseCode === '4')
          {
            // Toast.show(data.Message)
            this.ApiCallfbLogin();
          }
          else
          {
          console.log(data)
          this.ApiCallfbLogin();
          }
        }
    })
  }

  saveData = async (email,firstName,lastName,userId,password) => {
    try {
       globalVariables.userId = userId;
       await AsyncStorage.multiSet([['FirstName', firstName],['LastName', lastName],['Password',password],[asyncKeys.keyUserId,`${userId}`],['Email',email]]);
       console.log(globalVariables.userId);
       if (globalVariables.isCheckout == true)
              {
                // this.props.navigation.navigate('Login');
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
        if (globalVariables.isCheckout == true)
              {
                this.props.navigation.navigate('Login');

              }
              else
              {
              this.props.navigation.navigate('Home');
              }
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
        this.setState({fbUser:user})
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

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    // const {
    //   user: newUser,
    //   email,
    //   nonce,
    //   identityToken,
    //   realUserStatus /* etc */,
    // } = appleAuthRequestResponse;

    // user = newUser;

    // fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
    //   updateCredentialStateForUser(`Error: ${error.code}`),
    // );

    // if (identityToken) {
    //   // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
    //   console.log(nonce, identityToken);
    // } else {
    //   // no token - failed sign-in?
    // }

    if (appleAuthRequestResponse.realUserStatus === 1) {
      const user = {first_name:appleAuthRequestResponse.fullName.givenName,last_name:appleAuthRequestResponse.fullName.familyName,email:appleAuthRequestResponse.email,id:appleAuthRequestResponse.user}
      this.setState({userInfo: user});
      this.ApiCallfbLogin(user,'AppleId')
    }

    console.warn(`Apple Authentication Completed, ${user}, ${email}`);
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
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.stage}>
          <KeyboardAvoidingView>
          <Text style={{color: res.color.midGrayColor,marginLeft:'10%',fontFamily:res.font.ragularFont,marginRight:'10%',textAlign:'left'}}>{res.strings.PleaseFillBelowDetails}</Text>
            <TableView>
              <Section>
                <ProfileEditCell
                  name={res.strings.firstName}
                  type="text"
                  value={this.state.firstName}
                  onChange={(text) => {
                    this.setState({
                      firstName: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={res.strings.lastName}
                  type="text"
                  value={this.state.lastName}
                  onChange={(text) => {
                    this.setState({
                      lastName: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={res.strings.email}
                  type="text"
                  value={this.state.email}
                  onChange={(text) => {
                    this.setState({
                      email: text.text,
                    });
                  }}
                />
                <ProfileEditCell
                  name={res.strings.mobileno}
                  type="text"
                  value={this.state.mobile}
                  onChange={(text) => {
                    this.setState({
                      mobile: text.text,
                    });
                  }}
                />
                {this.state.type != '' ? null :
                <ProfileEditCell
                  name={res.strings.password}
                  type="text"
                  value={this.state.password}
                  onChange={(text) => {
                    this.setState({
                      password: text.text,
                    });
                  }}
                />}
                {this.state.type != '' ? null :
                <ProfileEditCell
                  name={res.strings.confirmPassword}
                  type="text"
                  value={this.state.confirmPassword}
                  onChange={(text) => {
                    this.setState({
                      confirmPassword: text.text,
                    });
                  }}
                />}
  
               
              </Section>
            </TableView>
            <TouchableOpacity style={styles.blackButtonViewCart} onPress={()=>{this.state.type === '' ? this.ApiCallRegister() : this.ApiCallfbRegister()}} >
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.semiBoldFont,fontSize:20}}> {this.state.type != '' ? res.strings.Submit : res.strings.SignUp } </Text>
             </TouchableOpacity>
             
             <View style={{flexDirection: 'row', justifyContent:'space-between',width:'80%',alignSelf:'center',height:30,alignItems:'center'}}>
                 <Text style={{backgroundColor:res.color.darkGrayColor, width:'40%',height:1,fontFamily:res.font.ragularFont}} ></Text>
                 <Text style={{color:res.color.darkGrayColor,fontFamily:res.font.ragularFont}}>{res.strings.or}</Text>
                 <Text style={{backgroundColor:res.color.darkGrayColor, width:'40%',height:1,fontFamily:res.font.ragularFont}}></Text>
             </View> 
             {this.state.type != '' ? null :
             Platform.OS === 'ios' ?
            <View>
             <Text style={{color: res.color.midGrayColor,marginLeft:'10%',marginRight:'10%',fontFamily:res.font.ragularFont}}>{res.strings.signUpwithApple}</Text>
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
             {this.state.type != '' ? null :
             <View>
             <Text style={{color: res.color.midGrayColor,marginLeft:'10%',marginRight:'10%',fontFamily:res.font.ragularFont}}>{res.strings.signUpwith}</Text>
             <TouchableOpacity style={[styles.blackButtonViewCart,{backgroundColor:res.color.blueColor,marginTop:8}]} onPress={onPressButton}>
              <Text style={{color:res.color.whilteColor,fontFamily:res.font.boldFont,fontWeight:'bold',fontSize:22}}> {res.strings.Facebook} </Text>
             </TouchableOpacity>
             </View>}
              
              
             <View style={{width:'60%',justifyContent:'center',alignSelf:'center',flexDirection:'row'}}>
                <Text style={{fontFamily:res.font.ragularFont}} >{res.strings.ByRegisterYouAreAgreeToThe2DApps}</Text>
                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('WebViewComponent', {
      url: `${res.api.baseUrl}${res.api.apiTermsAndCondition}`,
      title: res.strings.TermsAndCondition,
   });
   }} >
                <Text style={{fontFamily:res.font.ragularFont,color:res.color.blueColor}}>{res.strings.TermsAndCondition}</Text>
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
  blackButtonViewCart: {margin:'5%',width:'80%',alignItems:'center',backgroundColor:res.color.blackColor,height:45,alignSelf:'center',justifyContent:'center',borderRadius:10},
});
