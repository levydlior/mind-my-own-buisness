import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Receipt from "./Receipt";

function Business() {
  const [receipts, setReceipts] = useState([]);

  const params = useParams();
  const { businessId } = params;

  useEffect(() => {
    fetch(`/receipts/${businessId}`)
      .then((r) => r.json())
      .then((res) => setReceipts(res));
  }, [params]);

  const receiptsList = receipts.map((receipt) => (
    <Receipt key={receipt.name} receipt={receipt} />
  ));

  // console.log(receipts);

  return (
    <div>
      {receiptsList}
    </div>
  );
}

export default Business;
