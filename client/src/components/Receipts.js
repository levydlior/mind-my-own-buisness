import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReceiptCard from "./ReceiptCard";
import storage from "./../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ReceiptForm = styled.form`
  // display: flex;
  // justify-content: space-evenly;
  // flex-wrap: wrap;
  // margin: 1rem;
  // width: 70rem;
`;

const SearchReceiptForm = styled.form`
  text-align: center;
`;

const AddReceiptButtonDiv = styled.div`
  // text-align: center;
  // align-items: inherit;
  // margin: 1rem;
`;

const NameAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReceiptsDiv = styled.div`
  padding-inline: 2rem;
  width: 622px;
`;

function Receipts({
  onCreateReceipts,
  createReceiptsActive,
  onNewReceipts,
  loggedUser,
}) {
  const [receipts, setReceipts] = useState([]);
  const [error, setError] = useState([]);
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [searchText, setSearchText] = useState(``);

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
      setError("Please add an image");
      return;
    }
    setUploading(true);
    const storageRef = ref(
      storage,
      `/files/${loggedUser.username}/${currentBusiness.name}/${
        receiptForm.name
      }/${Date.now()}`
    );
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

    fetch(`/businesses/${businessId}`)
      .then((r) => r.json())
      .then((busi) => setCurrentBusiness(busi));

    setReceiptForm({ ...receiptForm, business_id: businessId });
  }, [params]);

  function handleReceiptDelete(id) {
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);
    setReceipts(updatedReceipts);
  }

  const filterReceiptsList = receipts.filter((rec) =>
    rec.name.includes(searchText)
  );

  const receiptsList = filterReceiptsList.map((receipt) => (
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
            setError(null);
            setReceiptForm(originalForm);
            setReceipts([...receipts, rec]);
            onCreateReceipts(false);
            setUploading(false);
            onNewReceipts(rec);
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
  }, [receiptForm.image]);

  function handleSubmit(e) {
    setUploading(true);
    onCreateReceipts(false);
    e.preventDefault();
    handleUpload();
  }

  function handleSearchTextCHange(e) {
    setSearchText(e.target.value);
  }

  return (
    <ReceiptsDiv>
      {!createReceiptsActive ? (
        <NameAndButton>
          <h2>bla</h2>
          <AddReceiptButtonDiv>
            <Button
              disabled={uploading ? true : false}
              variant="contained"
              onClick={() => onCreateReceipts(true)}
            >
              {uploading ? "Uploading!" : "Add A Receipt"}
            </Button>
          </AddReceiptButtonDiv>
        </NameAndButton>
      ) : null}
      {createReceiptsActive ? (
        <ReceiptForm onSubmit={handleSubmit}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Receipt Name"
            variant="outlined"
            name="name"
            type="text"
            required
            value={receiptForm.name}
            onChange={handleChange}
          />
          {error ? <p>{error}</p> : null}
          <TextField
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            name="amount"
            type="number"
            required
            value={receiptForm.amount}
            onChange={handleChange}
          />
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            name="image"
            type="file"
            required
            onChange={handleImageChange}
            accept="image"
            placeholder="image"
          />
          <Button variant="contained" type="submit" value="Add Receipt">
            Add receipt
          </Button>

          <Button variant="contained" onClick={() => onCreateReceipts(false)}>
            Cancel
          </Button>
        </ReceiptForm>
      ) : null}

      {/* <SearchReceiptForm>
        <h3>Find A Receipt By Name:</h3>
        <TextField
          size="small"
          id="outlined-basic"
          label="Find A Receipt"
          variant="outlined"
          type="test"
          required
          value={searchText}
          onChange={handleSearchTextCHange}
        />
      </SearchReceiptForm> */}
      {receiptsList}
    </ReceiptsDiv>
  );
}

export default Receipts;
