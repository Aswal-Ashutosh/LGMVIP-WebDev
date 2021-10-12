import React from "react";
import { useHistory } from "react-router";
import "../student_card/StudentCard.css"

export default function StudentCard(props) {

  const history = useHistory();

  function OnView(){
    // history.push('/class', {className: props.className, collegeName: props.collegeName, collegeID: props.collegeID})
  }

  return (
    <div className="StudentCard">
      <p className="RollNumber">{props.rollNumber}</p>
      <p className="StudentName">{props.studentName}</p>
      <button onClick={OnView}>View</button>
    </div>
  );
}
