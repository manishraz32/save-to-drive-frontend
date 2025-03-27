import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function CommonDialog({
  loading,
  open,
  title,
  description,
  onClose,
  onSubmit,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await onSubmit(formJson);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          {description && <DialogContentText>{description}</DialogContentText>}
          <TextField
            autoFocus
            required
            margin="dense"
            id="docName"
            name="docName"
            label="Document Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <LoadingButton type="submit" loading={loading} variant="contained">
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
