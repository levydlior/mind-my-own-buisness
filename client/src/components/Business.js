import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReceiptCard from "./ReceiptCard";

function Receipts() {
  const [receipts, setReceipts] = useState([]);

  const params = useParams();
  const { businessId } = params;

  useEffect(() => {
    fetch(`/receipts/${businessId}`)
      .then((r) => r.json())
      .then((res) => setReceipts(res));
  }, [params]);

  const receiptsList = receipts.map((receipt) => (
    <ReceiptCard key={receipt.name} receipt={receipt} />
  ));

  // console.log(receipts);

  return (
    <div>
      {receiptsList}
    </div>
  );
}

export default Receipts;
