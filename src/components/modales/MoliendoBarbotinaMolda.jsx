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
  TableBody,
  TableContainer,
  Stack,
  Chip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/general/LoadingScreen';
import { registerBarbotina } from '../../schema/secciones/DatosBarbotina.schema';

const rows = 16;

const NuevaFilaTabla = () => ({
  hora_inicio: '',
  hora_final: '',
  n_molino_cargando_molinos: '',
  tn_lugar_uno_cargando_molinos: '',
  tn_lugar_dos_cargando_molinos: '',
  tn_lugar_tres_cargando_molinos: '',
  tn_lugar_cuantro_cargando_molinos: '',
  h2o_cargando_molinos: '',
  deflo_cargando_molinos: '',
  reoma_cargando_molinos: '',
  dens_descargando_molinos: '',
  visc_descargando_molinos: '',
  res_descargando_molinos: '',
  n_fosa_descargando_molinos: '',
  producto_descargando_molinos: '',
});

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

export default function MoliendoBarbotinaModal({
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
      ObservacionesBarbotinaDatos: [
        ...(f.ObservacionesBarbotinaDatos ?? []),
        { observacion: v },
      ],
    }));
    setObsInput('');
  };

  const removeObs = (index) => {
    setForm((f) => ({
      ...f,
      ObservacionesBarbotinaDatos: f.ObservacionesBarbotinaDatos.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const rows = Array.isArray(f?.TablaBarbotinaDatos)
        ? [...f.TablaBarbotinaDatos]
        : [];
      if (idx < 0 || idx >= rows.length) return f; // evita índices fuera de rango
      rows[idx] = { ...(rows[idx] ?? {}), [field]: value };
      return { ...f, TablaBarbotinaDatos: rows };
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
      if (f.TablaBarbotinaDatos.length >= rows) return f;
      return {
        ...f,
        TablaBarbotinaDatos: [...f.TablaBarbotinaDatos, NuevaFilaTabla()],
      };
    });
  };

  const removeRows = () => {
    setForm((f) => {
      if (f.TablaBarbotinaDatos.length <= 0) return f;
      return { ...f, TablaBarbotinaDatos: f.TablaBarbotinaDatos.slice(0, -1) };
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
    const result = registerBarbotina.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      // console.log('errores ', fieldErrors);
      const tablaErrors = extractArrayFieldErrors(
        result.error,
        'TablaBarbotinaDatos'
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
        Detalles de Control de Procesos - Moliendo barbotina
      </DialogTitle>
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
                  <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Equipo"
                      name="equipo"
                      value={form.equipo}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.equipo}
                      helperText={error.equipo?.[0]}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Horómetro Inicio"
                      name="horometro_inicio"
                      type="number"
                      value={form.horometro_inicio}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.horometro_inicio}
                      helperText={error.horometro_inicio?.[0]}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Horómetro Fin"
                      name="horometro_final"
                      type="number"
                      value={form.horometro_final}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.horometro_final}
                      helperText={error.horometro_final?.[0]}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}></Grid>
                  <Grid size={{ xs: 6, md: 7 }}>
                    {!isEditing ? (
                      <Paper>
                        <>
                          <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                            <Typography> Observaciones </Typography>
                            {(form.ObservacionesBarbotinaDatos ?? []).map(
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
                          {(form.ObservacionesBarbotinaDatos ?? []).map(
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
                    colSpan={7}
                    align="center"
                    className="groupTitle"
                  >
                    Descargando Molino
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    rowSpan={2}
                    sx={{ minWidth: 100 }}
                    align="center"
                  >
                    Molino
                  </TableCell>
                  <TableCell component="th" rowSpan={3} align="center">
                    Hora Inicio
                  </TableCell>
                  <TableCell component="th" rowSpan={3} align="center">
                    Hora Fin
                  </TableCell>

                  {/* Tres grupos con subcolumnas (Lugar1/2/3) */}
                  <TableCell component="th" align="center" colSpan={2}>
                    <TextField
                      size="small"
                      label="Lugar 1"
                      fullWidth
                      name="nombre_lugar_uno_cargando_molinos"
                      value={form.nombre_lugar_uno_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.nombre_lugar_uno_cargando_molinos}
                    />
                  </TableCell>
                  <TableCell component="th" align="center" colSpan={2}>
                    <TextField
                      size="small"
                      label="Lugar 2"
                      fullWidth
                      name="nombre_lugar_dos_cargando_molinos"
                      value={form.nombre_lugar_dos_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.nombre_lugar_dos_cargando_molinos}
                    />
                  </TableCell>
                  <TableCell component="th" align="center" colSpan={2}>
                    <TextField
                      size="small"
                      label="Lugar 3"
                      fullWidth
                      name="nombre_lugar_tres_cargando_molinos"
                      value={form.nombre_lugar_tres_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.nombre_lugar_tres_cargando_molinos}
                    />
                  </TableCell>
                  <TableCell component="th" align="center" colSpan={2}>
                    <TextField
                      size="small"
                      label="Lugar 4"
                      fullWidth
                      name="nombre_lugar_cuarto_cargando_molinos"
                      value={form.nombre_lugar_cuarto_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.nombre_lugar_cuarto_cargando_molinos}
                    />
                  </TableCell>
                  {/* Columnas verticales a la derecha */}
                  <TableCell
                    component="th"
                    align="center"
                    rowSpan={2}
                    sx={{ minWidth: 100 }}
                  >
                    H₂O
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    sx={{ minWidth: 110 }}
                  >
                    DEFLO
                  </TableCell>

                  <TableCell
                    component="th"
                    align="center"
                    rowSpan={2}
                    sx={{ minWidth: 110 }}
                  >
                    REOMA
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    rowSpan={2}
                    sx={{ minWidth: 110 }}
                  >
                    Dens
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    rowSpan={2}
                    sx={{ minWidth: 110 }}
                  >
                    Visc
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    rowSpan={2}
                    sx={{ minWidth: 110 }}
                  >
                    Res
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    rowSpan={2}
                    sx={{ minWidth: 110 }}
                  >
                    Fosa
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    rowSpan={3}
                    sx={{ minWidth: 90 }}
                  >
                    Producto
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Hum %"
                      name="humedad_lugar_uno_cargando_molinos"
                      value={form.humedad_lugar_uno_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.humedad_lugar_uno_cargando_molinos}
                    />
                  </TableCell>

                  <TableCell colSpan={2} align="center">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Hum %"
                      name="humedad_lugar_dos_cargando_molinos"
                      value={form.humedad_lugar_dos_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.humedad_lugar_dos_cargando_molinos}
                    />
                  </TableCell>

                  <TableCell colSpan={2} align="center">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Hum %"
                      name="humedad_lugar_tres_cargando_molinos"
                      value={form.humedad_lugar_tres_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.humedad_lugar_tres_cargando_molinos}
                    />
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Hum %"
                      name="humedad_lugar_cuarto_cargando_molinos"
                      value={form.humedad_lugar_cuarto_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.humedad_lugar_cuarto_cargando_molinos}
                    />
                  </TableCell>

                  {/* Bajo el REOMA del medio */}
                  <TableCell align="center">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Proveedor"
                      name="deflo_proveerdo_cargando_molinos"
                      value={form.deflo_proveerdo_cargando_molinos}
                      onChange={updateBase}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: !isEditing }}
                      error={!!error.deflo_proveerdo_cargando_molinos}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">N°</TableCell>
                  <TableCell align="center" colSpan={2} sx={{ minWidth: 130 }}>
                    TN
                  </TableCell>
                  <TableCell align="center" colSpan={2} sx={{ minWidth: 130 }}>
                    TN
                  </TableCell>
                  <TableCell align="center" colSpan={2} sx={{ minWidth: 130 }}>
                    TN
                  </TableCell>
                  <TableCell align="center" colSpan={2} sx={{ minWidth: 130 }}>
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
              <TableBody
                sx={{
                  '& .MuiTableCell-root': {
                    fontSize: '0.9rem',
                    padding: '12px 16px',
                  },
                }}
              >
                {form?.TablaBarbotinaDatos?.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ padding: '1px' }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.n_molino_cargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx, // ✅ Ahora idx es el índice correcto
                            'n_molino_cargando_molinos',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.n_molino_cargando_molinos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="time"
                        size="small"
                        value={
                          row.hora_inicio ? row.hora_inicio.substring(0, 5) : ''
                        } // ✅ Acceso correcto a propiedades
                        onChange={(e) => {
                          setCargaTabla(idx, 'hora_inicio', e.target.value); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.hora_inicio}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="time"
                        size="small"
                        value={
                          row.hora_final ? row.hora_final.substring(0, 5) : ''
                        } // ✅ Acceso correcto a propiedades
                        onChange={(e) => {
                          setCargaTabla(idx, 'hora_final', e.target.value);
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.hora_final}
                      />
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        value={row.tn_lugar_uno_cargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'tn_lugar_uno_cargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.tn_lugar_uno_cargando_molinos}
                      />
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        value={row.tn_lugar_dos_cargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'tn_lugar_dos_cargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.tn_lugar_dos_cargando_molinos}
                      />
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        value={row.tn_lugar_tres_cargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'tn_lugar_tres_cargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={
                          !!tablaError[idx]?.tn_lugar_tres_cargando_molinos
                        }
                      />
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        value={row.tn_lugar_cuantro_cargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'tn_lugar_cuantro_cargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={
                          !!tablaError[idx]?.tn_lugar_cuantro_cargando_molinos
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.h2o_cargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'h2o_cargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.h2o_cargando_molinos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={row.deflo_cargando_molinos ?? ''}
                        onChange={(e) =>
                          setCargaTabla(
                            idx,
                            'deflo_cargando_molinos',
                            e.target.value
                          )
                        }
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.deflo_cargando_molinos}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        value={row.reoma_cargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'reoma_cargando_molinos',
                            e.target.value
                          );
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.reoma_cargando_molinos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.dens_descargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'dens_descargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.dens_descargando_molinos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.visc_descargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'visc_descargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.visc_descargando_molinos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.res_descargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'res_descargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.res_descargando_molinos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.n_fosa_descargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'n_fosa_descargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.n_fosa_descargando_molinos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={row.producto_descargando_molinos}
                        onChange={(e) => {
                          setCargaTabla(
                            idx,
                            'producto_descargando_molinos',
                            e.target.value
                          ); // ✅ Índice correcto
                        }}
                        InputProps={{ readOnly: !isEditing }}
                        error={!!tablaError[idx]?.producto_descargando_molinos}
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
