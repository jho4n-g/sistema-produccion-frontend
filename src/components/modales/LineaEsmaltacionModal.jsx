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
import { DatosEsmalte } from '../../schema/secciones/DatosEsmalte.schema';
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

export default function LienaEsmaltacionModal({
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
      observaciones_esmalte: [
        ...(f.observaciones_esmalte ?? []),
        { observacion: v },
      ],
    }));
    setObsInput('');
  };

  const removeObs = (index) => {
    setForm((f) => ({
      ...f,
      observaciones_esmalte: f.observaciones_esmalte.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const rows = Array.isArray(f?.datos_tabla_esmalte)
        ? [...f.datos_tabla_esmalte]
        : [];
      if (idx < 0 || idx >= rows.length) return f; // evita índices fuera de rango
      rows[idx] = { ...(rows[idx] ?? {}), [field]: value };
      return { ...f, datos_tabla_esmalte: rows };
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
      if (f.datos_tabla_esmalte.length >= rows) return f;
      return {
        ...f,
        datos_tabla_esmalte: [...f.datos_tabla_esmalte, NuevaFilaTabla()],
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

  useEffect(() => {
    if (!open || !id) return; // evita correr si no aplica

    let active = true; // evita setState tras unmount
    setLoading(true);

    (async () => {
      try {
        const data = await fetchById(id);
        console.log('MODAL', data); // ← ahora sí esperamos aquí
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
    const result = DatosEsmalte.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      // console.log('errores ', fieldErrors);
      const tablaErrors = extractArrayFieldErrors(
        result.error,
        'datos_tabla_esmalte'
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
          Detalles de Control de Procesos - Linea Esmaltacion
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
                    error={!!error.producto}
                    helperText={error.producto?.[0]}
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
                <Grid size={{ xs: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Supervisor Turno"
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
                <Grid size={{ xs: 6, md: 7 }}>
                  {!isEditing ? (
                    <Paper>
                      <>
                        <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                          <Typography> Observaciones </Typography>
                          {(form.observaciones_esmalte ?? []).map(
                            (txt, idx) => (
                              <Chip key={idx} label={txt.observacion} />
                            )
                          )}
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
                        {(form.observaciones_esmalte ?? []).map((txt, idx) => (
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
                      style={{ width: 110 }}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.agua_aplicacion}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.agua_aplicacion}
                        helperText={error.agua_aplicacion?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.normal_viscosidad}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.normal_viscosidad}
                        helperText={error.normal_viscosidad?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.recuperado_densidad}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.recuperado_densidad}
                        helperText={error.recuperado_densidad?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.implemeable_residuo}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.implemeable_residuo}
                        helperText={error.implemeable_residuo?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.brillante_viscosidad}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.brillante_viscosidad}
                        helperText={error.brillante_viscosidad?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.recuperado_viscosidad}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.recuperado_viscosidad}
                        helperText={error.recuperado_viscosidad?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.tranparente_densidad}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.tranparente_densidad}
                        helperText={error.tranparente_densidad?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.satinado_densidad}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.satinado_densidad}
                        helperText={error.satinado_densidad?.[0]}
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
                        InputLabelProps={{ shrink: true }}
                        value={form.digital_residuo}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.digital_residuo}
                        helperText={error.digital_residuo?.[0]}
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
                        value={form.blanco_residuo}
                        onChange={updateBase}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.blanco_residuo}
                        helperText={error.blanco_residuo?.[0]}
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
                  {form?.datos_tabla_esmalte?.map((row, idx) => (
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
                          value={row.operador_aplicacion_agua}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_aplicacion_agua',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.operador_aplicacion_agua}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_aplicacion_agua}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_aplicacion_agua',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.sup_prod_aplicacion_agua}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_aplicacion_engobe}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_aplicacion_engobe',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.operador_aplicacion_engobe}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_aplicacion_engobe}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_aplicacion_engobe',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.sup_prod_aplicacion_engobe}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_vizcosidad_normal}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_vizcosidad_normal',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.operador_vizcosidad_normal}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_vizcosidad_normal}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_vizcosidad_normal',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.sup_prod_vizcosidad_normal}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_densidad_recuperado}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_densidad_recuperado',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]?.operador_densidad_recuperado
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_densidad_recuperado}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_densidad_recuperado',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]?.sup_prod_densidad_recuperado
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_residuo_implemeable}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_residuo_implemeable',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]?.operador_residuo_implemeable
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_residuo_implemeable}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_residuo_implemeable',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]?.sup_prod_residuo_implemeable
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_aplicacion_esmalte}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_aplicacion_esmalte',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.operador_aplicacion_esmalte}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_aplicacion_esmalte}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_aplicacion_esmalte',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.sup_prod_aplicacion_esmalte}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_vizcosidad_brillante_recuperado}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_vizcosidad_brillante_recuperado',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]
                              ?.operador_vizcosidad_brillante_recuperado
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_vizcosidad_brillante_recuperado}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_vizcosidad_brillante_recuperado',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]
                              ?.sup_prod_vizcosidad_brillante_recuperado
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_densidad_transparente_satinado}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_densidad_transparente_satinado',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]
                              ?.operador_densidad_transparente_satinado
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_densidad_transparente_satinado}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_densidad_transparente_satinado',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]
                              ?.sup_prod_densidad_transparente_satinado
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.operador_residuo_digital_blanco}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'operador_residuo_digital_blanco',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]?.operador_residuo_digital_blanco
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.sup_prod_residuo_digital_blanco}
                          InputProps={{ readOnly: !isEditing }}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'sup_prod_residuo_digital_blanco',
                              e.target.value
                            );
                          }}
                          error={
                            !!tablaError[idx]?.sup_prod_residuo_digital_blanco
                          }
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
