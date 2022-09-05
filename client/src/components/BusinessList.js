import React, { useEffect, useState } from "react";
import BusinessCard from "../BusinessCard";
import CreateNewBusiness from "./CreateNewBusiness";

function BusinessList({ loggedUser }) {
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
  }

  function handleAddBusiness(business) {
    setBusinesses([...businesses, business]);
    setActive(false);
  }

  const businessList = businesses.map((business) => {
    return (
      <BusinessCard business={business} onHandleLinkClick={handleLinkClick}/>
    );
  });

  return (
    <div>
      <ul>
      {businessList}
      </ul>
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
