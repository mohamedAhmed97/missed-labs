import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";


export default class Task extends React.Component{
    render(){
      return(
        <View style={styles.container}>
        <TextInput  
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="new item"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.props.onInput }
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.props.onSubmit}
        >
        <Text style={styles.submitButtonText}> Add to list </Text>
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
