import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReceiptCard from "./ReceiptCard";

function Receipts({ onCreateReceipts, createReceiptsActive }) {
  const [receipts, setReceipts] = useState([]);
  const [error, setError] = useState([]);

  const params = useParams();
  const { businessId } = params;

  const [receiptForm, setReceiptForm] = useState({
    name: "",
    amount: 0,
    image: "",
    business_id: businessId,
  });

  const originalForm = {
    name: "",
    amount: 0,
    image: "",
    business_id: businessId,
  };

  useEffect(() => {
    fetch(`/receipts/${businessId}`)
      .then((r) => r.json())
      .then((res) => setReceipts(res));

    setReceiptForm({ ...receiptForm, business_id: businessId });
  }, [params]);

  const receiptsList = receipts.map((receipt) => (
    <ReceiptCard key={receipt.name} receipt={receipt} />
  ));

  function handleChange(e) {
    const target = e.target.name;
    const value = e.target.value;

    setReceiptForm({ ...receiptForm, [target]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/receipts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(receiptForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((rec) => {
          setError(null);
          setReceiptForm(originalForm);
          setReceipts([...receipts, rec]);
          onCreateReceipts(false)
        });
      } else {
        r.json().then((err) => {
          setReceiptForm(originalForm);
          setError(err.errors[0]);
        });
      }
    });
  }
  console.log(receipts);
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
          {error ? <p>{error}</p> : null}
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
