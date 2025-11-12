import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TableContainer,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { toast } from 'react-toastify';

import { RegisterObg } from '../../../service/MoliendoBarbotina.js';

// ——————————————————————————————————————————
// Configuración
// ——————————————————————————————————————————
const MAX_FILAS = 16;

const NuevaCarga = () => ({
  molino_num: 2,
  hora_inicio: '',
  hora_fin: '',
  tn_lugar_uno: '',
  hum_lugar_uno: '',
  tn_lugar_dos: '',
  hum_lugar_dos: '',
  tn_lugar_tres: '',
  hum_lugar_tres: '',
  h2o_litros: '',
  proveedor_deflo: 'pg ',
  kg_deflo: '',
  kg_reoma: '',
});

const NuevaDescarga = () => ({
  densidad: '',
  viscosidad: '',
  restante: '',
  fosa: '',
  producto: '',
});

// 👉 Estado inicial VACÍO (para reset)
const initialForm = () => ({
  fecha: '',
  turno: '',
  operador: '',
  equipo: '',
  receta: '',
  horometro_inicio: '',
  horometro_final: '',
  observacion: '',
  nombre_lugar_uno: '',
  humedad_lugar_uno: '',
  nombre_lugar_dos: '',
  humedad_lugar_dos: '',
  nombre_lugar_tres: '',
  humedad_lugar_tres: '',
  cargandoMolinos: [NuevaCarga()],
  descargandoMolinos: [NuevaDescarga()],
});

