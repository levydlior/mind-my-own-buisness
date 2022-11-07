import { getStorage, ref, deleteObject } from "firebase/storage";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const Image = styled.img`
width: 35rem;
height: 34rem;
`

const ReceiptDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
`

function ReceiptCard({ receipt, onReceiptDelete }) {
  const storage = getStorage();
  const desertRef = ref(storage, `${receipt.image}`);
  function handleClick() {
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("done");
        fetch(`/receipts/${receipt.id}`, {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            onReceiptDelete(receipt.id);
          }
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }

  return (
    <ReceiptDiv>
      <h2>{receipt.name}</h2>
      <Image src={receipt.image} alt="receipt image" />
      <Button sx={{marginTop: '0.5rem'}}variant="contained" onClick={handleClick}>Delete</Button>
      <h3>Amount: ${receipt.amount}</h3>
    </ReceiptDiv>
  );
}

export default ReceiptCard;
