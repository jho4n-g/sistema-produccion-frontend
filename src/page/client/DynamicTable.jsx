// SimpleCargasDescargas.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Stack,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_FILAS = 10;

const NuevaCarga = () => ({ molino: '', cantidad: 0 });
const NuevaDescarga = () => ({ molino: '', cantidad: 0 });

const initialForm = () => ({
  cargandoMolinos: [NuevaCarga()],
  descargandoMolinos: [NuevaDescarga()],
});

export default function SimpleCargasDescargas() {
  const [form, setForm] = useState(initialForm());
  const [isEditable, setIsEditable] = useState(true);
  const [snapshot, setSnapshot] = useState(null);

  // Actualiza una celda de CARGA (fila idx, campo field)
  const setCarga = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.cargandoMolinos];
      next[idx] = {
        ...next[idx],
        [field]: field === 'cantidad' ? Number(value) : value,
      };
      return { ...f, cargandoMolinos: next };
    });
  };

  // Actualiza una celda de DESCARGA (fila idx, campo field)
  const setDescarga = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.descargandoMolinos];
      next[idx] = {
        ...next[idx],
        [field]: field === 'cantidad' ? Number(value) : value,
      };
      return { ...f, descargandoMolinos: next };
    });
  };

  // Agrega una fila en ambos lados
  const addRow = () => {
    setForm((f) => {
      if (f.cargandoMolinos.length >= MAX_FILAS) return f;
      return {
        ...f,
        cargandoMolinos: [...f.cargandoMolinos, NuevaCarga()],
        descargandoMolinos: [...f.descargandoMolinos, NuevaDescarga()],
      };
    });
  };

  // Elimina la última fila en ambos lados
  const removeRow = () => {
    setForm((f) => {
      if (f.cargandoMolinos.length <= 1) return f;
      return {
        ...f,
        cargandoMolinos: f.cargandoMolinos.slice(0, -1),
        descargandoMolinos: f.descargandoMolinos.slice(0, -1),
      };
    });
  };

  const obtenerValores = () => {
    const payload = {
      cargandoMolinos: form.cargandoMolinos.map((r) => ({ ...r })),
      descargandoMolinos: form.descargandoMolinos.map((r) => ({ ...r })),
    };
    console.log('VALORES:', payload);
    setSnapshot(payload);
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Paper sx={{ p: 2, maxWidth: 1100, mx: 'auto' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">Cargas y Descargas</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => setIsEditable((v) => !v)}>
              {isEditable ? 'Bloquear edición' : 'Habilitar edición'}
            </Button>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={addRow}
            >
              Agregar fila
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              variant="outlined"
              onClick={removeRow}
            >
              Eliminar última
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={2}>
          {/* CARGANDO */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Cargando molinos
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Molino</TableCell>
                  <TableCell align="right" style={{ width: 120 }}>
                    Cantidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.cargandoMolinos.map((row, idx) => (
                  <TableRow key={`carga-${idx}`}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Molino..."
                        value={row.molino}
                        onChange={(e) =>
                          setCarga(idx, 'molino', e.target.value)
                        }
                        disabled={!isEditable}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        size="small"
                        type="number"
                        inputProps={{ min: 0, step: 1 }}
                        value={row.cantidad}
                        onChange={(e) =>
                          setCarga(idx, 'cantidad', e.target.value)
                        }
                        disabled={!isEditable}
                        sx={{ width: 110 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>

          {/* DESCARGANDO */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Descargando molinos
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Molino</TableCell>
                  <TableCell align="right" style={{ width: 120 }}>
                    Cantidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.descargandoMolinos.map((row, idx) => (
                  <TableRow key={`descarga-${idx}`}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Molino..."
                        value={row.molino}
                        onChange={(e) =>
                          setDescarga(idx, 'molino', e.target.value)
                        }
                        disabled={!isEditable}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        size="small"
                        type="number"
                        inputProps={{ min: 0, step: 1 }}
                        value={row.cantidad}
                        onChange={(e) =>
                          setDescarga(idx, 'cantidad', e.target.value)
                        }
                        disabled={!isEditable}
                        sx={{ width: 110 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={obtenerValores}>
            Obtener valores
          </Button>
        </Stack>

        {snapshot && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Snapshot:
            </Typography>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(snapshot, null, 2)}
            </pre>
          </>
        )}
      </Paper>
    </Box>
  );
}
