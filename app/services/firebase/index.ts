import firebase from "@react-native-firebase/app"

// modules
import "@react-native-firebase/auth"
import "@react-native-firebase/firestore"

export const getUserApp = () => {
  if(firebase.apps.length == 2){
    return firebase.apps.find(({name})=> name === 'userApp');
  }
  // http://bit.ly/37T735T
  return firebase.initializeApp(
    {
      apiKey: "AIzaSyDxJyH3p-BGZLMRuAolSA1HssGjgYaMZVw",
      authDomain: "xpensesuser.firebaseapp.com",
      databaseURL: "https://xpensesuser.firebaseio.com",
      projectId: "xpensesuser",
      storageBucket: "xpensesuser.appspot.com",
      messagingSenderId: "744982073995",
      appId: "1:744982073995:web:cc5eff54d1bfebee04ba8e",
    },
    "userApp",
  )
}
export { firebase }
export const auth = firebase.auth()
export const firestore = firebase.firestore()
