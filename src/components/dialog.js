import {
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ConfirmationDialog = ({
  open,
  title = 'Title',
  message = 'Message',
  onClose,
  onConfirm,
  onCancel,
  yesLabel = 'Yes',
  noLabel = 'No',
  hasNoAction = true,
}) => {
  return <>
    <MUIDialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <strong>{title}</strong>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <strong>
            {message}
          </strong>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {hasNoAction && 
          <Button onClick={() => {
            if (onCancel) {
              onCancel();
            }
  
            onClose();
          }}>
            <strong style={{ color: 'black'}}>{noLabel}</strong>
          </Button>
        }

        <Button onClick={() => {
          if (onConfirm) {
            onConfirm();
          }

          onClose();
        }} autoFocus>
          <strong style={{ color: 'black'}}>{yesLabel}</strong>
        </Button>
      </DialogActions>
    </MUIDialog>
  </>
};

export {
  ConfirmationDialog,
};