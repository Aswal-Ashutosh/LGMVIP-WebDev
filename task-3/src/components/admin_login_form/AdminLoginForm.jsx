import React from "react";
import "../admin_login_form/AdminLoginForm.css";
import { firebaseAuth, signIn, signUp } from "../../services/firebase.js";
import { LinearProgress } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { loggedUser } from "../../services/loggedUser";

class AdminLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
      loading: false,
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSingIn = this.handleSingIn.bind(this);
    this.handleSingUp = this.handleSingUp.bind(this);
  }

  handleEmailInput(event) {
    this.setState({ emailInput: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ passwordInput: event.target.value });
  }

  clearAlert() {
    const alertBox = document.getElementById("alert");
    alertBox.innerHTML = "";
  }

  showAlert(message, error = true) {
    const alertBox = document.getElementById("alert");
    alertBox.innerHTML = message;
    if (error) alertBox.style.color = "red";
    else alertBox.style.color = "green";
  }

  validateEmailAndPassword() {
    if (
      this.state.emailInput.length !== 0 &&
      this.state.passwordInput.length !== 0
    )
      return true;

    if (this.state.emailInput.length === 0)
      this.showAlert("Email can't be empty");
    else if (this.state.passwordInput.length === 0)
      this.showAlert("Password can't be empty!");

    return false;
  }

  async handleSingIn() {
    this.clearAlert();
    this.setState({ loading: true });

    if (this.validateEmailAndPassword()) {
      await signIn(
        firebaseAuth,
        this.state.emailInput,
        this.state.passwordInput
      )
        .then((userCredential) => {
          this.setState({ loading: false });
          this.showAlert("Signed In.", false);
          loggedUser.setUser(this.state.emailInput);
          window.location.replace("/adminPanel");
        })
        .catch((error) => {
          this.setState({ loading: false });
          switch (error.code) {
            case "auth/invalid-email":
              this.showAlert("Invalid email!");
              break;
            case "auth/wrong-password":
              this.showAlert("Wrong password!");
              break;
            case "auth/user-not-found":
              this.showAlert("User not found!");
              break;
            default:
              this.showAlert("Something went wrong!");
          }
        });
    } else {
      this.setState({ loading: false });
    }
  }

  async handleSingUp() {
    this.clearAlert();
    this.setState({ loading: true });

    if (this.validateEmailAndPassword()) {
      await signUp(
        firebaseAuth,
        this.state.emailInput,
        this.state.passwordInput
      )
        .then((userCredential) => {
          this.setState({ emailInput: "", passwordInput: "", loading: false });
          this.showAlert("Account created successfully.", false);
        })
        .catch((error) => {
          this.setState({ loading: false });
          switch (error.code) {
            case "auth/invalid-email":
              this.showAlert("Invalid email!");
              break;
            case "auth/email-already-in-use":
              this.showAlert("Email already in use!");
              break;
            case "auth/weak-password":
              this.showAlert("Password must be 6 characters long!");
              break;
            default:
              this.showAlert("Something went wrong!");
          }
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div id="AdminFormContainer">
        <h1>Admin Login</h1>
        <div className="LoginForm">
          <input
            id="emailInput"
            type="text"
            value={this.state.emailInput}
            onChange={this.handleEmailInput}
            placeholder="Enter your email"
          />
          <input
            id="passwordInput"
            type="password"
            value={this.state.passwordInput}
            onChange={this.handlePasswordInput}
            placeholder="Password"
          />
          <button onClick={this.handleSingIn}>Sign In</button>
          <button onClick={this.handleSingUp}>Sign Up</button>
        </div>
        {this.state.loading ? (
          <Box sx={{ marginTop: "2.5%" }}>
            <LinearProgress />
          </Box>
        ) : null}
        <p id="alert"></p>
      </div>
    );
  }
}

export default AdminLoginForm;
