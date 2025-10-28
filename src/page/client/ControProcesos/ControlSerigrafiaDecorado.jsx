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
  Divider,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';

const datosTabla = () => ({
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
const initialForm = () => ({
  fecha: '',
  producto: '',
  linea: '',
  turno: '',
  supervisor_turno: '',
  observaciones: [],
  operador: '',
  pasta1: '',
  pasta2: '',
  pasta3: '',
  pasta4: '',
  datos_tabla_serigrafiado: [datosTabla()],
});
const rows = 8;
export default function ControlSerigrafiaDecorado() {
  const [form, setForm] = useState(initialForm());
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

  const addRows = () => {
    setForm((f) => {
      if (f.datos_tabla_serigrafiado.length >= rows) return f;
      return {
        ...f,
        datos_tabla_serigrafiado: [...f.datos_tabla_serigrafiado, datosTabla()],
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
  const updateBase = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.datos_tabla_serigrafiado];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, datos_tabla_serigrafiado: next };
    });
  };
  const saveData = () => {
    console.log(form);
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
                CONTROL DE SERIGRAFIA Y DECORADO
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
                  label="Linea"
                  type="label"
                  name="linea"
                  value={form.linea}
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
              <Grid size={{ xs: 6, md: 4 }}>
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
              <Grid size={{ xs: 6, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Operador"
                  type="label"
                  name="operador"
                  value={form.operador}
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
              <Grid size={{ xs: 8, md: 1 }}>
                <Button variant="contained" onClick={addObs}>
                  <AddIcon />
                </Button>
              </Grid>
              <Grid size={{ sx: 6, md: 2 }}>
                <Button
                  onClick={saveData}
                  variant="contained"
                  startIcon={<UploadIcon />}
                >
                  Registrar Datos
                </Button>
              </Grid>
            </Grid>
          </Paper>
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
              <Typography variant="h6" fontWeight={300} sx={{ flexGrow: 1 }}>
                APLICACIONES SERIGRAFICAS
              </Typography>
            </Stack>
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
              onClick={removeRows}
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
                    style={{ width: 90 }}
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
                {form.datos_tabla_serigrafiado.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <TextField
                        type="time"
                        size="small"
                        value={row.hora}
                        onChange={(e) => {
                          setCargaTabla(idx, 'hora', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_apl_pasta1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_apl_pasta1', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_v_pasta1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_v_pasta1', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_d_pasta1}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_d_pasta1', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_apl_pasta2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_apl_pasta2', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_v_pasta2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_v_pasta2', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_d_pasta2}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_d_pasta2', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_apl_pasta3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_apl_pasta3', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_v_pasta3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_v_pasta3', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_d_pasta3}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_d_pasta3', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_apl_pasta4}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_apl_pasta4', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_v_pasta4}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_v_pasta4', e.target.value);
                        }}
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
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.sp_d_pasta4}
                        onChange={(e) => {
                          setCargaTabla(idx, 'sp_d_pasta4', e.target.value);
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
