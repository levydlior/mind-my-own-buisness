import { getStorage, ref, deleteObject } from "firebase/storage";
import { receiptDeleteRequest } from "./ReceiptCard.request";
import { Image, ReceiptCardButton, ReceiptDiv } from "./ReceiptCard.styles";

const ReceiptCard = ({ receipt, onReceiptDelete }) => {
  const { name, image, amount, id } = receipt;
  const storage = getStorage();
  const desertRef = ref(storage, `${image}`);

  const handleClick = () => {
    deleteObject(desertRef)
      .then(() => {
        receiptDeleteRequest(id, onReceiptDelete, receipt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ReceiptDiv>
        <h2>{name}</h2>
        <Image src={image} alt="receipt image" />
        <ReceiptCardButton
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
          Delete
        </ReceiptCardButton>
        <h3>Amount: ${amount}</h3>
      </ReceiptDiv>
    </div>
  );
};

export default ReceiptCard;
