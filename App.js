import React,{Component} from 'react';
import { AppRegistry,Text} from 'react-native';

import {StackNavigator} from 'react-navigation';

import FirstScreen from './FirstScreen';
import Details from './Details';


const NodepadNavig={

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