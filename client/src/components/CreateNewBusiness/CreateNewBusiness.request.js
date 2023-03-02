export const postRequest = (
  businessForm,
  setError,
  onAddBusiness,
  setBusinessForm,
  setAnchorEl,
  initialForm
) => {
  fetch("/businesses", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(businessForm),
  }).then((r) => {
    if (r.ok) {
      r.json().then((business) => {
        setError(null);
        onAddBusiness(business);
        setBusinessForm(initialForm);
        setAnchorEl(null);
      });
    } else {
      r.json().then((error) => {
        setError(error);
        setBusinessForm(initialForm);
      });
    }
  });
};
