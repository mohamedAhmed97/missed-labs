import React  from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Task from "./Task.js";

class Component extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        "Attend lec2",
        "Complete lab2",
        "Complete Bouns1",
        "Attend lec3",
        "Complete lab3",
        "Complete Bouns2"
      ],

        input: " ",
    };
  }
    
    //get input value
    onInput = (text) =>{
         this.setState({
            input: text
        });
    }

    // submit handler
    onSubmit = (e) => {
        e.preventDefault();
        AsyncStorage.setItem('my-storage-key', this.state.data);
        console.log(this.state.input);
        this.state.data.push(this.state.input);
        this.setState({ data: this.state.data });
    }
    handleRemove=(i)=>{
        alert("remove");
        var newItems = this.state.data.slice();
        newItems.splice(i, 1);
        this.setState({ data: newItems });
    };
  render() {
    return (
      <View>
          {this.state.data.map((item, i) => (
              <TouchableOpacity
              key={i}
              style={styles.container}
              onPress={this.handleRemove}>
              <Text style={styles.text}>{item}</Text> 
              </TouchableOpacity>
          ))}
          <Task onInput={this.onInput} onSubmit={this.onSubmit}></Task>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textstyle: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "#d9f9b1",
    alignItems: "center",
  },
  text: {
    color: "#4f603c",
  },
});
export default Component;







