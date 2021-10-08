import React from "react";
import "../admin_login_form/AdminLoginForm.css";
import { signIn, signUp, registerCollege } from "../../services/firebase.js";
import { loggedUser } from "../../services/loggedUser";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

class AdminLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
      collegeInput: "",
      toggleButtonId: "sign_in",
      loading: false,
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleCollegeInput = this.handleCollegeInput.bind(this);
    this.handleSingIn = this.handleSingIn.bind(this);
    this.handleSingUp = this.handleSingUp.bind(this);
    this.handleToggleButtonChange = this.handleToggleButtonChange.bind(this);
  }

  handleEmailInput(event) {
    this.setState({ emailInput: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ passwordInput: event.target.value });
  }

  handleToggleButtonChange(event) {
    this.setState({ toggleButtonId: event.target.value });
    this.clearAlert();
  }

  handleCollegeInput(event) {
    this.setState({ collegeInput: event.target.value });
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
      this.showAlert("Email can't be empty!");
    else if (this.state.passwordInput.length === 0)
      this.showAlert("Password can't be empty!");

    return false;
  }

  validateCollege() {
    if (this.state.collegeInput.length !== 0) return true;
    this.showAlert("College name can't be empty!");
    return false;
  }

  async handleSingIn() {
    this.clearAlert();
    this.setState({ loading: true });

    if (this.validateEmailAndPassword()) {
      await signIn(this.state.emailInput, this.state.passwordInput)
        .then(() => {
          this.setState({ loading: false });
          this.showAlert("Signed In.", false);
          loggedUser.setUser(this.state.emailInput);
          window.location.href = "/adminPanel";
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
              alert(error.message);
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

    if (this.validateEmailAndPassword() && this.validateCollege()) {
      await signUp(this.state.emailInput, this.state.passwordInput)
        .then(async () => {
          await registerCollege(this.state.emailInput, this.state.collegeInput);
          this.setState({
            emailInput: "",
            passwordInput: "",
            collegeInput: "",
            loading: false,
          });
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

  renderButton(id) {
    switch (id) {
      case "sign_in":
        return (
          <button className="formBtn" onClick={this.handleSingIn}>
            Sign In
          </button>
        );
      case "sign_up":
        return (
          <button className="formBtn" onClick={this.handleSingUp}>
            Sign Up
          </button>
        );
      default:
        return <button className="formBtn">Get Result</button>;
    }
  }

  render() {
    return (
      <div id="AdminFormContainer">
        <h1>Welcome</h1>
        <ToggleButtonGroup
          color="primary"
          value={this.state.toggleButtonId}
          exclusive
          onChange={this.handleToggleButtonChange}
        >
          <ToggleButton value="sign_in">Sign In</ToggleButton>
          <ToggleButton value="sign_up">Sign Up</ToggleButton>
          <ToggleButton value="students">Students</ToggleButton>
        </ToggleButtonGroup>
        <div className="LoginForm">
          {this.state.toggleButtonId === "sign_up" ? (
            <input
              id="collegeInput"
              type="text"
              value={this.state.collegeInput}
              onChange={this.handleCollegeInput}
              placeholder="College Name"
            />
          ) : null}
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
          {this.renderButton(this.state.toggleButtonId)}
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
