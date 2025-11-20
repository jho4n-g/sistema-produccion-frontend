import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Divider,
  Stack,
  TableBody,
  TableContainer,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  FormHelperText,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function UserModal({
  open,
  fetchRoles,
  onClose,
  isEdit,
  selectedUser,

  onSave,
}) {
  const [form, setForm] = useState({
    name: '',
    roleIds: [],
  });
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !selectedUser) return; // evita correr si no aplica

    let active = true; // evita setState tras unmount
    setLoading(true);

    (async () => {
      try {
        const data = await fetchRoles(); // ← ahora sí esperamos aquí
        console.log(data.roles);
        if (!active) return;
        setForm({
          name: selectedUser.username || '',
          roleIds: selectedUser.roles
            ? selectedUser.roles.map((r) => r.id)
            : [],
        });
        if (data?.ok) setRolesDisponibles(data.roles ?? {});
        else toast.error(data?.msg || 'No se pudo cargar el registro');
      } catch (e) {
        if (active) toast.error(e?.message || 'Error del servidor');
      } finally {
        if (active) setLoading(false); // ← se apaga al terminar de verdadfi
      }
    })();

    return () => {
      active = false;
    };
  }, [open, selectedUser, fetchRoles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave();
    console.log(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              label="Username"
              name="username"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              label="contraseña"
              name="contraseñaUno"
              value={form.contraseñaUno}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              label="Comfirmar Contraseña"
              name="contraseñaDos"
              value={form.contraseñaDos}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="roles-label">Roles</InputLabel>
              <Select
                labelId="roles-label"
                multiple
                name="roleIds"
                value={form.roleIds}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, roleIds: e.target.value }))
                }
                input={<OutlinedInput label="Roles" />}
                renderValue={(selected) => (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {selected.map((value) => {
                      const r = rolesDisponibles.find((x) => x.id === value);
                      return <Chip key={value} label={r?.name || value} />;
                    })}
                  </Stack>
                )}
              >
                {rolesDisponibles.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    <Checkbox checked={form.roleIds.includes(r.id)} />
                    <ListItemText primary={r.name} />
                  </MenuItem>
                ))}
              </Select>

              {form.roleIds.length === 0 && (
                <FormHelperText error>
                  Debe seleccionar al menos un rol
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={loading}
          variant="contained"
        >
          {loading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
