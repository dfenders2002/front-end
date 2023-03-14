import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fb8c00',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalPopUp({ open, setOpen, title, subTitle }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize:'30px' }}>
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize:'20px'}}>
            {subTitle}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
