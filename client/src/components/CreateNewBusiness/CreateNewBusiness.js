import { useState } from "react";
import { BusinessFormPopOver } from "../BusinessFormPopOver/BusinessFormPopOver";
import { postRequest } from "./CreateNewBusiness.request";

const CreateNewBusiness = ({ loggedUser, onAddBusiness }) => {
  const id = loggedUser.id;
  const [businessForm, setBusinessForm] = useState({
    name: "",
    user_id: id,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const [error, setError] = useState(null);

  const initialForm = {
    name: "",
    user_id: id,
  };

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;

    setBusinessForm({ ...businessForm, [target]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest(
      businessForm,
      setError,
      onAddBusiness,
      setBusinessForm,
      setAnchorEl,
      initialForm
    );
  };

  return (
    <div>
      <BusinessFormPopOver
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleSubmit={handleSubmit}
        businessForm={businessForm}
        handleChange={handleChange}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default CreateNewBusiness;
