
import React,{Component} from 'react';
import {AppRegistry,Text,View,TextInput,Button,} from 'react-native';


class Details extends Component
{

constructor(props)
{
  super(props);

  this.state = {
   text: this.props.navigation.state.params.data.name,
   description:this.props.navigation.state.params.data.description,
  }
}


_onPress=()=> {

   const {navigate}=this.props.navigation;
   navigate('Home',{name:this.state.text,description: this.state.description,id:this.props.navigation.state.params.data.id});
}


render(){

 

  	return(

    	<View style={{flex:1,paddingTop:20}}>
            
             <TextInput
             style={{height: 40,borderWidth:1}}
             placeholder='Name'
             onChangeText={(text) => this.setState({text})}
             value={this.state.text}/>
             
             <TextInput
             style={{height: 100,borderWidth:1,marginTop :20}}
             placeholder='description'
             onChangeText={(description) => this.setState({description})}
             value={this.state.description}/>

             <Button onPress={this._onPress} title="Save" color="#841584"/>

       </View>         

     	);
}
}

export default Details;