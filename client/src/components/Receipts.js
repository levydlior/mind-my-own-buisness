import { useEffect, useState } from "react";
import { useParams } from "react-router";
import storage from "./../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import ReceiptFormPopOver from "./ReceiptFormPopOver";
import CardCollapse from "./CardCollapse";
import Sort from "./Sort";

const SearchReceiptForm = styled.form`
  text-align: center;
`;

const ReceiptListContent = styled.div`
  margin-bottom: 20px;
`;

const NameAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReceiptsDiv = styled.div`
  padding-inline: 2rem;
  width: 80%;
  border: solid 1px;
  margin-left: 35px;
  border-radius: 20px;
  box-shadow: 10px 10px 5px lightblue;
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
  const [sortBy, setSortBy] = useState("none");

  const params = useParams();
  const { businessId } = params;

  const [receiptForm, setReceiptForm] = useState({
    name: "",
    amount: "",
    image: "",
    business_id: businessId,
    date_field: "",
  });

  const originalForm = {
    name: "",
    amount: "",
    image: "",
    business_id: businessId,
    date_field: "",
  };

  
  useEffect(() => {
    fetch(`/receipts/${businessId}`)
      .then((r) => r.json())
      .then((res) => setReceipts(res));

    fetch(`/businesses/${businessId}`)
      .then((r) => r.json())
      .then((fetchedBusiness) => setCurrentBusiness(fetchedBusiness));

    setReceiptForm({ ...receiptForm, business_id: businessId });
  }, [params]);

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

        setPercent(percent);
      },
      (err) => setError(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setReceiptForm({ ...receiptForm, image: url });
        });
      }
    );
  }

  function handleReceiptDelete(id) {
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);
    setReceipts(updatedReceipts);
  }
  const filterReceiptsList = receipts.filter((receiptObject) =>
    receiptObject.name.includes(searchText)
  );

  function receiptsList() {
    function sortPrices() {
      const sortedList = filterReceiptsList.sort((a, b) =>
        a.amount > b.amount ? 1 : -1
      );
      return sortedList;
    }
    function sortDates() {
      const sortedList = filterReceiptsList.sort((a, b) =>
        a.date_field > b.date_field ? 1 : -1
      );
      return sortedList;
    }

    if (sortBy === "price") {
      return sortPrices().map((receipt) => (
        <ReceiptListContent>
          <CardCollapse
            sx={{ margin: "1px" }}
            key={receipt.name}
            receipt={receipt}
            onReceiptDelete={handleReceiptDelete}
          />
        </ReceiptListContent>
      ));
    } else if (sortBy === "date") {
      return sortDates().map((receipt) => (
        <ReceiptListContent>
          <CardCollapse
            sx={{ margin: "1px" }}
            key={receipt.name}
            receipt={receipt}
            onReceiptDelete={handleReceiptDelete}
          />
        </ReceiptListContent>
      ));
    } else {
      return filterReceiptsList.map((receipt) => (
        <ReceiptListContent>
          <CardCollapse
            sx={{ margin: "1px" }}
            key={receipt.name}
            receipt={receipt}
            onReceiptDelete={handleReceiptDelete}
          />
        </ReceiptListContent>
      ));
    }
  }

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
    e.preventDefault();
    setUploading(true);
    onCreateReceipts(false);
    handleUpload();
  }

  function handleSearchTextCHange(e) {
    setSearchText(e.target.value);
  }

  return (
    <ReceiptsDiv>
      {!createReceiptsActive ? (
        <NameAndButton>
          {receipts.length > 0 ? (
            <h2>Business: {receipts[0].business.name}</h2>
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
            setReceiptForm={setReceiptForm}
            originalForm={originalForm}
          />
        </NameAndButton>
      ) : null}
      {receipts.length > 0 ? (
        <>
          <SearchReceiptForm>
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
          </SearchReceiptForm>
          <Sort sortBy={sortBy} setSortBy={setSortBy} />
        </>
      ) : null}

      {receiptsList()}
    </ReceiptsDiv>
  );
}

export default Receipts;
