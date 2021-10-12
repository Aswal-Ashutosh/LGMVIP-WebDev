import React from "react";
import { useHistory } from "react-router";
import "../student_card/StudentCard.css"

export default function StudentCard(props) {

  const history = useHistory();

  function OnView(){
    history.push('/studentResult', {collegeID: props.collegeID, rollNumber: props.rollNumber})
  }

  return (
    <div className="StudentCard">
      <p className="RollNumber">{props.rollNumber}</p>
      <p className="StudentName">{props.studentName}</p>
      <button onClick={OnView}>View</button>
    </div>
  );
}
