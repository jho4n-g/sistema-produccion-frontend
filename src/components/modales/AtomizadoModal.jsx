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
  Typography,
  Chip,
} from '@mui/material';

import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/general/LoadingScreen';
import { DatosAtomizado } from '../../schema/secciones/atomizado.schema';
import ConfirmModal from '../general/ConfirmModal';
const rows = 8;
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
const NuevaFilaTabla = () => ({
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
  as: '',
  lanz_n: '',
  humedad_uno: '',
  humedad_dos: '',
  humedad_tres: '',
  silo_descarga: '',
  producto: '',
  n_silo_llenos: '',
});
export default function AtomizadoModal({
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
      observacionesAtomizadoDatos: [
        ...(f.observacionesAtomizadoDatos ?? []),
        { observacion: v },
      ],
    }));
    setObsInput('');
  };

  const removeObs = (index) => {
    setForm((f) => ({
      ...f,
      observacionesAtomizadoDatos: f.observacionesAtomizadoDatos.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const rows = Array.isArray(f?.tabla_atomizado)
        ? [...f.tabla_atomizado]
        : [];
      if (idx < 0 || idx >= rows.length) return f; // evita índices fuera de rango
      rows[idx] = { ...(rows[idx] ?? {}), [field]: value };
      return { ...f, tabla_atomizado: rows };
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

  const addRows = () => {
    setForm((f) => {
      if (f.tabla_atomizado.length >= rows) return f;
      return {
        ...f,
        tabla_atomizado: [...f.tabla_atomizado, NuevaFilaTabla()],
      };
    });
  };

  const removeRows = () => {
    setForm((f) => {
      if (f.tabla_atomizado.length <= 0) return f;
      return { ...f, tabla_atomizado: f.tabla_atomizado.slice(0, -1) };
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
        // console.log('atimizado', data);
        if (data?.ok) setForm(data.datos ?? {});
        else toast.error(data?.msg || 'No se pudo cargar el registro');
      } catch (e) {
        if (active) toast.error(e?.message || 'Error del servidor');
      } finally {
        if (active) setLoading(false); // ← se apaga al terminar de verdadfi
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
    const result = DatosAtomizado.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      console.log('errores ', fieldErrors);
      const tablaErrors = extractArrayFieldErrors(
        result.error,
        'tabla_atomizado'
      );
      setError(fieldErrors);
      setTablaError(tablaErrors);
      toast.error('Datos incorrectos');
      return;
    } else {
      try {
        console.log('asf ', form);
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
    <>
      <Dialog open={open} fullWidth maxWidth="xl  ">
        <DialogTitle>Detalles de Control de Procesos - Atomizado </DialogTitle>
        {loading ? (
          <DialogContent>
            <LoadingScreen />
          </DialogContent>
        ) : (
          <DialogContent>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={9}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Fecha"
                        type="date"
                        name="fecha"
                        value={form.fecha || ''}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.fecha}
                        helperText={error.fecha?.[0]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Hora Inicial"
                        name="hora_inicio"
                        value={form.hora_inicio}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.hora_inicio}
                        helperText={error.hora_inicio?.[0]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Hora Final"
                        name="hora_final"
                        value={form.hora_final}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.hora_final}
                        helperText={error.hora_final?.[0]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Turno"
                        name="turno"
                        value={form.turno}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.turno}
                        helperText={error.turno?.[0]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Operador"
                        name="operador"
                        value={form.operador}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.operador}
                        helperText={error.operador?.[0]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Supervisor de turno"
                        name="supervisor_turno"
                        value={form.supervisor_turno}
                        onChange={updateBase}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!error.supervisor_turno}
                        helperText={error.supervisor_turno?.[0]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} />
                    <Grid size={{ xs: 6, md: 7 }}>
                      {!isEditing ? (
                        <Paper>
                          <>
                            <Stack
                              direction="column"
                              spacing={1}
                              sx={{ mt: 1 }}
                            >
                              <Typography> Observaciones </Typography>
                              {(form.observacionesAtomizadoDatos ?? []).map(
                                (txt, idx) => (
                                  <Chip key={idx} label={txt.observacion} />
                                )
                              )}
                            </Stack>
                          </>
                        </Paper>
                      ) : (
                        <>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
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
                            {(form.observacionesAtomizadoDatos ?? []).map(
                              (txt, idx) => (
                                <Chip
                                  key={idx}
                                  label={txt.observacion}
                                  onDelete={() => removeObs(idx)}
                                />
                              )
                            )}
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
                </Grid>
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
                  minWidth: 2000,
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
                      width={120}
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
                <TableBody
                  sx={{
                    '& .MuiTableCell-root': {
                      fontSize: '13px',
                      padding: '12px 16px',
                    },
                  }}
                >
                  {form?.tabla_atomizado?.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <TextField
                          size="small"
                          type="time"
                          value={row.hora}
                          onChange={(e) => {
                            setCargaTabla(idx, 'hora', e.target.value);
                          }}
                          error={!!tablaError[idx]?.hora}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.pba1_bareas}
                          onChange={(e) => {
                            setCargaTabla(idx, 'pba1_bareas', e.target.value);
                          }}
                          error={!!tablaError[idx]?.pba1_bareas}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.pa1_bareas}
                          onChange={(e) => {
                            setCargaTabla(idx, 'pa1_bareas', e.target.value);
                          }}
                          error={!!tablaError[idx]?.pa1_bareas}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.pba2_bareas}
                          onChange={(e) => {
                            setCargaTabla(idx, 'pba2_bareas', e.target.value);
                          }}
                          error={!!tablaError[idx]?.pba2_bareas}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.pa2_bareas}
                          onChange={(e) => {
                            setCargaTabla(idx, 'pa2_bareas', e.target.value);
                          }}
                          error={!!tablaError[idx]?.pa2_bareas}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.pba3_bareas}
                          onChange={(e) => {
                            setCargaTabla(idx, 'pba3_bareas', e.target.value);
                          }}
                          error={!!tablaError[idx]?.pba3_bareas}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.pa3_bareas}
                          onChange={(e) => {
                            setCargaTabla(idx, 'pa3_bareas', e.target.value);
                          }}
                          error={!!tablaError[idx]?.pa3_bareas}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.te_c1}
                          onChange={(e) => {
                            setCargaTabla(idx, 'te_c1', e.target.value);
                          }}
                          error={!!tablaError[idx]?.te_c1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.te_c2}
                          onChange={(e) => {
                            setCargaTabla(idx, 'te_c2', e.target.value);
                          }}
                          error={!!tablaError[idx]?.te_c2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.ts_c}
                          onChange={(e) => {
                            setCargaTabla(idx, 'ts_c', e.target.value);
                          }}
                          error={!!tablaError[idx]?.ts_c}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.lanz_n}
                          onChange={(e) => {
                            setCargaTabla(idx, 'lanz_n', e.target.value);
                          }}
                          error={!!tablaError[idx]?.lanz_n}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.humedad_uno}
                          onChange={(e) => {
                            setCargaTabla(idx, 'humedad_uno', e.target.value);
                          }}
                          error={!!tablaError[idx]?.humedad_uno}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.humedad_dos}
                          onChange={(e) => {
                            setCargaTabla(idx, 'humedad_dos', e.target.value);
                          }}
                          error={!!tablaError[idx]?.humedad_dos}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.silo_descarga}
                          onChange={(e) => {
                            setCargaTabla(idx, 'silo_descarga', e.target.value);
                          }}
                          error={!!tablaError[idx]?.silo_descarga}
                        />
                      </TableCell>
                      <TableCell colSpan={2}>
                        <TextField
                          size="small"
                          value={row.producto}
                          onChange={(e) => {
                            setCargaTabla(idx, 'producto', e.target.value);
                          }}
                          error={!!tablaError[idx]?.producto}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.n_silo_llenos}
                          onChange={(e) => {
                            setCargaTabla(idx, 'n_silo_llenos', e.target.value);
                          }}
                          error={!!tablaError[idx]?.n_silo_llenos}
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
                  <TableHead
                    sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}
                  >
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

                        {form?.control_granulometria?.map((col, colIdx) => (
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
                  <TableHead
                    sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}
                  >
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
                    {form?.control_fosas?.map((row, idx) => (
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
                            value={row.residuo}
                            onChange={(e) =>
                              setFosa(idx, 'residuo', e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
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
