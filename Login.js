import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,View,Button,} from 'react-native';

import CreateFirebase from './Firebase'

class Login extends Component
{
   constructor(props)
   {
   	super(props);
     
    this.state={
 
        email : '',
        password  : '',
        uid:''
    } ;
   }
   
_onPress=()=>
{
console.log('Login Button Clicked');

this.setState({
      loading: true
    });
  // Log in and display an alert to tell the user what happened.
    CreateFirebase.getInstance()._createFirebase().auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) =>
      {
      console.log('userData',userData.uid);
      this.state.uid=userData.uid;

          // When storing data.
      let myUID = CreateFirebase.getInstance();
      myUID.setUserID(this.state.uid);  

        const {navigate}=this.props.navigation;
        navigate('Home');
      }
    ).catch((error) =>
        {
              this.setState({
              loading: false
              });
        alert('Login Failed. Please try again'+error);
    });
}

_onPressSignup=()=>
{
console.log('Signup Button Clicked');
const {navigate}=this.props.navigation;
navigate('SignupScreen');
}

render()
{
	return(

		<View>

		     <TextInput
         style={{height: 40,borderWidth:1}}
         placeholder="Email"
         onChangeText={(email) => this.setState({email})}
         value={this.state.email}/>

         <TextInput
             style={{height: 40,borderWidth:1,marginTop:30}}
             placeholder='Password'
             secureTextEntry={true}
             onChangeText={(password) => this.setState({password})}
             value={this.state.password}/> 

        <Button onPress={this._onPress} title="Login" color="#841584"/>  
        <Button onPress={this._onPressSignup} title="Signup" color="#841584"/> 
           
     </View>

	     );

}
}

export default Login;