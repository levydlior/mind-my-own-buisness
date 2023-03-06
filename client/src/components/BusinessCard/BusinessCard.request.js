import { getStorage, ref, deleteObject } from "firebase/storage";

const deletedBusinessRequest = (business, onDelete) => {
  fetch(`/businesses/${business.id}`, {
    method: "DELETE",
  }).then((r) => {
    if (r.ok) {
      r.json().then((deletedBusiness) => onDelete(deletedBusiness));
    }
  });
};

export const handleDeleteFromFireBaeRequest = async (business, onDelete) => {
  const storage = getStorage();
  const deleteReceiptsFromFirebase = business.receipts.map((receipt) => {
    const desertRef = ref(storage, `${receipt.image}`);
    deleteObject(desertRef)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  });

  await deleteReceiptsFromFirebase;
  deletedBusinessRequest(business, onDelete);
};
