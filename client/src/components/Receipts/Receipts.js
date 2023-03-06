import { useEffect, useState } from "react";
import { useParams } from "react-router";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import TextField from "@mui/material/TextField";
import {ReceiptFormPopOver} from "../ReceiptFormPopOver/ReceiptFormPopOver";
import {CardCollapse} from "../CardCollapse/CardCollapse";
import Sort from "../Sort/Sort";
import {
  SearchReceiptForm,
  ReceiptListContent,
  NameAndButton,
  ReceiptsDiv,
} from "./Receipts.styles";
import { getReceiptsRequest, postReceiptRequest } from "./Receipts.request";

const Receipts = ({
  onCreateReceipts,
  createReceiptsActive,
  onNewReceipts,
  loggedUser,
}) => {
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
    getReceiptsRequest(
      businessId,
      setReceipts,
      setCurrentBusiness,
      setReceiptForm,
      receiptForm
    );
  }, [params]);

  const handleUpload = async () => {
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
  };

  const handleReceiptDelete = (id) => {
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);
    setReceipts(updatedReceipts);
  };

  const filterReceiptsList = receipts.filter((receiptObject) =>
    receiptObject.name.includes(searchText)
  );

  const receiptsList = () => {
    const sortPrices = () => {
      const sortedList = filterReceiptsList.sort((a, b) =>
        a.amount > b.amount ? 1 : -1
      );
      return sortedList;
    };

    const sortDates = () => {
      const sortedList = filterReceiptsList.sort((a, b) =>
        a.date_field > b.date_field ? 1 : -1
      );
      return sortedList;
    };

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
  };

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;

    setReceiptForm({ ...receiptForm, [target]: value });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    postReceiptRequest(
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
    );
  }, [receiptForm.image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    onCreateReceipts(false);
    handleUpload();
  };

  const handleSearchTextCHange = (e) => {
    setSearchText(e.target.value);
  };

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
};

export default Receipts;
