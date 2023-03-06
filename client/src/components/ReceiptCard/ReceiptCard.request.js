export const receiptDeleteRequest = (id, onReceiptDelete, receipt) => {
  fetch(`/receipts/${id}`, {
    method: "DELETE",
  }).then((r) => {
    if (r.ok) {
      onReceiptDelete(receipt.id);
    }
  });
};
