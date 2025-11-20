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
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/general/LoadingScreen';
import ConfirmModal from '../general/ConfirmModal';
import { datosPrensadoSecado } from '../../schema/secciones/DatosPrensadoSecado.schema';

const rows = 8;

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
  humo_polvo: '',
  masa_molde1: '',
  masa_molde2: '',
  masa_molde4: '',
  masa_molde5: '',
  masa_molde6: '',
  masa_molde7: '',
  espesor_molde1_a: '',
  espesor_molde1_b: '',
  espesor_molde2_a: '',
  espesor_molde2_b: '',
  espesor_molde3_a: '',
  espesor_molde3_b: '',
  espesor_molde4_a: '',
  espesor_molde4_b: '',
  espesor_molde5_a: '',
  espesor_molde5_b: '',
  espesor_molde6_a: '',
  espesor_molde6_b: '',
  granulometria_mallas35: '',
  granulometria_mallas40: '',
  granulometria_mallas70: '',
  granulometria_mallas100: '',
  granulometria_mallas120: '',
  fond: ' ',
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
      observaciones_prensado_secado: [
        ...(f.observaciones_prensado_secado ?? []),
        { observacion: v },
      ],
    }));
    setObsInput('');
  };

  const removeObs = (index) => {
    setForm((f) => ({
      ...f,
      observaciones_prensado_secado: f.observaciones_prensado_secado.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const rows = Array.isArray(f?.tabla_prensado_secado)
        ? [...f.tabla_prensado_secado]
        : [];
      if (idx < 0 || idx >= rows.length) return f; // evita índices fuera de rango
      rows[idx] = { ...(rows[idx] ?? {}), [field]: value };
      return { ...f, tabla_prensado_secado: rows };
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
      if (f.tabla_prensado_secado.length >= rows) return f;
      return {
        ...f,
        tabla_prensado_secado: [...f.tabla_prensado_secado, NuevaFilaTabla()],
      };
    });
  };

  const removeRows = () => {
    setForm((f) => {
      if (f.tabla_prensado_secado.length <= 0) return f;
      return {
        ...f,
        tabla_prensado_secado: f.tabla_prensado_secado.slice(0, -1),
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
        // console.log('atimizado', data.dato.turno);
        if (data?.ok) setForm(data.dato ?? {});
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
    const result = datosPrensadoSecado.safeParse(form);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      console.log('errores ', fieldErrors);
      const tablaErrors = extractArrayFieldErrors(
        result.error,
        'tabla_prensado_secado'
      );
      setError(fieldErrors);
      setTablaError(tablaErrors);
      toast.error('Datos incorrectos');
      return;
    } else {
      try {
        console.log('eviar ', form);
        setloadingUpdate(true);
        const data = result.data;
        console.log(data);
        const response = await updatedById(id, data);
        console.log('response ', response);
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
          Detalles de Control de Procesos - Prensado y Secado
        </DialogTitle>
        {loading ? (
          <LoadingScreen />
        ) : (
          <DialogContent>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 2 }}>
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

                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="N° Prensa"
                    name="n_prensa"
                    value={form.n_prensa || ''}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !isEditing }}
                    error={!!error.n_prensa}
                    helperText={error.n_prensa?.[0]}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Turno"
                    type="label"
                    name="turno"
                    value={form.turno || ''}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !isEditing }}
                    error={!!error.turno}
                    helperText={error.turno?.[0]}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Formato"
                    type="label"
                    name="formato"
                    value={form.formato || ''}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !isEditing }}
                    error={!!error.formato}
                    helperText={error.formato?.[0]}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Supervisor de Turno"
                    type="label"
                    name="supervisor_turno"
                    value={form.supervisor_turno || ''}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !isEditing }}
                    error={!!error.supervisor_turno}
                    helperText={error.supervisor_turno?.[0]}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="producto"
                    type="label"
                    name="producto"
                    value={form.producto || ''}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !isEditing }}
                    error={!!error.producto}
                    helperText={error.producto?.[0]}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 7 }}>
                  {!isEditing ? (
                    <Paper>
                      <>
                        <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                          <Typography> Observaciones </Typography>
                          {(form.observaciones_prensado_secado ?? []).map(
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
                        {(form.observaciones_prensado_secado ?? []).map(
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
                  minWidth: 2500,
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
                      style={{ width: 130 }}
                    >
                      Hora
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      rowSpan={3}
                      align="center"
                      className="groupTitle"
                      style={{ width: 80 }}
                    >
                      % <br /> Humo <br /> Polvo
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={7}
                      rowSpan={2}
                      align="center"
                      className="groupTitle"
                      style={{ width: 600 }}
                    >
                      MASA POR MOLDE KG
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={14}
                      rowSpan={1}
                      align="center"
                      className="groupTitle"
                      style={{ width: 990 }}
                    >
                      ESPESOR POR MOLDE MM
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={7}
                      rowSpan={1}
                      align="center"
                      className="groupTitle"
                      style={{ width: 550 }}
                    >
                      GRANULOMETRIA
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      molde <br />1
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      molde <br />2
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      molde <br />3
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      molde <br />4
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      molde <br />5
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      molde <br />6
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={2}
                      align="center"
                      className="groupTitle"
                    >
                      molde <br />7
                    </TableCell>

                    <TableCell
                      component="th"
                      colSpan={7}
                      align="center"
                      className="groupTitle"
                    >
                      mallas
                    </TableCell>
                  </TableRow>
                  <TableRow>
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
                      2
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      3
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      4
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      5
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      6
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      7
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      A
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      B
                    </TableCell>

                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      A
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      B
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      A
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      B
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      A
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      B
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      A
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      B
                    </TableCell>

                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      A
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      B
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      A
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      B
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      35
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      40
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      50
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      70
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      100
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      120
                    </TableCell>
                    <TableCell
                      component="th"
                      colSpan={1}
                      align="center"
                      className="groupTitle"
                    >
                      Fon.
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {form?.tabla_prensado_secado?.map((row, idx) => (
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
                          value={row.hum_polvo}
                          onChange={(e) => {
                            setCargaTabla(idx, 'hum_polvo', e.target.value);
                          }}
                          error={!!tablaError[idx]?.hum_polvo}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.masa_molde_uno}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'masa_molde_uno',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.masa_molde_uno}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.masa_molde_dos}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'masa_molde_dos',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.masa_molde_dos}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.masa_molde_tres}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'masa_molde_tres',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.masa_molde_tres}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.masa_molde_cuatro}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'masa_molde_cuatro',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.masa_molde_cuatro}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.masa_molde_cinco}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'masa_molde_cinco',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.masa_molde_cinco}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.masa_molde_seis}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'masa_molde_seis',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.masa_molde_seis}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.masa_molde_siete}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'masa_molde_siete',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.masa_molde_siete}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_uno_a}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_uno_a',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_uno_a}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_uno_b}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_uno_b',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_uno_b}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_dos_a}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_dos_a',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_dos_a}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_dos_b}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_dos_b',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_dos_b}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_tres_a}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_tres_a',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_tres_a}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_tres_b}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_tres_b',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_tres_b}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_cuatro_a}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_cuatro_a',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_cuatro_a}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_cuatro_b}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_cuatro_b',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_cuatro_b}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_cinco_a}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_cinco_a',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_cinco_a}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_cinco_b}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_cinco_b',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_cinco_b}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_seis_a}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_seis_a',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_seis_a}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_seis_b}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_seis_b',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_seis_b}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_siete_a}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_siete_a',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_siete_a}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.espesor_molde_siete_b}
                          onChange={(e) => {
                            setCargaTabla(
                              idx,
                              'espesor_molde_siete_b',
                              e.target.value
                            );
                          }}
                          error={!!tablaError[idx]?.espesor_molde_siete_b}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.mallas_35}
                          onChange={(e) => {
                            setCargaTabla(idx, 'mallas_35', e.target.value);
                          }}
                          error={!!tablaError[idx]?.mallas_35}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.mallas_40}
                          onChange={(e) => {
                            setCargaTabla(idx, 'mallas_40', e.target.value);
                          }}
                          error={!!tablaError[idx]?.mallas_40}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.mallas_50}
                          onChange={(e) => {
                            setCargaTabla(idx, 'mallas_50', e.target.value);
                          }}
                          error={!!tablaError[idx]?.mallas_50}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.mallas_70}
                          onChange={(e) => {
                            setCargaTabla(idx, 'mallas_70', e.target.value);
                          }}
                          error={!!tablaError[idx]?.mallas_70}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.mallas_100}
                          onChange={(e) => {
                            setCargaTabla(idx, 'mallas_100', e.target.value);
                          }}
                          error={!!tablaError[idx]?.mallas_100}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.mallas_120}
                          onChange={(e) => {
                            setCargaTabla(idx, 'mallas_120', e.target.value);
                          }}
                          error={!!tablaError[idx]?.mallas_120}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.font}
                          onChange={(e) => {
                            setCargaTabla(idx, 'font', e.target.value);
                          }}
                          error={!!tablaError[idx]?.font}
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
