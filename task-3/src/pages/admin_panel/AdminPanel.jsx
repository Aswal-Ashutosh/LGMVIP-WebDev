import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { getCollegeName, getCollegeID } from "../../services/firebase"
import LoggedUser from "../../services/loggedUser";

class AdminPanel extends React.Component {
   constructor() {
      super();
      this.state = {
          collegeName: null,
          collegeID: null
      };
  }

  async componentDidMount(){
    const collegeID = await getCollegeID(LoggedUser.email);
    const collegeName = await getCollegeName(collegeID);
    this.setState({collegeName: collegeName, collegeID: collegeID});
  }

   render() {
    return (
      <div>
        <Navbar heading={this.state.collegeName}/>
        <h1>College ID {this.state.collegeID}</h1>
      </div>
    );
  }
}

export default AdminPanel;
