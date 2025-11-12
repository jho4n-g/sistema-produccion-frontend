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
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';

const MAX_FILAS = 16;

export default function MoliendoBarbotinaModal({
  open,
  onClose,
  fetchById,
  id,
  isEditing,
  onSave,
}) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const setCargaTabla = (idx, field, value) => {
    setForm((f) => {
      const next = [...f.TablaBarbotinaDatos];
      next[idx] = { ...next[idx], [field]: value };
      return { ...f, TablaBarbotinaDatos: next };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (open && isEditing && id) {
        const data = await fetchById(id);
        if (data.ok) {
          setForm(data.dato);
        }
      }
    };

    fetchData();
  }, [open, isEditing, fetchById, id]);

  const updateBase = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleSave = () => {
    console.log(form);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="xl  ">
      <DialogTitle>
        Detalles de Control de Procesos - Moliendo barbotina
      </DialogTitle>
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
                    InputProps={{ readOnly: true }}
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
                    InputProps={{ readOnly: true }}
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
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Observaciones"
                    name="observacion"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
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
                  align="center"
                  sx={{ minWidth: 100 }}
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
                    InputProps={{ readOnly: true }}
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
                <TableCell component="th" align="center" sx={{ minWidth: 110 }}>
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
                    name="nombre_lugar_cuarto_cargando_molinos"
                    value={form.humedad_lugar_uno_cargando_molinos}
                    onChange={updateBase}
                    InputLabelProps={{ shrink: true }}
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
              {form?.TablaBarbotinaDatos?.map(
                (
                  row,
                  idx // ✅ Orden correcto
                ) => (
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
                          setCargaTabla(idx, 'hora_inicio', e.target.value);
                        }}
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
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Guardas Cambios{' '}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
