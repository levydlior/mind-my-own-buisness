import React, { useEffect, useState } from "react";
import BusinessCard from "../BusinessCard";
import CreateNewBusiness from "./CreateNewBusiness";

function BusinessList({ loggedUser, onLinkClick }) {
  const [businesses, setBusinesses] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch("/businesses")
      .then((r) => r.json())
      .then((arrayOfBusinesses) => setBusinesses(arrayOfBusinesses));
  }, []);

  function handleActiveChange(value) {
    setActive(value);
  }

  function handleLinkClick() {
    setActive(false);
    onLinkClick(false)
  }

  function handleAddBusiness(business) {
    setBusinesses([...businesses, business]);
    setActive(false);
  }

  function handleDelete(business) {
    const newBusinessArray = businesses.filter(
      (busi) => busi.id !== business.id
    );
    setBusinesses(newBusinessArray);
  }

  const businessList = businesses.map((business) => {
    return (
      <BusinessCard
        business={business}
        onHandleLinkClick={handleLinkClick}
        onDelete={handleDelete}
        key={business.id}
      />
    );
  });

  return (
    <div>
      <ul>{businessList}</ul>
      <CreateNewBusiness
        loggedUser={loggedUser}
        active={active}
        handleActiveChange={handleActiveChange}
        onAddBusiness={handleAddBusiness}
      />
    </div>
  );
}

export default BusinessList;
