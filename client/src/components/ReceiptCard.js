import React from "react";

function ReceiptCard({ receipt, onReceiptDelete }) {
 
  function handleClick() {
    fetch(`/receipts/${receipt.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onReceiptDelete(receipt.id)
      }
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
