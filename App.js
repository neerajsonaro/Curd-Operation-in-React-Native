import React,{Component} from 'react';
import { AppRegistry,Text} from 'react-native';

import {StackNavigator} from 'react-navigation';

import FirstScreen from './FirstScreen';
import Details from './Details';
import Signup from './Signup';
import Login  from  './Login';

const NodepadNavig={
LoginScreen:{screen:Login},	
SignupScreen:{screen:Signup},
Home:{screen:FirstScreen},
Detail:{screen:Details}

}

const MyNavigator=StackNavigator(NodepadNavig);

class App extends Component
{
	render(){
       return(
     <MyNavigator />

       	);
	}
}


export default App;