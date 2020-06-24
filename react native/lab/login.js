import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
class Login extends Component {

    constructor(){
        super();
        this.state={
            username:" ",  
            password:" "
        }
        }
        handleChange = event =>{
          this.setState({ [event.target.name]:event.target.value })
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
          fetch(url, { method: 'POST', 
          headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data) 
           })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
        }

        fun() {
            this.props.history.push("/list");
          }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input name="username" type="text" className="form-control" placeholder="Enter username"  onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange} />
                </div>

                <button type="submit" className="btn btn-primary btn-block"onClick={this.fun.bind(this)}>Submit</button>
            
            </form>
        );
    }
}


export default withRouter (Login);