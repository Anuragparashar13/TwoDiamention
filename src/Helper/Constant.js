


export const asyncKeys = {
  keyAppLanguage: 'save_language',
  keyUserId: 'userId',
};

export class globalVariables {
  static keyAppLanguageGlobal = 'en';
  static userId = 0;
  static UniqueId = '';
  static BuyNow = '';
  static CultureId = 1;
  static goToOnline = -1;
  static isCheckout = false;
}

readData = async () => {
  try {
    globalVariables.keyAppLanguageGlobal = await AsyncStorage.getItem('save_language');
  } catch (e) {
    alert('Failed to fetch the data from storage')
  }

 
}

export default {
  asyncKeys,
  globalVariables,
};
