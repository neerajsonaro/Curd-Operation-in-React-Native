import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,View,Button,  ActivityIndicator,Alert,} from 'react-native';

import CreateFirebase from './Firebase'


class Signup extends Component
{
  constructor(props)
   {
   	super(props);
     
    this.state={
      
        Email : '',
        Password  : ''
    } ;
   }
   
_onPress=()=>
 {
      console.log('Signup Button Clicked');

      this.setState({
      // When waiting for the firebase server show the loading indicator.
      loading: true
    });

    // Make a call to firebase to create a new user.
      CreateFirebase.getInstance()._createFirebase().auth().createUserWithEmailAndPassword(
      this.state.Email,
      this.state.Password).then(() => {
        // then and catch are methods that we call on the Promise returned from
        // createUserWithEmailAndPassword
        alert('Your account was created!');
        this.setState({
          // Clear out the fields when the user logs in and hide the progress indicator.
          Email : '',
          Password: '',
          loading: false
        });
     }).catch((error) => {
      // Leave the fields filled when an error occurs and hide the progress indicator.
      this.setState({
        loading: false
      });

      alert("Account creation failed: " + error.message );
      
    });
}

render()
{
	return(

	<View>

		<TextInput
         style={{height: 40,borderWidth:1,marginTop:30}}
         placeholder="Email"
         onChangeText={(Email) => this.setState({Email})}
         value={this.state.Email}/>

        <TextInput
             style={{height: 40,borderWidth:1,marginTop:30}}
             placeholder='Password'
             secureTextEntry={true}
             onChangeText={(Password) => this.setState({Password})}
             value={this.state.Password}/> 

        <Button onPress={this._onPress} title="Signup" color="#841584"/>  
      
    </View>

	);
}
}

export default Signup;