export default function BarbotinaHoja() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  // Estado base
  const [form, setForm] = useState(initialForm());
  const [isEditable, setIsEditable] = useState(true);

  const updateBase = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const setCarga = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.cargandoMolinos];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, cargandoMolinos: next };
    });
  };

  const setDescarga = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.descargandoMolinos];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, descargandoMolinos: next };
    });
  };

  // Botones globales: mismas filas en ambos lados
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

  // Registrar = enviar al backend + RESET si OK
  const postToApi = async () => {
    try {
      console.log(form);
      const data = await RegisterObg(form); // lanzará si falla
      toast.success('✅ Registro exitoso');
      setForm(initialForm());
      setIsEditable(true);
    } catch (e) {
      const status = e?.response?.status;
      const backend = e?.response?.data;
      const msg =
        (backend && (backend.message || backend.error || backend.detail)) ||
        e.message ||
        'Error desconocido';
      toast.error(
        `❌ Error${status ? ` ${status}` : ''} al registrar${
          msg ? `: ${msg}` : ''
        }`
      );
    }
  };

  // ——————————————————————————————————————————
  // Render
  // ——————————————————————————————————————————
  const rows = Math.max(
    form.cargandoMolinos.length,
    form.descargandoMolinos.length
  );

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Paper>
        <Container
          maxWidth="xl"
          sx={{ py: { xs: 2, md: 3 }, minHeight: 'calc(100vh - 32px)' }}
        >
          {/* Encabezado superior */}
          <Paper
            elevation={1}
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
                CONTROL DE PROCESO DE MOLIENDA BARBOTINA
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsEditable((v) => !v)}
                  sx={{ textTransform: 'none', fontWeight: 700 }}
                >
                  {isXs
                    ? isEditable
                      ? 'Bloquear'
                      : 'Editar'
                    : isEditable
                    ? 'Bloquear edición'
                    : 'Editar'}
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    bgcolor: '#006633',
                    '&:hover': { bgcolor: '#055a2b' },
                  }}
                  startIcon={<UploadIcon />}
                  onClick={postToApi}
                >
                  Registrar
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Encabezado tipo planilla */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={9}>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={3}>
                    <TextField
                      disabled={!isEditable}
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
                  <Grid item xs={6} md={3}>
                    <TextField
                      disabled={!isEditable}
                      fullWidth
                      size="small"
                      label="Turno"
                      name="turno"
                      value={form.turno}
                      onChange={updateBase}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disabled={!isEditable}
                      fullWidth
                      size="small"
                      label="Operador"
                      name="operador"
                      value={form.operador}
                      onChange={updateBase}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disabled={!isEditable}
                      fullWidth
                      size="small"
                      label="Equipo"
                      name="equipo"
                      value={form.equipo}
                      onChange={updateBase}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      disabled={!isEditable}
                      fullWidth
                      size="small"
                      label="Horómetro Inicio"
                      name="horometro_inicio"
                      type="number"
                      value={form.horometro_inicio}
                      onChange={updateBase}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      disabled={!isEditable}
                      fullWidth
                      size="small"
                      label="Horómetro Fin"
                      name="horometro_final"
                      type="number"
                      value={form.horometro_final}
                      onChange={updateBase}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!isEditable}
                      fullWidth
                      size="small"
                      label="Observaciones"
                      name="observacion"
                      value={form.observacion}
                      onChange={updateBase}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* Controles globales de filas */}
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
              onClick={addRow}
              disabled={!isEditable || rows >= MAX_FILAS}
            >
              Agregar fila
            </Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={removeRow}
              disabled={!isEditable || rows <= 1}
            >
              Quitar fila
            </Button>
          </Stack>

          {/* RESPONSIVE RENDER */}
          {isXs ? (
            // ————————————————————
            // MODO MÓVIL: TARJETAS
            // ————————————————————
            <Box sx={{ display: 'grid', gap: 1.25 }}>
              {Array.from({ length: rows }).map((_, i) => {
                const c = form.cargandoMolinos[i];
                const d = form.descargandoMolinos[i];
                return (
                  <Paper
                    key={i}
                    variant="outlined"
                    sx={{ p: 1.25, borderRadius: 2 }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: 700 }}
                    >
                      #{i + 1} • Cargado / Descarga
                    </Typography>

                    <Grid container spacing={1}>
                      {/* Hora inicio/fin */}
                      <Grid item xs={6}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="time"
                          label="Hora Inicio"
                          fullWidth
                          value={c?.hora_inicio ?? ''}
                          onChange={(e) =>
                            setCarga(i, 'hora_inicio', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="time"
                          label="Hora Fin"
                          fullWidth
                          value={c?.hora_fin ?? ''}
                          onChange={(e) =>
                            setCarga(i, 'hora_fin', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      {/* TN por lugar */}
                      <Grid item xs={4}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="TN L1"
                          fullWidth
                          value={c?.tn_lugar_uno ?? ''}
                          onChange={(e) =>
                            setCarga(i, 'tn_lugar_uno', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="TN L2"
                          fullWidth
                          value={c?.tn_lugar_dos ?? ''}
                          onChange={(e) =>
                            setCarga(i, 'tn_lugar_dos', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="TN L3"
                          fullWidth
                          value={c?.tn_lugar_tres ?? ''}
                          onChange={(e) =>
                            setCarga(i, 'tn_lugar_tres', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      {/* H2O / REOMA */}
                      <Grid item xs={6}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="H₂O (L)"
                          fullWidth
                          value={c?.h2o_litros ?? ''}
                          onChange={(e) =>
                            setCarga(i, 'h2o_litros', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="REOMA (Kg)"
                          fullWidth
                          value={c?.kg_reoma ?? ''}
                          onChange={(e) =>
                            setCarga(i, 'kg_reoma', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      {/* DESCARGA: dens/visc/res/fosa/prod */}
                      <Grid item xs={4}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="Dens (g/ml)"
                          fullWidth
                          value={d?.densidad ?? ''}
                          onChange={(e) =>
                            setDescarga(i, 'densidad', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="Visc (s)"
                          fullWidth
                          value={d?.viscosidad ?? ''}
                          onChange={(e) =>
                            setDescarga(i, 'viscosidad', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          type="number"
                          label="Res (%)"
                          fullWidth
                          value={d?.restante ?? ''}
                          onChange={(e) =>
                            setDescarga(i, 'restante', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          label="Fosa"
                          fullWidth
                          value={d?.fosa ?? ''}
                          onChange={(e) =>
                            setDescarga(i, 'fosa', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          disabled={!isEditable}
                          size="small"
                          label="Producto"
                          fullWidth
                          value={d?.producto ?? ''}
                          onChange={(e) =>
                            setDescarga(i, 'producto', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
            </Box>
          ) : (
            // ————————————————————
            // MODO DESKTOP/TABLET: TABLA
            // ————————————————————
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
                  tableLayout: 'aunto',
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
                  {/* Título superior: Cargado / Descargando */}
                  <TableRow>
                    <TableCell
                      component="th"
                      colSpan={12}
                      align="center"
                      className="groupTitle"
                    >
                      Cargado Molino
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={5}
                      align="center"
                      className="groupTitle"
                    >
                      Descargando Molino
                    </TableCell>
                  </TableRow>

                  {/* Fila principal de encabezados */}
                  <TableRow>
                    <TableCell
                      component="th"
                      rowSpan={3}
                      align="center"
                      className="stickyCol"
                      sx={{ width: 20 }}
                    >
                      N°
                    </TableCell>
                    <TableCell component="th" rowSpan={3} align="center">
                      Hora Inicio
                    </TableCell>
                    <TableCell component="th" rowSpan={3} align="center">
                      Hora Fin
                    </TableCell>

                    {/* Tres grupos con subcolumnas (Lugar1/2/3) */}
                    <TableCell
                      sx={{ width: 1000 }}
                      component="th"
                      align="center"
                      colSpan={2}
                    >
                      <TextField
                        size="small"
                        label="Lugar 1"
                        fullWidth
                        name="nombre_lugar_uno"
                        InputLabelProps={{ shrink: true }}
                        value={form.nombre_lugar_uno}
                        onChange={updateBase}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell component="th" align="center" colSpan={2}>
                      <TextField
                        size="small"
                        label="Lugar 2"
                        fullWidth
                        name="nombre_lugar_dos"
                        InputLabelProps={{ shrink: true }}
                        value={form.nombre_lugar_dos}
                        onChange={updateBase}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell component="th" align="center" colSpan={2}>
                      <TextField
                        size="small"
                        label="Lugar 3"
                        fullWidth
                        name="nombre_lugar_tres"
                        InputLabelProps={{ shrink: true }}
                        value={form.nombre_lugar_tres}
                        onChange={updateBase}
                        sx={{ width: 100 }}
                      />
                    </TableCell>

                    {/* Columnas verticales a la derecha */}
                    <TableCell
                      component="th"
                      align="center"
                      rowSpan={2}
                      sx={{ minWidth: 80 }}
                    >
                      H₂O
                    </TableCell>
                    <TableCell component="th" align="center">
                      REOMA
                    </TableCell>
                    <TableCell
                      component="th"
                      align="center"
                      rowSpan={2}
                      sx={{ minWidth: 80 }}
                    >
                      REOMA
                    </TableCell>
                    <TableCell
                      component="th"
                      align="center"
                      rowSpan={2}
                      sx={{ minWidth: 70 }}
                    >
                      Dens
                    </TableCell>
                    <TableCell
                      component="th"
                      align="center"
                      rowSpan={2}
                      sx={{ minWidth: 70 }}
                    >
                      Visc
                    </TableCell>
                    <TableCell
                      component="th"
                      align="center"
                      rowSpan={2}
                      sx={{ minWidth: 70 }}
                    >
                      Res
                    </TableCell>
                    <TableCell
                      component="th"
                      align="center"
                      rowSpan={2}
                      sx={{ minWidth: 70 }}
                    >
                      Fosa
                    </TableCell>
                    <TableCell
                      component="th"
                      align="center"
                      rowSpan={3}
                      sx={{ minWidth: 120 }}
                    >
                      Producto
                    </TableCell>
                  </TableRow>

                  {/* Subfila con Hum% + campo (solo en header) */}
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Hum %"
                        name="humedad_lugar_uno"
                        InputLabelProps={{ shrink: true }}
                        value={form.humedad_lugar_uno}
                        onChange={updateBase}
                      />
                    </TableCell>

                    <TableCell colSpan={2} align="center">
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Hum %"
                        name="humedad_lugar_dos"
                        InputLabelProps={{ shrink: true }}
                        value={form.humedad_lugar_dos}
                        onChange={updateBase}
                      />
                    </TableCell>

                    <TableCell colSpan={2} align="center">
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Hum %"
                        name="humedad_lugar_tres"
                        InputLabelProps={{ shrink: true }}
                        value={form.humedad_lugar_tres}
                        onChange={updateBase}
                      />
                    </TableCell>

                    {/* Bajo el REOMA del medio */}
                    <TableCell align="center">
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Proveedor"
                        InputLabelProps={{ shrink: true }}
                      />
                    </TableCell>
                  </TableRow>

                  {/* Subfila inferior con TN/Litros/Kg y métricas de descarga */}
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      TN
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      TN
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      TN
                    </TableCell>
                    <TableCell align="center">Litros</TableCell>
                    <TableCell align="center">Kg</TableCell>
                    <TableCell align="center">Kg</TableCell>
                    <TableCell align="center">g/ml</TableCell>
                    <TableCell align="center">s</TableCell>
                    <TableCell align="center">%</TableCell>
                    <TableCell align="center">N</TableCell>
                  </TableRow>
                </TableHead>

                {/* Cuerpo (17 columnas) */}
                <TableBody>
                  {Array.from({ length: rows }).map((_, i) => {
                    const c = form.cargandoMolinos[i];
                    const d = form.descargandoMolinos[i];
                    return (
                      <TableRow key={i}>
                        <TableCell align="center" className="stickyCol">
                          {i + 1}
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            type="time"
                            size="small"
                            value={c?.hora_inicio ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'hora_inicio', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            type="time"
                            size="small"
                            value={c?.hora_fin ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'hora_fin', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center" colSpan={2}>
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={c?.tn_lugar_uno ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'tn_lugar_uno', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center" colSpan={2}>
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={c?.tn_lugar_dos ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'tn_lugar_dos', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center" colSpan={2}>
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={c?.tn_lugar_tres ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'tn_lugar_tres', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={c?.h2o_litros ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'h2o_litros', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={c?.kg_deflo ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'kg_deflo', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={c?.kg_reoma ?? ''}
                            onChange={(e) =>
                              setCarga(i, 'kg_reoma', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={d?.densidad ?? ''}
                            onChange={(e) =>
                              setDescarga(i, 'densidad', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={d?.viscosidad ?? ''}
                            onChange={(e) =>
                              setDescarga(i, 'viscosidad', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={d?.restante ?? ''}
                            onChange={(e) =>
                              setDescarga(i, 'restante', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={d?.fosa ?? ''}
                            onChange={(e) =>
                              setDescarga(i, 'fosa', e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell align="center">
                          <TextField
                            disabled={!isEditable}
                            size="small"
                            value={d?.producto ?? ''}
                            onChange={(e) =>
                              setDescarga(i, 'producto', e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Divider sx={{ mt: 3 }} />
        </Container>
      </Paper>
    </Box>
  );
}
