import React, { useState } from 'react';

import {
  Container,
  Paper,
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Divider,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { toast } from 'react-toastify';
//** */
import { registerObj } from '../../../service/SeccionesProduccion/Atomizado.js';
//zod
import { FormSchema } from '../../../schema/ControlAtomizado.schema.js';

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

const filas = [
  { key: 'hora', label: 'HORA', type: 'time' },
  { key: 'silo_n', label: 'SILO N°' },
  { key: 'humedad', label: '% HUMEDAD' },
  { key: 'malla_35', label: 'MALLA 35' },
  { key: 'malla_40', label: 'MALLA 40' },
  { key: 'malla_50', label: 'MALLA 50' },
  { key: 'malla_70', label: 'MALLA 70' },
  { key: 'malla_100', label: 'MALLA 100' },
  { key: 'malla_120', label: 'MALLA 120' },
  { key: 'fondo', label: 'FONDO' },
];

const NuevaObservacion = () => ({
  observacion: '',
});
const makeGranulometriaCol = () => ({
  hora: '',
  silo_n: '',
  humedad: '',
  malla_35: '',
  malla_40: '',
  malla_50: '',
  malla_70: '',
  malla_100: '',
  malla_120: '',
  fondo: '',
});
const makeFosaRow = (label) => ({
  label, // "1" | "2" | "SERVICIO"
  densidad: '',
  viscosidad: '',
  residuos: '',
});

const nuevaCargaTablaAtomizado = () => ({
  hora: '',
  pba1_bareas: '',
  pa1_bareas: '',
  pba2_bareas: '',
  pa2_bareas: '',
  pba3_bareas: '',
  pa3_bareas: '',
  te_c1: '',
  te_c2: '',
  ts_c: '',
  lanz_n: '',
  humedad1: '',
  silo_descarga: '',
  producto: '',
  n_silo_llenos: '',
});

const initialForm = () => ({
  fecha: '',
  hora_inicio: '',
  hora_final: '',
  turno: '',
  nombre_operador: '',
  supervisor_turno: '',
  observaciones: [],
  tabla_atomizado: [],
  control_granulometria: [
    makeGranulometriaCol(),
    makeGranulometriaCol(),
    makeGranulometriaCol(),
    makeGranulometriaCol(),
  ],
  control_fosas: [makeFosaRow('1'), makeFosaRow('2'), makeFosaRow('SERVICIO')],
});

const rows = 8;
export default function ControlAtomizadoPage() {
  const [form, setForm] = useState(initialForm());
  const [obsInput, setObsInput] = useState('');
  const [error, setError] = useState({});
  const [tablaAtomizadoError, setTablaAtomizadoError] = useState({});

  const addObs = () => {
    const v = obsInput.trim();
    console.log('valor ', v);
    if (!v) return;
    setForm((f) => ({
      ...f,
      observaciones: [...(f.observaciones ?? []), { observacion: v }],
    }));
    setObsInput('');
  };

  const removeObs = (index) => {
    setForm((f) => ({
      ...f,
      observaciones: f.observaciones.filter((_, i) => i !== index),
    }));
  };

  const updateBase = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };
  const setGran = (colIdx, field, value) => {
    setForm((f) => {
      const next = [...f.control_granulometria];
      next[colIdx] = { ...next[colIdx], [field]: value };
      return { ...f, control_granulometria: next };
    });
  };
  const setFosa = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.control_fosas];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, control_fosas: next };
    });
  };

  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.tabla_atomizado];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, tabla_atomizado: next };
    });
    setTablaAtomizadoError((prev) => {
      const arr = Array.isArray(prev) ? [...prev] : [];
      const rowErr = { ...(arr[idx] || {}) };
      delete rowErr[field]; // elimina la propiedad del campo
      arr[idx] = rowErr;
      return arr;
    });
  };
  const addRows = () => {
    setForm((f) => {
      if (f.tabla_atomizado.length >= rows) return f;
      return {
        ...f,
        tabla_atomizado: [...f.tabla_atomizado, nuevaCargaTablaAtomizado()],
      };
    });
  };
  const saveData = async () => {
    console.log(form);
    // console.log('Antes del zod', form);
    const result = FormSchema.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      // console.log('errores ', fieldErrors);
      const tablaErrors = extractArrayFieldErrors(
        result.error,
        'tabla_atomizado'
      );

      setTablaAtomizadoError(tablaErrors);
      // console.log('erroes tablaAtomizado ', tablaErrors);
      toast.error('Datos incorrectos');
      setError(fieldErrors);
      return;
    } else {
      // console.log('despues del zod ', result.data);
      // console.log(result.data);
      try {
        const res = await registerObj(result.data);
        console.log(res);

        toast.success('✅ Registro exitoso');
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };

  const removeRows = () => {
    setForm((f) => {
      if (f.tabla_atomizado.length <= 0) return f;
      return { ...f, tabla_atomizado: f.tabla_atomizado.slice(0, -1) };
    });
  };

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Paper>
        <Container
          maxWidth="xl"
          sx={{ py: { xs: 2, md: 3 }, minHeight: 'calc(100vh - 32px)' }}
        >
          <Paper
            variant="outlined"
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 2,
              px: 2,
              py: 1.5,
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
                CONTROL DE PROCESO DE ATOMIZADO
              </Typography>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Fecha"
                  type="date"
                  name="fecha"
                  error={!!error.fecha}
                  helperText={error.fecha?.[0]}
                  value={form.fecha}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Hora Inicio"
                  type="time"
                  name="hora_inicio"
                  error={!!error.hora_inicio}
                  helperText={error.hora_inicio?.[0]}
                  value={form.hora_inicio}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Hora Fila"
                  type="time"
                  name="hora_final"
                  error={!!error.hora_final}
                  helperText={error.hora_final?.[0]}
                  value={form.hora_final}
                  onChange={updateBase}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Turno"
                  type="label"
                  name="turno"
                  error={!!error.turno}
                  helperText={error.turno?.[0]}
                  value={form.turno}
                  onChange={updateBase}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Operador"
                  type="label"
                  name="nombre_operador"
                  error={!!error.nombre_operador}
                  helperText={error.nombre_operador?.[0]}
                  value={form.nombre_operador}
                  onChange={updateBase}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Superviso de Turno"
                  type="label"
                  name="supervisor_turno"
                  error={!!error.supervisor_turno}
                  helperText={error.supervisor_turno?.[0]}
                  value={form.supervisor_turno}
                  onChange={updateBase}
                />
              </Grid>
              <Grid size={{ xs: 8, md: 5 }}>
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
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mt: 1 }}
                >
                  {(form.observaciones ?? []).map((txt, idx) => (
                    <Chip
                      key={idx}
                      label={txt.observacion}
                      onDelete={() => removeObs(idx)}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 8, md: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" size="small" onClick={addObs}>
                    <AddIcon />
                  </Button>
                </Stack>
              </Grid>
              <Grid size={{ xs: 8, md: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<UploadIcon />}
                  onClick={saveData}
                >
                  Registrar Datos
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            sx={{ mb: 1 }}
          >
            <Button
              size="small"
              onClick={addRows}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Agregar fila
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={removeRows}
              startIcon={<DeleteIcon />}
            >
              Quitar fila
            </Button>
          </Stack>

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
                    width={90}
                    align="center"
                    className="groupTitle"
                  >
                    Hora
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    PB1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    PA1
                  </TableCell>
                  <TableCell
                    component="th"
                    rowSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    PB2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    PA2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    PB3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    PA3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    TE
                  </TableCell>
                  <TableCell
                    component="th"
                    rowSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    TS
                  </TableCell>

                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    LANZ
                  </TableCell>
                  <TableCell
                    component="th"
                    rowSpan={3}
                    align="center"
                    className="groupTitle"
                  >
                    HUMEDAD
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    SILO
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    rowSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    PRODUCTO
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    rowSpan={2}
                    align="center"
                    className="groupTitle"
                    sx={{
                      width: 100, // px o %
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                  >
                    N° <br />
                    SILO LLENOS
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Bareas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Bareas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Bareas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Bareas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Bareas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Bareas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    °C
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    °C
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    °C
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Descarga
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.tabla_atomizado.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <TextField
                        size="small"
                        type="time"
                        value={row.hora}
                        onChange={(e) => {
                          setCargaTabla(idx, 'hora', e.target.value);
                        }}
                        error={!!tablaAtomizadoError[idx]?.hora}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pba1_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pba1_bareas', e.target.value);
                        }}
                        error={!!tablaAtomizadoError[idx]?.pba1_bareas}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pa1_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pa1_bareas', e.target.value);
                        }}
                        error={!!tablaAtomizadoError[idx]?.pa1_bareas}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pba2_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pba2_bareas', e.target.value);
                        }}
                        error={!!tablaAtomizadoError[idx]?.pba2_bareas}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pa2_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pa2_bareas', e.target.value);
                        }}
                        error={!!tablaAtomizadoError[idx]?.pa2_bareas}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pba3_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pba3_bareas', e.target.value);
                        }}
                        error={!!tablaAtomizadoError[idx]?.pba3_bareas}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pa3_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pa3_bareas', e.target.value);
                        }}
                        error={!!tablaAtomizadoError[idx]?.pa3_bareas}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.te_c1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'te_c1', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.te_c2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'te_c2', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.ts_c}
                        onChange={(e) => {
                          setCargaTabla(idx, 'ts_c', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.lanz_n}
                        onChange={(e) => {
                          setCargaTabla(idx, 'lanz_n', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.humedad1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'humedad1', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.silo_descarga}
                        onChange={(e) => {
                          setCargaTabla(idx, 'silo_descarga', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        value={row.producto}
                        onChange={(e) => {
                          setCargaTabla(idx, 'producto', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.n_silo_llenos}
                        onChange={(e) => {
                          setCargaTabla(idx, 'n_silo_llenos', e.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ mr: 2, mb: 4 }} />
          <Stack direction="row">
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
                  '& tbody tr:nth-of-type(odd)': { backgroundColor: '#FAFAFA' },
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
                      colSpan={5}
                      align="center"
                      className="groupTitle"
                    >
                      CONTROL GRANULOMETRIA
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filas.map((r) => (
                    <TableRow key={r.key}>
                      <TableCell className="groupTitle">{r.label}</TableCell>

                      {form.control_granulometria.map((col, colIdx) => (
                        <TableCell align="center" key={colIdx}>
                          <TextField
                            size="small"
                            type={r.type ?? 'text'}
                            value={col[r.key] ?? ''}
                            onChange={(e) =>
                              setGran(colIdx, r.key, e.target.value)
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                  '& tbody tr:nth-of-type(odd)': { backgroundColor: '#FAFAFA' },
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
                      colSpan={4}
                      align="center"
                      className="groupTitle"
                    >
                      CONTROL FOSAS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Encabezado de esa sección ya lo tienes */}
                  {form.control_fosas.map((row, idx) => (
                    <TableRow key={row.label}>
                      <TableCell align="center" className="groupTitle">
                        {row.label}
                      </TableCell>

                      <TableCell align="center">
                        <TextField
                          size="small"
                          inputProps={{ step: '0.01' }}
                          value={row.densidad}
                          onChange={(e) =>
                            setFosa(idx, 'densidad', e.target.value)
                          }
                        />
                      </TableCell>

                      <TableCell align="center">
                        <TextField
                          size="small"
                          inputProps={{ step: '0.01' }}
                          value={row.viscosidad}
                          onChange={(e) =>
                            setFosa(idx, 'viscosidad', e.target.value)
                          }
                        />
                      </TableCell>

                      <TableCell align="center">
                        <TextField
                          size="small"
                          inputProps={{ step: '0.01' }}
                          value={row.residuos}
                          onChange={(e) =>
                            setFosa(idx, 'residuos', e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
}
