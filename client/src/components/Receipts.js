import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReceiptCard from "./ReceiptCard";
import storage from "./../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Receipts({ onCreateReceipts, createReceiptsActive }) {
  const [receipts, setReceipts] = useState([]);
  const [error, setError] = useState([]);
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [uploading, setUploading] = useState(false)

  const params = useParams();
  const { businessId } = params;

  const [receiptForm, setReceiptForm] = useState({
    name: "",
    amount: "",
    image: "",
    business_id: businessId,
  });

  const originalForm = {
    name: "",
    amount: "",
    image: "",
    business_id: businessId,
  };

  async function handleUpload() {
    if (!file) {
      setError('Please add an image')
      return
    }
    setUploading(true)

    const storageRef = ref(storage, `/files/${receiptForm.name}/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => setError(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setReceiptForm({ ...receiptForm, image: url });
        });
      }
    );
  }

  useEffect(() => {
    fetch(`/receipts/${businessId}`)
      .then((r) => r.json())
      .then((res) => setReceipts(res));

    setReceiptForm({ ...receiptForm, business_id: businessId });
  }, [params]);

  function handleReceiptDelete(id) {
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);
    setReceipts(updatedReceipts);
  }

  const receiptsList = receipts.map((receipt) => (
    <ReceiptCard
      key={receipt.name}
      receipt={receipt}
      onReceiptDelete={handleReceiptDelete}
    />
  ));

  function handleChange(e) {
    const target = e.target.name;
    const value = e.target.value;

    setReceiptForm({ ...receiptForm, [target]: value });
  }

  function handleImageChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (receiptForm.image){
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
            onCreateReceipts(false);
            setUploading(false)
          });
        } else {
          r.json().then((err) => {
            setUploading(false)
            setReceiptForm(originalForm);
            setError(err.errors[0]);
          });
        }
      })}
  }, [receiptForm.image]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpload();
  }



  return (
    <div>
      <button onClick={() => onCreateReceipts(true)}>Add Receipt</button>
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
            type="file"
            required
            placeholder="image"
            onChange={handleImageChange}
            accept="image"
          />
          <input type="submit" value="Add Receipt" />
          <button onClick={() => onCreateReceipts(false)}>Cancel</button>
        </form>
      ) : null}
 {uploading? <p>Uploading!</p>
      :  <>
      {receiptsList}
      </>} 
    </div>
  );
}

export default Receipts;
