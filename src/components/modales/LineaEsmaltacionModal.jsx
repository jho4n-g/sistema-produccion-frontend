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
} from '@mui/material';

export default function LienaEsmaltacionModal({ open, onClose }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xl  ">
      <DialogTitle>
        Detalles de Control de Procesos - Linea Esmaltacion
      </DialogTitle>
      <DialogContent>
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
                  <TextField size="small" name="blanco_residuo" />
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
              <TableRow>
                <TableCell align="center">
                  <TextField type="time" size="small" v />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField size="small" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained">Guardas Cambios </Button>
      </DialogActions>
    </Dialog>
  );
}
