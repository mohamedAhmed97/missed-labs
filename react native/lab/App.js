import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Todos from './Todos';
import AddTodo from './AddTodo';

class App extends React.Component {
  state = {
    todos: [
      {id: 1, content: 'Task 1'},
      {id: 2, content: 'Task 2'}
    ]
  }
  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    });
    this.setState({
      todos
    });
  }
  addTodo = (todo) => {
    todo.id = Math.random();
    let todos = [...this.state.todos, todo];
    this.setState({
      todos
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <AddTodo addTodo={this.addTodo} />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5d0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    marginBottom: 100,
    textAlign: "center",
    color: "#cfafa5",
    fontWeight: "bold",
    fontSize: 20,
  }
});
