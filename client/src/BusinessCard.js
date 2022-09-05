import React from "react";
import { Link } from "react-router-dom";


function BusinessCard({business, onHandleLinkClick}) {
  return (
    <li key={business.id}>
      <Link to={`/businesses/${business.id}`} onClick={onHandleLinkClick}>
        {business.name}
      </Link>
    </li>
  );
}

export default BusinessCard;
