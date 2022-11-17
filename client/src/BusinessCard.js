import { NavLink } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import { useState } from "react";
import DeleteBusinessDialog from './components/DeleteBusinessDialog'

const BusinessLi = styled.li`
  display: flex;
  liststyle: none;
  margin-top: 2rem;
  border-bottom: solid 1px;
`;

const StyledIcon = styled(DeleteIcon)`
  &:hover {
    cursor: pointer;
    color: gray;
  }
  margin-left: 0.5rem;
`;

function BusinessCard({ business, onHandleLinkClick, onDelete }) {

  const [deleteBusinessActive, setDeleteBusinessActive] = useState(false)

  async function handleDelete() {
    setDeleteBusinessActive(false)
    const storage = getStorage();
    const getBusinessFromReceipts = business.receipts.map((receipt) => {
      const desertRef = ref(storage, `${receipt.image}`);

      deleteObject(desertRef)
        .then(() => {
          console.log("done");
        })
        .catch((error) => {
          console.log(error);
        });
    });
    await getBusinessFromReceipts;
    fetch(`/businesses/${business.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((deletedBusiness) => onDelete(deletedBusiness));
      }
    });
  }

  function handleDeleteClick(){
    setDeleteBusinessActive(true)
  }

  function handleCloseDelete(){
    setDeleteBusinessActive(false)
  }
   
  return (
    <BusinessLi key={business.id}>
            <StyledIcon fontSize="small" onClick={handleDeleteClick} />

      <NavLink
        activeClassName="selected"
        to={`/businesses/${business.id}`}
        onClick={onHandleLinkClick}
      >
        {business.name}
      </NavLink>
      {!deleteBusinessActive? null : <DeleteBusinessDialog  deleteBusinessActive={deleteBusinessActive} onClosing={handleCloseDelete} onDeleteBusiness={handleDelete}/>}
    </BusinessLi>
  );
}

export default BusinessCard;
