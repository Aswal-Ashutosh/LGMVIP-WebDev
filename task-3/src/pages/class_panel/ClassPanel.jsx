import React from "react";
import Navbar from "../../components/navbar/Navbar";
import PopUp from "../../components/pop_up/PopUp";
import {
  firestore,
} from "../../services/firebase";
import LoggedUser from "../../services/loggedUser";
import { collection, onSnapshot } from "@firebase/firestore";
import { withRouter, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "../class_panel/ClassPanel.css";
import StudentForm from "../../components/subject_form/StudentFrom";
import StudentCard from "../../components/student_card/StudentCard";

class ClassPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: false,
      students: [],
    };
    this.className = this.props.location.state.className;
    this.collegeID = this.props.location.state.collegeID;
    this.unsubscribe = null;
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  togglePopUp() {
    if (LoggedUser.userExist) this.setState({ popUp: !this.state.popUp });
    else this.props.history.push("/");
  }

  async componentDidMount() {
    LoggedUser.setUser("ashu.aswal.333@gmail.com");

    this.unsubscribe = await onSnapshot(
      collection(
        firestore,
        "college",
        this.collegeID.toString(),
        "classes",
        this.className,
        "enrolled-students"
      ),
      (snapshot) => {
        const docs = snapshot.docs;

        if (docs.length === 0) return;

        const students = [];
        docs.forEach((doc) => {
          const student = doc.data();
          students.push({
            studentRollNumber: student["student-roll-no"],
            studentName: student["student-name"],
          });
        });
        this.setState({ students: students });
      },
      (error) => {
        alert("Error(AdminPanel): ");
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div id="ClassPanel">
        <Navbar heading={this.className} />

        {this.state.popUp && (
          <PopUp closePopUp={this.togglePopUp}>
            <StudentForm
              collegeID={this.collegeID}
              className={this.className}
              closePopUp={this.togglePopUp}
            />
          </PopUp>
        )}
        {this.state.students.length === 0 ? (
          <Alert severity="info" sx={{ margin: "1.0% 40%" }}>
            No student is enrolled in{" "}
            <span>
              <b>{this.className}</b>
            </span>
            !
          </Alert>
        ) : (
          <h3>Students Enrolled</h3>
        )}
        {this.state.students.map((student) => (
          <StudentCard
            studentName={student.studentName}
            rollNumber={student.studentRollNumber}
          />
        ))}
        <button onClick={this.togglePopUp}>Add Student</button>
      </div>
    );
  }
}

export default withRouter(ClassPanel);
