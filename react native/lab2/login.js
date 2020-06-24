import React from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Router, Scene, Actions } from "react-native-router-flux";

class Login extends React.Component
{
  constructor(){
    super();
    this.state={
        username:" ",  
        password:" "
    }
    }
    handleChangeName =  (text)=>{
      this.setState({ username: text })
    }
    handleChangePassword =  (text) =>{
      this.setState({ password: text })
    }

    handleSubmit = event =>{
      event.preventDefault();
      console.log("User name : " + this.state.username);
      console.log("User password : " + this.state.password);
      const url ="http://todoapp.ahmedrohym.com/api.php?apicall=login";
      const data = { 
          username:this.state.username, 
          password:this.state.password 
        }
      fetch(url, { method: 'POST', // or 'PUT’
      headers:{ 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data) // data can be `string` or {object}!
       })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response =>
         {  console.log('Success:', response); 
            // if (response.message === "Login successfull"){
              Actions.Component()
            // }else{
            //   Actions.Login()
            // }
        });
    }

    render() {
        return (
          <View style={styles.container}>
          <View>
              <Text>UserName</Text>
              <TextInput   
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="user name"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this.handleChangeName}
                />
          </View>
          <View>
              <Text>Password</Text>
              <TextInput 
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter password" 
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this.handleChangePassword}
                />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.handleSubmit}
          >
          <Text style={styles.submitButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    height: 40,
    marginBottom: 5,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
});
export default Login;