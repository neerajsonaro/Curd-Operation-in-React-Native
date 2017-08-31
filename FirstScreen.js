import React,{Component} from 'react';
import { AppRegistry,Text,View,TextInput,Button,ListView,Alert,TouchableHighlight,} from 'react-native';

var myDataArray=[];
var i;

class FirstScreen extends Component
{
    constructor(props){
       super(props);

    	let data_source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     
        this.state={
            
            text:'',
            i:0,
            description:'',
            dataSource: data_source.cloneWithRows(myDataArray)
     }; 
   }  

  static navigationOptions=({navigation})=>{



   console.log("------------------asdasd---------------");

if (typeof navigation.state.params == "undefined")
{
  console.log('Name not Present'); 
}
else
{
console.log(navigation.state.params.name);
console.log(navigation.state.params.description);
console.log(navigation.state.params.id);

 myDataArray[navigation.state.params.id].name=navigation.state.params.name;
 myDataArray[navigation.state.params.id].description=navigation.state.params.description;

  // let neDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  // this.setState({dataSource: neDataSource.cloneWithRows(myDataArray)});

}


  
  //   console.log(myDataArray[navigation.state.params.datas.id].text);
  //   console.log(myDataArray[navigation.state.params.datas.id].description);

  // let neDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  // this.setState({dataSource: neDataSource.cloneWithRows(myDataArray)});

}

   _onPress=()=> {

    if (!this.state.text.length)
    {
    Alert.alert('Name cannot be Empty');
    } 
    else if (!this.state.description.length) 
    {
      Alert.alert('Description cannot be Empty');
    }
    else 
    {
    myDataArray.push({
   		name: this.state.text,
   		description: this.state.description,
      id:this.state.i,
    });

    this.state.i=this.state.i+1

	let newDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.setState({dataSource: newDataSource.cloneWithRows(myDataArray)});
}
}
  
_onPres=(rowData) => {

  console.log('Row Data =',rowData);
  const {navigate}=this.props.navigation;
  navigate('Detail',{data:rowData});
}

 _onDelete=()=> {
    myDataArray.pop(this.state.text);
	  let newDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.setState({dataSource: newDataSource.cloneWithRows(myDataArray)});
 
}

	render(){
   
       return(

          <View style={{flex:1,paddingTop:20}}>
            
             <TextInput
             style={{height: 40,borderWidth:1}}
             placeholder='Name'
             onChangeText={(text) => this.setState({text})}/>
             
             <TextInput
             style={{height: 100,borderWidth:1,marginTop :20}}
             placeholder='description'
             onChangeText={(description) => this.setState({description})}/>

            <Button onPress={this._onPress} title="Add" color="#841584"/>

            <Button onPress={this._onDelete} title="Delete" color="#841584"/>

           	<ListView

        		dataSource={this.state.dataSource}
        		renderRow = {(rowData) =>
        
            <TouchableHighlight
            onPress={() => this._onPres(rowData)}>

        			 <View style={{flex: 1,flexDirection: 'column',marginTop:20}}>
                     	<Text style={{marginTop:10}}> Name: {rowData.name}</Text>
                     	<Text style={{marginTop:10}}>Description: {rowData.description}</Text>
        			 </View> 

           </TouchableHighlight>
           }/> 
    
          </View>
        );
   	}
}

export default FirstScreen;