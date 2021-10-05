import React from "react";
import "./UserCard.css";

function UserCard(props) {
  return (
    <div className="User-card" id={props.id}>
      <div className="Card-details">
        <img src={props.avatar} alt="avatar-img" />
        <h3>{`${props.first_name} ${props.last_name}`}</h3>
        <p>{props.email}</p>
      </div>
    </div>
  );
}

export default UserCard;
