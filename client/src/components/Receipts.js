import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReceiptCard from "./ReceiptCard";
import storage from "./../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styled from "@emotion/styled";

import ReceiptFormPopOver from "./ReceiptFormPopOver";

// const SearchReceiptForm = styled.form`
//   text-align: center;
// `;

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
  const [anchorEl, setAnchorEl] = useState(null);

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
      .then((fetchedBusiness) => setCurrentBusiness(fetchedBusiness));

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

  console.log(anchorEl);

  return (
    <ReceiptsDiv>
      {!createReceiptsActive ? (
        <NameAndButton>
          {receipts.length > 0 ? (
            <h2>{receipts[0].business.name}</h2>
          ) : (
            <h2>No Receipts Yet</h2>
          )}

          <ReceiptFormPopOver
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            receiptForm={receiptForm}
            handleChange={handleChange}
            error={error}
            uploading={uploading}
            setAnchorEl={setAnchorEl}
            anchorEl={anchorEl}
            setError={setError}
          />
        </NameAndButton>
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
