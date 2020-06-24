import React  from "react";
import { Router, Scene, Actions } from "react-native-router-flux";
import Login from "./login";
import SignUp from "./signup";
import Component from "./Component";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
        <Scene key="Login" component={Login} title="Login" />
          <Scene
            key="SignUp"
            component={SignUp}
            title="SignUp"
          />
          <Scene key="Login" component={Login} title="Login" />
          <Scene key="Component" component={Component} title="Component" />
        </Scene>
      </Router>
    );
  }
}
export default App;







