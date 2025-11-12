import React from 'react';
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
  Chip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/general/LoadingScreen';
import { DatosEmbalaje } from '../../schema/secciones/DatosSeleccionEmbalaje';

const NuevaFilaTabla = () => ({
  hora: '',
  tipo_concepto: '',
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: '',
  d1: '',
  d2: '',
  d3: '',
  cajas_segunda: '',
  defecto_segundaN1: '',
  defecto_segundaN2: '',
  defecto_segundaN3: '',
  defecto_segundaN4: '',
  defecto_segundaN5: '',
  defecto_segundaN6: '',
  defecto_segundaN7: '',
  defecto_segundaN8: '',
  defecto_segundaN9: '',
  defecto_segundaN10: '',
  cajas_tercera: '',
  defecto_terceraN1: '',
  defecto_terceraN2: '',
  defecto_terceraN3: '',
  defecto_terceraN4: '',
  defecto_terceraN5: '',
  defecto_terceraN6: '',
  defecto_terceraN7: '',
  cajas_casco: '',
  defecto_cascoN1: '',
  defecto_cascoN2: '',
  defecto_cascoN3: '',
  defecto_cascoN4: '',
  espacio_min: '',
});
const rows = 8;
function extractArrayFieldErrors(zodError, arrayFieldName) {
  const rows = [];
  for (const issue of zodError.issues) {
    const path = issue.path;
    // esperamos paths como: ['tabla_atomizado', 3, 'pba1_bareas']
    if (!path || path[0] !== arrayFieldName) continue;
    const idx = path[1];
    const key = path[2];

    if (typeof idx !== 'number' || typeof key !== 'string') continue;

    if (!rows[idx]) rows[idx] = {};
    if (!rows[idx][key]) rows[idx][key] = [];
    rows[idx][key].push(issue.message);
  }
  return rows;
}

