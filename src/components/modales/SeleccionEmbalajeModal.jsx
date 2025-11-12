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

export default function SerigraficaDecoradodoModal({ open, onClose }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xl  ">
      <DialogTitle>
        Detalles de Control de Procesos - Seleccion y Embalaje
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
              minWidth: 3000,
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
                  width={90}
                >
                  Hora
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={12}
                  align="center"
                  className="groupTitle"
                >
                  PRIMERA (CAJA) TONO - CALIBRE
                </TableCell>
                <TableCell component="th" align="center" className="groupTitle">
                  Segunda
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={10}
                  align="center"
                  className="groupTitle"
                >
                  DEFECTOS (PIEZAS)
                </TableCell>
                <TableCell component="th" align="center" className="groupTitle">
                  Tercera
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={7}
                  align="center"
                  className="groupTitle"
                >
                  DEFECTOS (PIEZAS)
                </TableCell>
                <TableCell component="th" align="center" className="groupTitle">
                  Casco
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={4}
                  align="center"
                  className="groupTitle"
                >
                  DEFECTOS (PIEZAS)
                </TableCell>
                <TableCell component="th" align="center" className="groupTitle">
                  ESPACIO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  A1
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  A2
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  A3
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  B1
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  B2
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  B3
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  c1
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  C2
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  C3
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  D1
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  D2
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  D3
                </TableCell>
                <TableCell
                  component="th"
                  align="center"
                  colSpan={1}
                  className="groupTitle"
                >
                  cajas
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN1" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN2" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN3" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN4" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN5" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN6" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN7" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN8" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN9" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="segunda_defectoN10" />
                </TableCell>
                <TableCell component="th" className="groupTitle">
                  CAJAS
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
                  <TextField size="small" name="tercera_defectoN2" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="tercera_defectoN3" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="tercera_defectoN4" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="tercera_defectoN5" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="tercera_defectoN6" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="tercera_defectoN7" />
                </TableCell>
                <TableCell className="groupTitle">Cajas</TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="casco_defectoN1" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="casco_defectoN2" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="casco_defectoN3" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  <TextField size="small" name="casco_defectoN4" />
                </TableCell>
                <TableCell className="groupTitle" align="center">
                  (Min.)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <TextField size="small" type="time" />
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
                  <TextField />
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
