import { NavLink } from "react-router-dom";
import { useState } from "react";
import { DeleteBusinessDialog } from "../DeleteBusinessDialog/DeleteBusinessDialog";
import { BusinessLi, StyledIcon } from "./BusinessCard.styles";
import { handleDeleteFromFireBaeRequest } from "./BusinessCard.request";

const BusinessCard = ({ business, onHandleLinkClick, onDelete }) => {
  const [deleteBusinessActive, setDeleteBusinessActive] = useState(false);

  const handleDelete = () => {
    setDeleteBusinessActive(false);
    handleDeleteFromFireBaeRequest(business, onDelete);
  };

  const handleDeleteClick = () => {
    setDeleteBusinessActive(true);
  };

  const handleCloseDelete = () => {
    setDeleteBusinessActive(false);
  };

  return (
    <BusinessLi key={business.id}>
      <StyledIcon fontSize="small" onClick={handleDeleteClick} />
      <NavLink
        activeClassName="selected"
        to={`/businesses/${business.id}`}
        onClick={onHandleLinkClick}
      >
        {business.name.charAt(0).toUpperCase()}
        {business.name.slice(1)}
      </NavLink>
      {deleteBusinessActive && (
        <DeleteBusinessDialog
          deleteBusinessActive={deleteBusinessActive}
          onClosing={handleCloseDelete}
          onDeleteBusiness={handleDelete}
        />
      )}
    </BusinessLi>
  );
};

export default BusinessCard;
