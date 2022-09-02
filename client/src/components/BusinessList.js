import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <li key={business.id}>
        <Link to={`/businesses/${business.id}`} onClick={handleLinkClick}>
          {business.name}
        </Link>
      </li>
    );
  });

  return (
    <div>
      {businessList}
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
