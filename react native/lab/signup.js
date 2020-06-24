import React, { Component } from "react";

export default class SignUp extends Component {


  constructor(){
    super();
    this.state={
        username:" ", 
        email:" " , 
        password:" ",
        gender:" "
    }
    }
    handleChange = event =>{
      this.setState({ [event.target.name]:event.target.value })
    }

    handleSubmit = event =>{
      event.preventDefault();
      console.log("Username : " + this.state.username);
      console.log("Email : " + this.state.email);
      console.log("Password : " + this.state.password);
      console.log("Gender: " + this.state.gender);
      const url ="http://todoapp.ahmedrohym.com/api.php?apicall=signup";
      const data = { 
          username:this.state.username, 
          email:this.state.email,
          password:this.state.password, 
          gender:this.state.gender  
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input name="username" type="text" className="form-control" placeholder="Enter Username" onChange={this.handleChange}/>
                </div>


                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label><br/>
                  <select 
                    name="gender"
                    id="gender" 
                    onChange={this.handleChange}
                   >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                 
                  </select>
              </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
               
            </form>
        );
    }
}