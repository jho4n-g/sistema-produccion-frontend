import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpeedIcon from '@mui/icons-material/Speed';
import FactoryIcon from '@mui/icons-material/Factory';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function InicioPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Bloque principal: saludo + resumen */}
        <Grid size={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              background:
                'linear-gradient(135deg, rgba(0,102,51,0.07), rgba(0,102,51,0.01))',
            }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, mb: 0.5 }}
                  color="primary"
                >
                  Bienvenido al Sistema de Producción
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Controla tus procesos de molienda, atomizado, prensado y
                  esmalte desde un solo lugar.
                </Typography>
              </Box>

              <Stack alignItems="flex-end" spacing={1}>
                <Chip
                  label="Vista general"
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
