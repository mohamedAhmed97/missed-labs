import React  from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

class SignUp extends React.Component
{
  constructor(){
    super();
    this.state={
        username:" ", 
        email:" " , 
        password:" ",
        gender:" "
    }
    }
    handleChangeName =  (text)=>{
      this.setState({ username: text })
    }
    handleChangeEmail =  (text) =>{
      this.setState({ email: text })
    }
    handleChangePassword =  (text) =>{
      this.setState({ password: text })
    }
    handleChangeGender =  (text) =>{
      this.setState({ gender: text })
    }


    handleSubmit = async () =>{
      // event.preventDefault();
      console.log("User name : " + this.state.username);
      console.log("User Email : " + this.state.email);
      console.log("User password : " + this.state.password);
      console.log("User gender: " + this.state.gender);
      const url ="http://todoapp.ahmedrohym.com/api.php?apicall=signup";
      const data = { 
          username:this.state.username, 
          email:this.state.email,
          password:this.state.password, 
          gender:this.state.gender  
        }
      fetch("http://todoapp.ahmedrohym.com/api.php?apicall=signup",{
        method: 'POST', // or 'PUT’
        headers:{ 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data) // data can be `string` or {object}!
       })
      .then((response) => response.json())
      .catch(error => console.error('Error:', error))
      .then((response) => console.log('Success:', response));
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
                  <Text>Email address</Text>
                  <TextInput  
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Enter email"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleChangeEmail}
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

              <View>
                  <Text htmlFor="gender">Gender: </Text><br/>
                  <TextInput 
                    style={styles.input}
                    underlineColorAndroid="transparent" 
                    placeholder="male/female" 
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleChangeGender}
                   />
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.handleSubmit}
              >
              <Text style={styles.submitButtonText}> Sign Up </Text>
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
export default SignUp;