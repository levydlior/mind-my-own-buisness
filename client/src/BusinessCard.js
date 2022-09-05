import React from "react";
import { Link } from "react-router-dom";

function BusinessCard({ business, onHandleLinkClick, onDelete }) {
  function handleDelete() {
    fetch(`/businesses/${business.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((deletedBusiness) => onDelete(deletedBusiness));
      }
    });
  }

  return (
    <li key={business.id}>
      <Link to={`/businesses/${business.id}`} onClick={onHandleLinkClick}>
        {business.name}
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default BusinessCard;
