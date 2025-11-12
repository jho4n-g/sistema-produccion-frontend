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

export default function AtomizadoModal({ open, onClose }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xl  ">
      <DialogTitle>
        Detalles de Control de Procesos - Prensado y Secado
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
              minWidth: 1600,
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
                  style={{ width: 80 }}
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
                  colSpan={12}
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
              <TableRow>
                <TableCell>
                  <TextField size="small" type="time" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
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
