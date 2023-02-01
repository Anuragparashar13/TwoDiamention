
//https://stackoverflow.com/questions/60633766/change-language-of-whole-react-native-app
import LocalizedStrings from 'react-native-localization';
import english from './en.js';
import arabic from './ar.js';

const strings = new LocalizedStrings({
  en: english,
  ar: arabic,
});
module.exports = strings;

export function changeLaguage(languageKey) {
   strings.setLanguage(languageKey);
  // forceUpdate();
};
