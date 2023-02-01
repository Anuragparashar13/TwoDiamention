import strings from '../../res/Translation/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalVariables } from '../../Helper/Constant';

export default {
  // AsyncStorage.getItem('save_language') === 'en'
  
  ragularFont:
     globalVariables.keyAppLanguageGlobal === 'en'
      ? 'OpenSans-Regular'
      : 'Frutiger',
  boldFont:
  globalVariables.keyAppLanguageGlobal === 'en'
      ? 'OpenSans-Bold'
      : 'Frutigerbold',
  semiBoldFont:
  globalVariables.keyAppLanguageGlobal === 'en'
      ? 'OpenSans-SemiBold'
      : 'Frutigerbold',
  ragularFontpl:
  globalVariables.keyAppLanguageGlobal === 'en'
        ? 'PlayfairDisplay-Regular'
        : 'Frutiger',
  boldFontpl:
  globalVariables.keyAppLanguageGlobal === 'en'
        ? 'PlayfairDisplay-Bold'
        : 'Frutigerbold',
  semiBoldFontpl:
  globalVariables.keyAppLanguageGlobal === 'en'
        ? 'PlayfairDisplay-SemiBold'
        : 'Frutigerbold',    
};
