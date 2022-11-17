import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const DeleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmButtonsDiv = styled.div`
  display: flex;
`;

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
  onDeleteBusiness,
}) {
  const handleClose = (e) => {
    e.stopPropagation();
    onClosing(e);
  };

  function handleBusinessDelete() {
    onDeleteBusiness();
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
          <DeleteDiv>
            <h3>Are You Sure?</h3>
            <ConfirmButtonsDiv>
              <Button color="secondary" onClick={handleBusinessDelete}>
                Yes
              </Button>
              <Button color="secondary" onClick={handleClose}>
                No
              </Button>
            </ConfirmButtonsDiv>
          </DeleteDiv>
        </Box>
      </Modal>
    </div>
  );
}
