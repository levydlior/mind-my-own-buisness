export const getReceiptsRequest = (
  businessId,
  setReceipts,
  setCurrentBusiness,
  setReceiptForm,
  receiptForm
) => {
  fetch(`/receipts/${businessId}`)
    .then((r) => r.json())
    .then((res) => setReceipts(res));

  fetch(`/businesses/${businessId}`)
    .then((r) => r.json())
    .then((fetchedBusiness) => setCurrentBusiness(fetchedBusiness));

  setReceiptForm({ ...receiptForm, business_id: businessId });
};

export const postReceiptRequest = (
  receiptForm,
  setError,
  originalForm,
  setReceiptForm,
  setReceipts,
  receipts,
  onCreateReceipts,
  setUploading,
  onNewReceipts,
  setAnchorEl
) => {
  if (receiptForm.image) {
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
          setError([]);
          setReceiptForm(originalForm);
          setReceipts([...receipts, rec]);
          onCreateReceipts(false);
          setUploading(false);
          onNewReceipts(rec);
          setAnchorEl(null);
        });
      } else {
        r.json().then((err) => {
          setUploading(false);
          setReceiptForm(originalForm);
          setError(err.errors[0]);
        });
      }
    });
  }
};
