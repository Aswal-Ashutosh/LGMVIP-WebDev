import React from "react";
import "../class_card/ClassCard.css"

export default function ClassCard(props) {
  return (
    <div className="ClassCard">
      <p className="S-no">{props.index + 1}</p>
      <p className="ClassName">{props.className}</p>
      <button>View</button>
    </div>
  );
}
