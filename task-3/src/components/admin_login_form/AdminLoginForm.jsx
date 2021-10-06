import React from "react";
import '../admin_login_form/adminLoginForm.css';

class AdminLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleEmailInput(event) {
    this.setState({ emailInput: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ passwordInput: event.target.value });
  }

  render() {
    return (
      <div id='AdminFormContainer'>
        <h1>Admin Login</h1>
        <form onSubmit>
          <input
            id='emailInput'
            type="text"
            value={this.state.emailInput}
            onChange={this.handleEmailInput}
            placeholder="Enter your email"
          />
          <input
            id='passwordInput'
            type="password"
            value={this.state.passwordInput}
            onChange={this.handlePasswordInput}
            placeholder="Password"
          />
          <button type='submit'>Sign In</button>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default AdminLoginForm;
