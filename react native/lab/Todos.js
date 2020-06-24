import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Todos = ({todos, deleteTodo}) => {

  const todoList = todos.length ? (
    todos.map(todo => {
      return (
        <View style={styles.container2} key={todo.id}>
          <Text style={styles.data}onPress={() => {deleteTodo(todo.id)}}>{todo.content}</Text>
        </View>
      )
    })
  ) : (
    <Text >You have no todo's left, yay!</Text>
  );

  return (
    <View >
      {todoList}
    </View>
  )
}

export default Todos;

const styles = StyleSheet.create({
 
  container2: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "#b9deb4",
    alignItems: "center",

    
  },
  data:{
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  }
});
