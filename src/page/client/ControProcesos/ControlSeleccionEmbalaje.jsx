import React from 'react';
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
  Chip,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';

const DatosTabla = () => ({
  hora: '',
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

const NuevaObservacion = () => ({
  observacion: '',
});

const formInitial = () => ({
  fecha: '',
  producto: '',
  horno: '',
  formato: '',
  turno: '',
  supervisor_turno: '',
  grupo: '',
  observaciones: [],
  segunda_defectoN1: '',
  segunda_defectoN2: '',
  segunda_defectoN3: '',
  segunda_defectoN4: '',
  segunda_defectoN5: '',
  segunda_defectoN6: '',
  segunda_defectoN7: '',
  segunda_defectoN8: '',
  segunda_defectoN9: '',
  segunda_defectoN10: '',
  tercera_defectoN1: '',
  tercera_defectoN2: '',
  tercera_defectoN3: '',
  tercera_defectoN4: '',
  tercera_defectoN5: '',
  tercera_defectoN6: '',
  tercera_defectoN7: '',
  casco_defectoN1: '',
  casco_defectoN2: '',
  casco_defectoN3: '',
  casco_defectoN4: '',
  tabla_seleccion_embalaje: [],
});
const rows = 8;
export default function ControlSeleccionEmbalaje() {
  const [form, setForm] = useState(formInitial());
  const [obsInput, setObsInput] = useState('');

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
  };

  const saveDatos = () => {
    console.log(form);
  };
  const addRows = () => {
    setForm((f) => {
      if (f.tabla_seleccion_embalaje.length >= rows) return f;
      return {
        ...f,
        tabla_seleccion_embalaje: [...f.tabla_seleccion_embalaje, DatosTabla()],
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
  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.tabla_seleccion_embalaje];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, tabla_seleccion_embalaje: next };
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
                CONTROL DE PROCESO - SELECCION Y EMBALAJE
              </Typography>
            </Stack>
          </Paper>
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
                />
              </Grid>
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
                  {(form.observaciones ?? []).map((txt, idx) => (
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
              <Grid size={{ xs: 6, md: 4 }}>
                <Button
                  onClick={saveDatos}
                  variant="contained"
                  startIcon={<UploadIcon />}
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
              onClick={addRows}
              size="small"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Agregar fila
            </Button>
            <Button
              onClick={removeRows}
              size="small"
              variant="contained"
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
              mb: 5,
            }}
          >
            <Table
              stickyHeader
              sx={{
                minWidth: 3000,
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
                    align="center"
                    className="groupTitle"
                    width={90}
                  >
                    Hora
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={12}
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
                    colSpan={1}
                    align="center"
                    className="groupTitle"
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
                    />
                  </TableCell>
                  <TableCell className="groupTitle" align="center">
                    (Min.)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.tabla_seleccion_embalaje.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="time"
                        value={row.hora}
                        onChange={(e) => {
                          setCargaTabla(idx, 'hora', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.a1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'a1', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.a2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'a2', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.a3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'a3', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.b1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'b1', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.b2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'b2', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.b3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'b3', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.c1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'c1', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.c2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'c2', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.c3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'c3', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.d1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'd1', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.d2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'd2', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.d3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'd3', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.cajas_segunda}
                        onChange={(e) => {
                          setCargaTabla(idx, 'cajas_segunda', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN1',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN2',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN3',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN4}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN4',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN5}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN5',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN6}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN6',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN7}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN7',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN8}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN8',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN9}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN9',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_segundaN10}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_segundaN10',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.cajas_tercera}
                        onChange={(e) => {
                          setCargaTabla(idx, 'cajas_tercera', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_terceraN1}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_terceraN1',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_terceraN2}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_terceraN2',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_terceraN3}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_terceraN3',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_terceraN4}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_terceraN4',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_terceraN5}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_terceraN5',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_terceraN6}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_terceraN6',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_terceraN7}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'defecto_terceraN7',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.cajas_casco}
                        onChange={(e) => {
                          setCargaTabla(idx, 'cajas_casco', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_cascoN1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'defecto_cascoN1', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_cascoN2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'defecto_cascoN2', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_cascoN3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'defecto_cascoN3', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.defecto_cascoN4}
                        onChange={(e) => {
                          setCargaTabla(idx, 'defecto_cascoN4', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.espacio_min}
                        onChange={(e) => {
                          setCargaTabla(idx, 'espacio_min', e.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Paper>
    </Box>
  );
}
