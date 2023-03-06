import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BusinessCard from "../BusinessCard/BusinessCard";
import CreateNewBusiness from "../CreateNewBusiness/CreateNewBusiness";
import { Divider } from "@mui/material";
import { BusinessUl, BusinessAreaDiv } from "./BusinessList.styles";
import { fetchBusinesses } from "./BusinessList.request";

const BusinessList = ({ loggedUser, onLinkClick, newReceipt }) => {
  const [businesses, setBusinesses] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchBusinesses(setBusinesses);
  }, [newReceipt]);

  const handleLinkClick = () => {
    onLinkClick(false);
  };

  const handleAddBusiness = (business) => {
    setBusinesses([...businesses, business]);
  };

  const handleDelete = (business) => {
    const newBusinessArray = businesses.filter(
      (busi) => busi.id !== business.id
    );

    setBusinesses(newBusinessArray);
    history.push("/businesses");
  };

  const businessList = businesses.map((business) => {
    return (
      <>
        <BusinessCard
          business={business}
          onHandleLinkClick={handleLinkClick}
          onDelete={handleDelete}
          key={business.name}
        />
        <Divider variant="middle" color="black" />
      </>
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
        onAddBusiness={handleAddBusiness}
      />
    </BusinessAreaDiv>
  );
};

export default BusinessList;
