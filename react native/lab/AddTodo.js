import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

class AddTodo extends React.Component {
  state = {
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      content: e
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // call function to add a todo
    this.props.addTodo(this.state);
    this.setState({
      content: ''
    })
  }
  render() {
    return (
      <View>
    
          <TextInput type="text" onChangeText={this.handleChange} placeholder=" Add new task " style={styles.input}/> 
            

             <TouchableOpacity

          style={styles.submitButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.submitButtonText}> Add Task</Text>
        </TouchableOpacity>
      
      </View>
    )
  }
}

export default AddTodo

const styles = StyleSheet.create({
  input: {
   
    backgroundColor: 'white',
    height:40,
    marginTop:40,
    borderColor: '#cfafa5',
    borderWidth: 1

    
  },

  submitButton: {

    backgroundColor: "#cfafa5",
    padding: 10,
    margin: 15,
    height: 40,


  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
 
});