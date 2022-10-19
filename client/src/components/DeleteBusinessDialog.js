import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function DeleteBusinessDialog({
  deleteBusinessActive,
  onClosing,
  onDeleteBusiness
}) {
  const handleClose = (e) => {
    e.stopPropagation();
    onClosing(e);
  };

  function handleBusinessDelete(){
    onDeleteBusiness()
  }

  return (
    <div>
      <Modal
        open={deleteBusinessActive}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="targetDetail">
            <h2>This will delete the business and all its associated receipts</h2>
            <h3>Are You Sure?</h3>
            <Button onClick={handleBusinessDelete}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}
