import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReceiptCard from "./ReceiptCard";

function Receipts({ onCreateReceipts, createReceiptsActive }) {
  const [receipts, setReceipts] = useState([]);

  const params = useParams();
  const { businessId } = params;

  const [receiptForm, setReceiptForm] = useState({
    name: "",
    amount: 0,
    image: "",
    business_id: businessId,
  });

  useEffect(() => {
    fetch(`/receipts/${businessId}`)
      .then((r) => r.json())
      .then((res) => setReceipts(res));
  }, [params]);

  const receiptsList = receipts.map((receipt) => (
    <ReceiptCard key={receipt.name} receipt={receipt} />
  ));

  function handleChange(e) {
    const target = e.target.name;
    const value = e.target.value;

    setReceiptForm({ ...receiptForm, [target]: value });
  }

  function handleSubmit(e){
    e.preventDefault()
    
  }

  return (
    <div>
      <button onClick={() => onCreateReceipts(true)}>Add Receipt</button>
      <button onClick={() => onCreateReceipts(false)}>Cancel</button>
      {createReceiptsActive ? (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            required
            placeholder="name"
            value={receiptForm.name}
            onChange={handleChange}
          />
          <input
            name="amount"
            type="number"
            required
            placeholder="Amount"
            value={receiptForm.amount}
            onChange={handleChange}
          />
          <input
            name="image"
            type="text"
            required
            placeholder="image"
            value={receiptForm.image}
            onChange={handleChange}
          />
          <input type="submit" value="Add Receipt" />
        </form>
      ) : null}

      {receiptsList}
    </div>
  );
}

export default Receipts;
