import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  DeleteDiv,
  ConfirmButtonsDiv,
  style,
} from "./DeleteBusinessDialog.styles";
import { AppButton } from "../Login/Login.styles";

export const DeleteBusinessDialog = ({
  deleteBusinessActive,
  onClosing,
  onDeleteBusiness,
}) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClosing(e);
  };

  const handleBusinessDelete = () => {
    onDeleteBusiness();
  };

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
              <AppButton onClick={handleBusinessDelete}>Yes</AppButton>
              <AppButton onClick={handleClose}>No</AppButton>
            </ConfirmButtonsDiv>
          </DeleteDiv>
        </Box>
      </Modal>
    </div>
  );
};
