import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BusinessCard from "../BusinessCard";
import CreateNewBusiness from "./CreateNewBusiness";

function BusinessList({ loggedUser, onLinkClick, newReceipt }) {
  const [businesses, setBusinesses] = useState([]);
  const [active, setActive] = useState(false);

  const history = useHistory();
  useEffect(() => {
    fetch("/businesses")
      .then((r) => r.json())
      .then((arrayOfBusinesses) => {
        setBusinesses(arrayOfBusinesses);
      });
  }, [newReceipt]);

  function handleActiveChange(value) {
    setActive(value);
  }

  function handleLinkClick() {
    setActive(false);
    onLinkClick(false);
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
    history.push("/businesses");
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
      <CreateNewBusiness
        loggedUser={loggedUser}
        active={active}
        handleActiveChange={handleActiveChange}
        onAddBusiness={handleAddBusiness}
      />
      <ul>{businessList}</ul>
    </div>
  );
}

export default BusinessList;
