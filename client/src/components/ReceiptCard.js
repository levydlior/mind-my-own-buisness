import { getStorage, ref, deleteObject } from "firebase/storage";

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
    <div>
      <h2>{receipt.name}</h2>
      <img src={receipt.image} alt="receipt image" />
      <button onClick={handleClick}>Delete</button>
      <h3>Amount: {receipt.amount}</h3>
    </div>
  );
}

export default ReceiptCard;
