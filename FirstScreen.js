import React,{Component} from 'react';
import { AppRegistry,Text,View,TextInput,Button,ListView,Alert,TouchableHighlight,} from 'react-native';
import CreateFirebase from './Firebase';
var myDataArray=[];
var i;
var dataArray=[];
var tempArray=[];
class FirstScreen extends Component
{
    constructor(props){
       super(props);

     let data_source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

     // When retrieving stored data.
     let commonData = CreateFirebase.getInstance();
     let userId = commonData.getUserID();
     console.log(userId);

        this.state={
            userIds :'',
            text:'',
            i:0,
            description:'',
            dataSource: data_source.cloneWithRows(dataArray)
     };
   }

componentDidMount(){
    // start listening for firebase updates
    this.listenForTasks();
}

//listener to get data from firebase and update listview accordingly
  listenForTasks() {

  var ref = "users/"+CreateFirebase.getInstance().getUserID();

  CreateFirebase.getInstance()._createFirebase().database().ref(ref).on('value', (snap) => {

        // get children as an array
        console.log(snap.val());
        if (snap.val() == null) {

        }
        else {
          dataArray = snap.val().dataArray.map(function(data){

            data['dataId'] = snap.val().dataArray.indexOf(data);

            return data;
          });
          console.log("===============",dataArray);
        }

        this.setState({
          i:dataArray.length,
          dataSource: this.state.dataSource.cloneWithRows(dataArray)
      });
    });
}

  static navigationOptions=({navigation})=>{

  console.log("------------------asdasd---------------");

if (typeof navigation.state.params == "undefined")
{
  console.log('Name not Present');
}
else
{
 dataArray[navigation.state.params.id].name=navigation.state.params.name;
 dataArray[navigation.state.params.id].description=navigation.state.params.description;


 var ref = "users/"+CreateFirebase.getInstance().getUserID();
 console.log("====================");
 console.log(ref);
 CreateFirebase.getInstance()._createFirebase().database().ref(ref).set({
 dataArray:dataArray
});

// let newDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// this.setState({dataSource: newDataSource.cloneWithRows(dataArray)});

}
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
     // this.state.user = CreateFirebase.getInstance().auth().currentUser;
     // console.log(this.state.user.uid);
     let commonData = CreateFirebase.getInstance();
     let userId = commonData.getUserID();
     console.log(userId);

      dataArray.push({
   		name: this.state.text,
   		description: this.state.description,
      id:this.state.i,
      userIds:userId,
    });

    this.state.i=dataArray.count+1
    console.log(myDataArray);


    var ref = "users/"+CreateFirebase.getInstance().getUserID();
  CreateFirebase.getInstance()._createFirebase().database().ref(ref).on('value', (snap) => {

        // get children as an array
        console.log(snap.val());
        if (snap.val() == null) {

        }
        else {
          dataArray = snap.val().dataArray.map(function(data){

            data['dataId'] = snap.val().dataArray.indexOf(data);

            return data;
          });
          console.log("===============",dataArray);
        }

        this.setState({
          i:dataArray.length,
          dataSource: this.state.dataSource.cloneWithRows(dataArray)
      });
    });


//Add  user data in firebase storage//
    var ref = "users/"+CreateFirebase.getInstance().getUserID();
    console.log("====================");
    console.log(ref);
    CreateFirebase.getInstance()._createFirebase().database().ref(ref).set({
    dataArray:myDataArray
  });

	let newDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.setState({dataSource: newDataSource.cloneWithRows(dataArray)});
}
}

_onPres=(rowData) => {
  console.log('Row Data =',rowData);
  const {navigate}=this.props.navigation;
  navigate('Detail',{data:rowData});
}

 _onDelete=(item)=> {

  dataArray.splice(-1,1)

  var ref = "users/"+CreateFirebase.getInstance().getUserID();
  console.log("====================");
  console.log(ref);
  CreateFirebase.getInstance()._createFirebase().database().ref(ref).set({
  dataArray:dataArray
  });


CreateFirebase.getInstance()._createFirebase().database().ref(ref).on('value', (snap) => {

      // get children as an array
      console.log(snap.val());
      if (snap.val() == null) {

      }
      else {
        dataArray = snap.val().dataArray.map(function(data){

          data['dataId'] = snap.val().dataArray.indexOf(data);

          return data;
        });
        console.log("===============",dataArray);
      }

      this.setState({
        i:dataArray.length,
        dataSource: this.state.dataSource.cloneWithRows(dataArray)
    });
  });



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
