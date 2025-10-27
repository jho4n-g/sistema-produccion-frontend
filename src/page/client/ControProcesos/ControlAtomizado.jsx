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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';

const setCargaControlGranulometria = () => ({
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
  hora_filal: '',
  turno: '',
  operado: '',
  supervisor_turno: '',
  observaciones: '',
  control_granolomeria: '',
  tabla_atomizado: [nuevaCargaTablaAtomizado()],
});

const rows = 8;
export default function ControlAtomizadoPage() {
  const [form, setForm] = useState(initialForm());

  const updateBase = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.tabla_atomizado];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, tabla_atomizado: next };
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
  const saveData = () => {
    console.log(form);
  };

  const removeRows = () => {
    console.log('remove');
    setForm((f) => {
      if (f.tabla_atomizado.length <= 1) return f;
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
                  value={form.supervisor_turno}
                  onChange={updateBase}
                />
              </Grid>
              <Grid size={{ xs: 8, md: 5 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Obsevaciones"
                  type="label"
                  name="observaciones"
                  value={form.observaciones}
                  onChange={updateBase}
                />
              </Grid>
              <Grid size={{ xs: 8, md: 1 }}>
                <Button variant="contained">
                  <AddIcon />
                </Button>
              </Grid>
              <Button
                size="small"
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={saveData}
              >
                Registrar Datos
              </Button>
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pba1_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pba1_bareas', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pa1_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pa1_bareas', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pba2_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pba2_bareas', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pa2_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pa2_bareas', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pba3_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pba3_bareas', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.pa3_bareas}
                        onChange={(e) => {
                          setCargaTabla(idx, 'pa3_bareas', e.target.value);
                        }}
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
                  <TableCell
                    component="th"
                    colSpan={4}
                    align="center"
                    className="groupTitle"
                  >
                    CONTROL DE FOSAS
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    rowSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    TONELAJE KG/5S
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    HORA
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    N° FOSA
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    DENSIDAD
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    VISCOSIDAD
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    RESIDUOS
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    SILO N°
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    % HUMEDAD
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    MALLA 35
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    SERVICIO
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    MALLA 40
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={3}
                    align="center"
                    className="groupTitle"
                  >
                    P. GAS-MB
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    MALLA 50
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={3}
                    align="center"
                    className="groupTitle"
                  >
                    T. GAS-°C
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    MALLA 70
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={3}
                    align="center"
                    className="groupTitle"
                  >
                    CONSUMO TURNO - PC
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    MALLA 100
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={3}
                    align="center"
                    className="groupTitle"
                  >
                    CONSUMO GAS - Ple3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    MALLA 120
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={3}
                    align="center"
                    className="groupTitle"
                  >
                    CONSUMO DIESEL - LITROS
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    FONDO
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Container>
      </Paper>
    </Box>
  );
}
