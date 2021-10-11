import React from "react";
import Navbar from "../../components/navbar/Navbar";
import PopUp from "../../components/pop_up/PopUp";
import {
  getCollegeName,
  getCollegeID,
  firestore,
} from "../../services/firebase";
import LoggedUser from "../../services/loggedUser";
import "../admin_panel/AdminPanel.css";
import { collection, onSnapshot } from "@firebase/firestore";
import ClassForm from "../../components/class_form/ClassForm";
import { withRouter } from "react-router-dom";
import Alert from "@mui/material/Alert";
import ClassCard from "../../components/class_card/ClassCard";

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeName: null,
      collegeID: null,
      popUp: false,
      classes: [],
    };
    this.unsubscribe = null;
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  togglePopUp() {
    if (LoggedUser.userExist) this.setState({ popUp: !this.state.popUp });
    else this.props.history.push("/");
  }

  async componentDidMount() {
    LoggedUser.setUser('ashu.aswal.333@gmail.com');
    const collegeID = await getCollegeID(LoggedUser.email);
    const collegeName = await getCollegeName(collegeID);
    this.setState({ collegeName: collegeName, collegeID: collegeID });

    this.unsubscribe = await onSnapshot(
      collection(firestore, "college", collegeID.toString(), "classes"),
      (snapshot) => {
        const docs = snapshot.docs;

        if (docs.length === 0) return;

        const classes = [];
        docs.forEach((doc) => {
          classes.push(doc.data()["class-name"]);
        });
        this.setState({ classes: classes });
      },
      (error) => {
        alert("Error(AdminPanel): " + error.message);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div id="AdminPanel">
        <Navbar heading={this.state.collegeName} subHeading={`College ID (${this.state.collegeID})`} />

        {this.state.popUp && (
          <PopUp closePopUp={this.togglePopUp}>
            <ClassForm collegeID={this.state.collegeID} closePopUp={this.togglePopUp} />
          </PopUp>
        )}
        {this.state.classes.length === 0 ? (
          <Alert severity="info" sx={{ marginBottom: "1.0%" }}>
            No classes created yet!
          </Alert>
        ) : <h3>AVAILABLE CLASSES</h3>}
        {this.state.classes.map((className, index) => (
          <ClassCard className={className} index={index}/>
        ))}
        <button onClick={this.togglePopUp}>Create Class</button>
      </div>
    );
  }
}

export default withRouter(AdminPanel);
