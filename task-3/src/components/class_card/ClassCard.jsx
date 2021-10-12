import React from "react";
import { useHistory } from "react-router";
import "../class_card/ClassCard.css"

export default function ClassCard(props) {

  const history = useHistory();

  function OnView(){
    history.push('/class', {className: props.className, collegeID: props.collegeID})
  }

  return (
    <div className="ClassCard">
      <p className="S-no">{props.index + 1}</p>
      <p className="ClassName">{props.className}</p>
      <button onClick={OnView}>View</button>
    </div>
  );
}