export default function SerigraficaDecoradodoModal({
  open,
  onClose,
  fetchById,
  updatedById,
  id,
  isEditing,
  onSave,
}) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [obsInput, setObsInput] = useState('');
  //errores
  const [tablaError, setTablaError] = useState({});
  const [error, setError] = useState([{}]);
  const [loadingUpdate, setloadingUpdate] = useState(false);

  const addObs = () => {
    const v = obsInput.trim();
    console.log('valor ', v);
    if (!v) return;
    setForm((f) => ({
      ...f,
      observacion_embalaje: [
        ...(f.observacion_embalaje ?? []),
        { observacion: v },
      ],
    }));
    setObsInput('');
  };

  const removeObs = (index) => {
    setForm((f) => ({
      ...f,
      observacion_embalaje: f.observacion_embalaje.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const rows = Array.isArray(f?.tabla_seleccion_embalaje)
        ? [...f.tabla_seleccion_embalaje]
        : [];
      if (idx < 0 || idx >= rows.length) return f; // evita índices fuera de rango
      rows[idx] = { ...(rows[idx] ?? {}), [field]: value };
      return { ...f, tabla_seleccion_embalaje: rows };
    });

    // Usa el setter real de errores (p.ej., setTablaError)
    setTablaError?.((prev) => {
      const arr = Array.isArray(prev) ? [...prev] : [];
      const rowErr = { ...(arr[idx] ?? {}) };
      delete rowErr[field];
      arr[idx] = rowErr;

      // Opcional: limpia la fila si ya no tiene errores
      if (Object.keys(rowErr).length === 0) arr[idx] = undefined;

      return arr;
    });
  };

  const addRows = () => {
    setForm((f) => {
      if (f.tabla_seleccion_embalaje.length >= rows) return f;
      return {
        ...f,
        tabla_seleccion_embalaje: [
          ...f.tabla_seleccion_embalaje,
          NuevaFilaTabla(),
        ],
      };
    });
  };

  const removeRows = () => {
    setForm((f) => {
      if (f.tabla_seleccion_embalaje.length <= 0) return f;
      return {
        ...f,
        tabla_seleccion_embalaje: f.tabla_seleccion_embalaje.slice(0, -1),
      };
    });
  };
  useEffect(() => {
    if (!open || !id) return; // evita correr si no aplica

    let active = true; // evita setState tras unmount
    setLoading(true);

    (async () => {
      try {
        const data = await fetchById(id); // ← ahora sí esperamos aquí
        if (!active) return;

        if (data?.ok) setForm(data.datos ?? {});
        else toast.error(data?.msg || 'No se pudo cargar el registro');
      } catch (e) {
        if (active) toast.error(e?.message || 'Error del servidor');
      } finally {
        if (active) setLoading(false); // ← se apaga al terminar de verdad
      }
    })();

    return () => {
      active = false;
    };
  }, [open, id, fetchById]);

  const updateBase = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };
  const handleSave = async () => {
    const result = DatosEmbalaje.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      // console.log('errores ', fieldErrors);
      const tablaErrors = extractArrayFieldErrors(
        result.error,
        'tabla_seleccion_embalaje'
      );
      setError(fieldErrors);
      setTablaError(tablaErrors);
      toast.error('Datos incorrectos');
      return;
    } else {
      try {
        setloadingUpdate(true);
        const data = result.data;
        console.log(data);
        const response = await updatedById(id, data);
        console.log(response);
        await onSave();
        onClose(false);
        toast.success('✅ Editado exitoso');
      } catch (err) {
        console.error('Error al editar:', err);
        toast.error(err?.message || 'Error al editar');
      } finally {
        setloadingUpdate(false);
      }
    }
  };
  return (
    <Dialog open={open} fullWidth maxWidth="xl  ">
      <DialogTitle>
        Detalles de Control de Procesos - Seleccion y Embalaje
      </DialogTitle>
      {loading ? (
        <DialogContent>
          <LoadingScreen />
        </DialogContent>
      ) : (
        <DialogContent>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Fecha"
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                  error={!!error.fecha}
                  helperText={error.fecha?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Producto"
                  type="label"
                  name="producto"
                  value={form.producto}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                  error={!!error.producto}
                  helperText={error.producto?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Horno"
                  type="label"
                  name="horno"
                  value={form.horno}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                  error={!!error.horno}
                  helperText={error.horno?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Formato"
                  type="label"
                  name="formato"
                  value={form.formato}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                  error={!!error.formato}
                  helperText={error.formato?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Turno"
                  type="label"
                  name="turno"
                  value={form.turno}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                  error={!!error.turno}
                  helperText={error.turno?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Supervisor de Turno"
                  type="label"
                  name="supervisor_turno"
                  value={form.supervisor_turno}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                  error={!!error.supervisor_turno}
                  helperText={error.supervisor_turno?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Grupo #"
                  type="label"
                  name="grupo"
                  value={form.grupo}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                  error={!!error.grupo}
                  helperText={error.grupo?.[0]}
                />
              </Grid>
              {!isEditing ? (
                <Grid size={{ xs: 6, md: 5 }}>
                  <Paper>
                    <>
                      <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                        <Typography> Observaciones </Typography>
                        {(form.observacion_embalaje ?? []).map((txt, idx) => (
                          <Chip key={idx} label={txt.observacion} />
                        ))}
                      </Stack>
                    </>
                  </Paper>
                </Grid>
              ) : (
                <>
                  <Grid size={{ xs: 6, md: 5 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Observaciones"
                        value={obsInput}
                        onChange={(e) => setObsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') addObs();
                        }}
                      />
                    </Stack>

                    {/* Lista de observaciones agregadas */}
                    <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                      {(form.observacion_embalaje ?? []).map((txt, idx) => (
                        <Chip
                          key={idx}
                          label={txt.observacion}
                          onDelete={() => removeObs(idx)}
                        />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 6, md: 1 }}>
                    <Button onClick={addObs} variant="contained">
                      <AddIcon />
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
          {!isEditing ? (
            <Stack></Stack>
          ) : (
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ mb: 1 }}
            >
              <Button
                size="small"
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={addRows}
              >
                Agregar fila
              </Button>
              <Button
                size="small"
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={removeRows}
              >
                Quitar fila
              </Button>
            </Stack>
          )}
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
              overflowX: 'auto',
              borderRadius: 2,
              boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
            }}
          >
            <Table
              stickyHeader
              sx={{
                minWidth: 4500,
                tableLayout: 'fixed',
                width: '100%',
                borderCollapse: 'collapse',
                '& td, & th': { border: '1px solid #D1D5DB' },
                '& .MuiTableCell-root': {
                  p: { xs: 0.5, md: 0.75 },
                  fontSize: { xs: 11, md: 12 },
                  whiteSpace: { xs: 'normal', md: 'nowrap' },
                },
                '& thead th': {
                  background:
                    'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%) !important',
                  textTransform: 'uppercase',
                  letterSpacing: 0.4,
                },
                '& tbody tr:nth-of-type(odd)': {
                  backgroundColor: '#FAFAFA',
                },
                '& tbody tr:hover': { backgroundColor: '#F0F9FF' },
                '& tbody td.stickyCol, & thead th.stickyCol': {
                  position: 'sticky',
                  left: 0,
                  zIndex: 2,
                  backgroundColor: '#fff',
                  boxShadow: 'inset -1px 0 0 #D1D5DB',
                },
                '& thead th.stickyCol': { zIndex: 3 },
                '& .groupTitle': {
                  fontWeight: 800,
                  fontSize: { xs: 12, md: 13 },
                  letterSpacing: 0.2,
                },
              }}
            >
              <TableHead sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    rowSpan={2}
                    align="center"
                    className="groupTitle"
                    width={90}
                  >
                    Hora
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={15}
                    align="center"
                    className="groupTitle"
                  >
                    PRIMERA (CAJA) TONO - CALIBRE
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    Segunda
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={10}
                    align="center"
                    className="groupTitle"
                  >
                    DEFECTOS (PIEZAS)
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    Tercera
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={7}
                    align="center"
                    className="groupTitle"
                  >
                    DEFECTOS (PIEZAS)
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    Casco
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={4}
                    align="center"
                    className="groupTitle"
                  >
                    DEFECTOS (PIEZAS)
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    ESPACIO
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={3}
                    align="center"
                    className="groupTitle"
                  >
                    TIPO
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    sx={{ minWidth: 200 }}
                  >
                    A1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    c1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    C2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    C3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    D1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    D2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    D3
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    colSpan={1}
                    className="groupTitle"
                  >
                    cajas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN1"
                      value={form.segunda_defectoN1}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN1?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN2"
                      value={form.segunda_defectoN2}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN2?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN3"
                      value={form.segunda_defectoN3}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN3?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN4"
                      value={form.segunda_defectoN4}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN4?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN5"
                      value={form.segunda_defectoN5}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN5?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN6"
                      value={form.segunda_defectoN6}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN6?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN7"
                      value={form.segunda_defectoN7}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN7?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN8"
                      value={form.segunda_defectoN8}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN8?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN9"
                      value={form.segunda_defectoN9}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN9?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="segunda_defectoN10"
                      value={form.segunda_defectoN10}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.segunda_defectoN10?.[0]}
                    />
                  </TableCell>
                  <TableCell component="th" className="groupTitle">
                    CAJAS
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="tercera_defectoN1"
                      value={form.tercera_defectoN1}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.tercera_defectoN1?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="tercera_defectoN2"
                      value={form.tercera_defectoN2}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.tercera_defectoN2?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="tercera_defectoN3"
                      value={form.tercera_defectoN3}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.tercera_defectoN3?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="tercera_defectoN4"
                      value={form.tercera_defectoN4}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.tercera_defectoN4?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="tercera_defectoN5"
                      value={form.tercera_defectoN5}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.tercera_defectoN5?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="tercera_defectoN6"
                      value={form.tercera_defectoN6}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.tercera_defectoN6?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="tercera_defectoN7"
                      value={form.tercera_defectoN7}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.tercera_defectoN7?.[0]}
                    />
                  </TableCell>
                  <TableCell className="groupTitle">Cajas</TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="casco_defectoN1"
                      value={form.casco_defectoN1}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.casco_defectoN1?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="casco_defectoN2"
                      value={form.casco_defectoN2}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.casco_defectoN2?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="casco_defectoN3"
                      value={form.casco_defectoN3}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.casco_defectoN3?.[0]}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField
                      size="small"
                      name="casco_defectoN4"
                      value={form.casco_defectoN4}
                      onChange={updateBase}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.grupo}
                      helperText={error.casco_defectoN4?.[0]}
                    />
                  </TableCell>
                  <TableCell className="groupTitle" align="center">
                    (Min.)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form?.tabla_seleccion_embalaje?.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ padding: '1px', minWidth: 110 }}>
                      <TextField
                        size="small"
                        type="time"
                        fullWidth
                        value={row.hora}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'hora',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.hora}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }} colSpan={3}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.tipo_concepto}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'tipo_concepto',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.tipo_concepto}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.a1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'a1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.a1}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.a2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'a2',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.a2}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.a3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'a3',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.a3}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.b1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'b1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.b1}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.b2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'b2',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.b2}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.b3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'b3',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.b3}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.c1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'c1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.c1}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.c2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'c1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.c2}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.c3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'c3',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.c3}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.d1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'd1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.d1}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.d2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'd2',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.d2}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.d3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'd3',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.d3}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.cajas_segunda}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'cajas_segunda',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.cajas_segunda}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN1}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN2',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN2}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN3',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN3}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN4}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN4',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN4}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN5}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN5',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN5}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN6}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN6',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN6}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN7}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN7',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN7}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN8}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN8',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN8}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN9}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN9',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN9}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_segundaN10}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_segundaN10',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_segundaN10}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.cajas_tercera}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'cajas_tercera',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.cajas_tercera}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_terceraN1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_terceraN1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_terceraN1}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_terceraN2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_terceraN2',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_terceraN2}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_terceraN3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_terceraN3',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_terceraN3}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_terceraN4}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_terceraN4',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_terceraN4}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_terceraN5}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_terceraN5',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_terceraN5}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_terceraN6}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_terceraN6',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_terceraN6}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_terceraN7}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_terceraN7',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_terceraN7}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.cajas_casco}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'cajas_casco',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.cajas_casco}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_cascoN1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_cascoN1',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_cascoN1}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_cascoN2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_cascoN2',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_cascoN2}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_cascoN3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_cascoN3',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_cascoN3}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.defecto_cascoN4}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'defecto_cascoN4',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.defecto_cascoN4}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.espacio_min}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'espacio_min',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.espacio_min}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      )}

      <DialogActions sx={{ justifyContent: 'flex-end', pr: 3, pb: 3 }}>
        {!isEditing ? (
          <Button variant="outlined" onClick={onClose}>
            Cerrar Modal
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loadingUpdate}
              startIcon={
                loadingUpdate ? (
                  <CircularProgress size={16} color="inherit" />
                ) : undefined
              }
            >
              {loadingUpdate ? 'Guardando.....' : 'Guardas Cambios '}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
}
