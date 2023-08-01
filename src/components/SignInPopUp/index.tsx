import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";

import SignIn from "../../pages/SignIn";
import { manageModal } from "../../redux/reducers/auth.reducer";
import { RootState } from "../../redux/store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignInPopUp() {
  const { isModalVisible } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={isModalVisible}
        onClose={() => dispatch(manageModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignIn />
        </Box>
      </Modal>
    </div>
  );
}
