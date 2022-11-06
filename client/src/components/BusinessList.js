import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BusinessCard from "../BusinessCard";
import CreateNewBusiness from "./CreateNewBusiness";
import styled from "@emotion/styled";

const BusinessUl = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  flex-direction: column;
  margin: 0rem;
  padding: 0rem;
  width: 259px;
`;

const BusinessAreaDiv = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
height: 489px;
`

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
    <BusinessAreaDiv>
      <BusinessUl>
        <h2>My Businesses</h2>
        {businessList}
      </BusinessUl>
      <CreateNewBusiness
        loggedUser={loggedUser}
        active={active}
        handleActiveChange={handleActiveChange}
        onAddBusiness={handleAddBusiness}
      />
    </BusinessAreaDiv>
  );
}

export default BusinessList;
