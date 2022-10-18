import { Link } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "@emotion/styled";

const BusinessLi = styled.li`
display: flex;
listStyle: none;
`

const StyledIcon = styled(DeleteIcon)`
&:hover {
  cursor: pointer;
  color: gray;
}
margin-left: 0.5rem;
`


function BusinessCard({ business, onHandleLinkClick, onDelete }) {
  async function handleDelete() {
    const storage = getStorage();
    const bla = business.receipts.map((receipt) => {
      const desertRef = ref(storage, `${receipt.image}`);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log("done");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    });
    await bla;
    fetch(`/businesses/${business.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((deletedBusiness) => onDelete(deletedBusiness));
      }
    });
  }

  return (
    <BusinessLi key={business.id}>
      <Link to={`/businesses/${business.id}`} onClick={onHandleLinkClick}>
        {business.name}
      </Link>
    <StyledIcon fontSize='small' onClick={handleDelete}/>
    </BusinessLi>
  );
}

export default BusinessCard;
