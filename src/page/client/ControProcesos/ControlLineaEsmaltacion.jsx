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

const tablaEsmaltacion = () => ({
  hora: '',
  operador_aplicacion_agua: '',
  sup_prod_aplicacion_agua: '',
  operador_aplicacion_engobe: '',
  sup_prod_aplicacion_engobe: '',
  operador_vizcosidad_normal: '',
  sup_prod_vizcosidad_normal: '',
  operador_densidad_recuperado: '',
  sup_prod_densidad_recuperado: '',
  operador_residuo_implemeable: '',
  sup_prod_residuo_implemeable: '',
  operador_aplicacion_esmalte: '',
  sup_prod_aplicacion_esmalte: '',
  operador_vizcosidad_brillante_recuperado: '',
  sup_prod_vizcosidad_brillante_recuperado: '',
  operador_densidad_transparente_satinado: '',
  sup_prod_densidad_transparente_satinado: '',
  operador_residuo_digital_blanco: '',
  sup_prod_residuo_digital_blanco: '',
});

const initialForm = () => ({
  fecha: '',
  producto: '',
  linea: '',
  turno: '',
  operador: '',
  supervisor_turno: '',
  agua_aplicacion: '',
  normal_viscosidad: '',
  recuperado_densidad: '',
  implemeable_residuo: '',
  brillante_viscosidad: '',
  recuperado_viscosidad: '',
  tranparente_densidad: '',
  satinado_densidad: '',
  digital_residuo: '',
  blanco_residuo: '',
  observaciones: [],
  datos_tabla_esmalte: [tablaEsmaltacion()],
});
const rows = 8;
export default function ControlLineaEsmaltacion() {
  const [form, setForm] = useState(initialForm);
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
  const SaveData = () => {
    console.log(form);
  };
  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.datos_tabla_esmalte];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, datos_tabla_esmalte: next };
    });
  };

  const addRows = () => {
    setForm((f) => {
      if (f.datos_tabla_esmalte.length >= rows) return f;
      return {
        ...f,
        datos_tabla_esmalte: [...f.datos_tabla_esmalte, tablaEsmaltacion()],
      };
    });
  };

  const removeRows = () => {
    setForm((f) => {
      if (f.datos_tabla_esmalte.length <= 0) return f;
      return {
        ...f,
        datos_tabla_esmalte: f.datos_tabla_esmalte.slice(0, -1),
      };
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
                CONTROL DE LA LIENA DE ESMALTACION
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
                  label="Operador"
                  type="label"
                  name="operador"
                  value={form.operador}
                  onChange={updateBase}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Supervisor Turno"
                  type="label"
                  name="supervisor_turno"
                  value={form.supervisor_turno}
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
              <Grid size={{ xs: 8, md: 1 }}>
                <Button variant="contained" onClick={addObs}>
                  <AddIcon />
                </Button>
              </Grid>
              <Grid size={{ sx: 6, md: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  onClick={SaveData}
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
              mb: 5,
            }}
          >
            <Table
              stickyHeader
              sx={{
                tableLayout: 'fixed',
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
                    align="center"
                    className="groupTitle"
                    style={{ width: 90 }}
                  >
                    Hora
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="agua"
                      name="agua_aplicacion"
                      value={form.agua_aplicacion}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    engobe
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="Normal"
                      name="normal_viscosidad"
                      value={form.normal_viscosidad}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="Recuperado"
                      name="recuperado_densidad"
                      value={form.recuperado_densidad}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="Implemeable"
                      name="implemeable_residuo"
                      value={form.implemeable_residuo}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    rowSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    esmalte
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 110 }}
                  >
                    <TextField
                      size="small"
                      label="Brillante"
                      name="brillante_viscosidad"
                      value={form.brillante_viscosidad}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Recuperado"
                      name="recuperado_viscosidad"
                      value={form.recuperado_viscosidad}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Transparente"
                      name="tranparente_densidad"
                      value={form.tranparente_densidad}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Satinado"
                      name="satinado_densidad"
                      value={form.satinado_densidad}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Digital"
                      name="digital_residuo"
                      value={form.digital_residuo}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      name="blanco_residuo"
                      value={form.blanco_residuos}
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
                    aplicacion[g]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    aplicacion[g]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    viscocidad[s]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    densidad[g/CM³]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    residuo[%]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    aplicacion[g]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    viscocidad[s]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    densidad[g/Cm²]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    Residuo[%]
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
                    Sup. Prod.
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
                    Sup. Prod.
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
                    Sup. Prod.
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
                    Sup. Prod.
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
                    Sup. Prod.
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
                    Sup. Prod.
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
                    Sup. Prod.
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
                    Sup. Prod.
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
                    Sup. Prod.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.datos_tabla_esmalte.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="center">
                      <TextField
                        type="time"
                        size="small"
                        value={row.hora}
                        onChange={(e) => {
                          setCargaTabla(idx, 'hora', e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_aplicacion_agua}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_aplicacion_agua',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_aplicacion_agua}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_aplicacion_agua',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_aplicacion_engobe}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_aplicacion_engobe',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_aplicacion_engobe}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_aplicacion_engobe',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_vizcosidad_normal}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_vizcosidad_normal',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_vizcosidad_normal}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_vizcosidad_normal',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_aplicacion_engobe}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_densidad_recuperado',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_densidad_recuperado}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_densidad_recuperado',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_residuo_implemeable}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_residuo_implemeable',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_residuo_implemeable}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_residuo_implemeable',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_aplicacion_esmalte}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_aplicacion_esmalte',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_aplicacion_esmalte}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_aplicacion_esmalte',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_vizcosidad_brillante_recuperado}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_vizcosidad_brillante_recuperado',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_vizcosidad_brillante_recuperado}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_vizcosidad_brillante_recuperado',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_densidad_transparente_satinado}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_densidad_transparente_satinado',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_densidad_transparente_satinado}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_densidad_transparente_satinado',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.operador_residuo_digital_blanco}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'operador_residuo_digital_blanco',
                            e.target.value
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={row.sup_prod_residuo_digital_blanco}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'sup_prod_residuo_digital_blanco',
                            e.target.value
                          );
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
