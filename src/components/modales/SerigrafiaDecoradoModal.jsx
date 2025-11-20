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

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/general/LoadingScreen';
import { DatosSerigrafia } from '../../schema/secciones/DatosSerigrafia.schema';
import ConfirmModal from '../general/ConfirmModal';
import { useEffect, useState } from 'react';

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
const rows = 8;

const NuevaFilaTabla = () => ({
  hora: '',
  operador_apl_pasta1: '',
  sp_apl_pasta1: '',
  operador_v_pasta1: '',
  sp_v_pasta1: '',
  operador_d_pasta1: '',
  sp_d_pasta1: '',
  operador_apl_pasta2: '',
  sp_apl_pasta2: '',
  operador_v_pasta2: '',
  sp_v_pasta2: '',
  operador_d_pasta2: '',
  sp_d_pasta2: '',
  operador_apl_pasta3: '',
  sp_apl_pasta3: '',
  operador_v_pasta3: '',
  sp_v_pasta3: '',
  operador_d_pasta3: '',
  sp_d_pasta3: '',
  operador_apl_pasta4: '',
  sp_apl_pasta4: '',
  operador_v_pasta4: '',
  sp_v_pasta4: '',
  operador_d_pasta4: '',
  sp_d_pasta4: '',
});

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

  const [confirmOpen, setConfirmOpen] = useState(false);

  const addObs = () => {
    const v = obsInput.trim();
    console.log('valor ', v);
    if (!v) return;
    setForm((f) => ({
      ...f,
      observacionesSer: [...(f.observacionesSer ?? []), { observacion: v }],
    }));
    setObsInput('');
  };

  const removeObs = (index) => {
    setForm((f) => ({
      ...f,
      observacionesSer: f.observacionesSer.filter((_, i) => i !== index),
    }));
  };
  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const rows = Array.isArray(f?.datos_tabla_serigrafiado)
        ? [...f.datos_tabla_serigrafiado]
        : [];
      if (idx < 0 || idx >= rows.length) return f; // evita índices fuera de rango
      rows[idx] = { ...(rows[idx] ?? {}), [field]: value };
      return { ...f, datos_tabla_serigrafiado: rows };
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
      if (f.datos_tabla_serigrafiado.length >= rows) return f;
      return {
        ...f,
        datos_tabla_serigrafiado: [
          ...f.datos_tabla_serigrafiado,
          NuevaFilaTabla(),
        ],
      };
    });
  };

  const removeRows = () => {
    setForm((f) => {
      if (f.datos_tabla_serigrafiado.length <= 0) return f;
      return {
        ...f,
        datos_tabla_serigrafiado: f.datos_tabla_serigrafiado.slice(0, -1),
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

        if (data?.ok) setForm(data.dato ?? {});
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
    const result = DatosSerigrafia.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      // console.log('errores ', fieldErrors);
      const tablaErrors = extractArrayFieldErrors(
        result.error,
        'datos_tabla_serigrafiado'
      );
      setError(fieldErrors);
      setTablaError(tablaErrors);
      toast.error('Datos incorrectos');
      return;
    } else {
      try {
        setloadingUpdate(true);
        const data = result.data;
        console.log('validado ', data);
        const response = await updatedById(id, data);
        if (!response?.ok)
          throw new Error(response?.msg || 'Error al editar el registro');
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
    <>
      <Dialog open={open} fullWidth maxWidth="xl  ">
        <DialogTitle>
          Detalles de Control de Procesos - Serigrafica y Decorado
        </DialogTitle>
        {loading ? (
          <DialogContent>
            <LoadingScreen />
          </DialogContent>
        ) : (
          <DialogContent>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Grid container spacing={1}>
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
                    label="Linea"
                    type="label"
                    name="linea"
                    value={form.linea}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !isEditing }}
                    error={!!error.linea}
                    helperText={error.linea?.[0]}
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
                <Grid size={{ xs: 6, md: 4 }}>
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
                <Grid size={{ xs: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Operador"
                    type="label"
                    name="operador"
                    value={form.operador}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !isEditing }}
                    error={!!error.operador}
                    helperText={error.operador?.[0]}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 7 }}>
                  {!isEditing ? (
                    <Paper>
                      <>
                        <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                          <Typography> Observaciones </Typography>
                          {(form.observacionesSer ?? []).map((txt, idx) => (
                            <Chip key={idx} label={txt.observacion} />
                          ))}
                        </Stack>
                      </>
                    </Paper>
                  ) : (
                    <>
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
                        {(form.observacionesSer ?? []).map((txt, idx) => (
                          <Chip
                            key={idx}
                            label={txt.observacion}
                            onDelete={() => removeObs(idx)}
                          />
                        ))}
                      </Stack>
                    </>
                  )}
                </Grid>
                {!isEditing ? (
                  <Grid size={{ xs: 6, md: 1 }}></Grid>
                ) : (
                  <Grid size={{ xs: 6, md: 1 }}>
                    <Button variant="contained" onClick={addObs}>
                      <AddIcon />
                    </Button>
                  </Grid>
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
                mb: 3,
              }}
            >
              <Table
                stickyHeader
                sx={{
                  tableLayout: { xs: 'auto', md: 'fixed' },
                  width: '100%',
                  minWidth: 1800,
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
                      rowSpan={3}
                      style={{ width: 120 }}
                      align="center"
                      className="groupTitle"
                    >
                      Hora
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={6}
                      align="center"
                      className="groupTitle"
                      style={{ width: 550 }}
                    >
                      <TextField
                        size="small"
                        label="Pasta :1"
                        name="pasta1"
                        value={form.pasta1}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.pasta1}
                        helperText={error.pasta1?.[0]}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={6}
                      align="center"
                      className="groupTitle"
                      style={{ width: 550 }}
                    >
                      <TextField
                        size="small"
                        label="Pasta :2"
                        name="pasta2"
                        value={form.pasta2}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.pasta2}
                        helperText={error.pasta2?.[0]}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={6}
                      align="center"
                      className="groupTitle"
                      style={{ width: 550 }}
                    >
                      <TextField
                        size="small"
                        label="Pasta :3"
                        name="pasta3"
                        value={form.pasta3}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.pasta3}
                        helperText={error.pasta3?.[0]}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={6}
                      align="center"
                      className="groupTitle"
                      style={{ width: 550 }}
                    >
                      <TextField
                        size="small"
                        label="Pasta :4"
                        name="pasta4"
                        value={form.pasta4}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.pasta4}
                        helperText={error.pasta4?.[0]}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      APL [G]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      V [s]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      D [g/cm³]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      APL [G]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      V [s]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      D [g/cm³]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      APL [G]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      V [s]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      D [g/cm³]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      APL [G]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      V [s]
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      D [g/cm³]
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Operador
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      S.P.
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {form?.datos_tabla_serigrafiado?.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <TextField
                          size="small"
                          type="time"
                          value={row.hora}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(idx, 'hora', e.target.value);
                          }}
                          error={!!tablaError[idx]?.hora}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_apl_pasta1}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_apl_pasta1',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_apl_pasta1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_apl_pasta1}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_apl_pasta1', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_apl_pasta1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_v_pasta1}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_v_pasta1',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_v_pasta1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_v_pasta1}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_v_pasta1', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_v_pasta1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_d_pasta1}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_d_pasta1',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_d_pasta1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_d_pasta1}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_d_pasta1', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_d_pasta1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_apl_pasta2}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_apl_pasta2',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_apl_pasta2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_apl_pasta2}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_apl_pasta2', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_apl_pasta2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_v_pasta2}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_v_pasta2',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_v_pasta2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_v_pasta2}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_v_pasta2', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_v_pasta2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_d_pasta2}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_d_pasta2',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_d_pasta2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_d_pasta2}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_d_pasta2', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_d_pasta2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_apl_pasta3}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_apl_pasta3',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_apl_pasta3}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_apl_pasta3}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_apl_pasta3', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_apl_pasta3}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_v_pasta3}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_v_pasta3',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_v_pasta3}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_v_pasta3}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_v_pasta3', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_v_pasta3}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_d_pasta3}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_d_pasta3',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_d_pasta3}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_d_pasta3}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_d_pasta3', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_d_pasta3}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_apl_pasta4}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_apl_pasta4',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_apl_pasta4}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_apl_pasta4}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_apl_pasta4', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_apl_pasta4}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_v_pasta4}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_v_pasta4',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_v_pasta4}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_v_pasta4}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_v_pasta4', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_v_pasta4}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_d_pasta4}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_d_pasta4',
                              e.target.value
                            );
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.operador_d_pasta4}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sp_d_pasta4}
                          onChange={(e) => {
                            setCargaTabla(idx, 'sp_d_pasta4', e.target.value);
                          }}
                          InputProps={{ readOnly: !isEditing }}
                          error={!!tablaError[idx]?.sp_d_pasta4}
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
                onClick={() => setConfirmOpen(true)}
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
      <ConfirmModal
        open={confirmOpen}
        title="¿Esta seguro que desea editar?"
        message="Esta acción no se puede deshacer."
        onConfirm={handleSave}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
