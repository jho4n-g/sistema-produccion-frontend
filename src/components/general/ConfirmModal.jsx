import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);

  const handleClose = async () => {
    try {
      setLoading(true);
      await Promise.resolve(onConfirm?.()); // ← ¡IMPORTANTE!
      onCancel?.();
    } catch (e) {
      toast.error(e.message || 'Error al editar la acción');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} vaiant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleClose} color="primary" variant="contained">
          {loading ? 'Procesando...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
