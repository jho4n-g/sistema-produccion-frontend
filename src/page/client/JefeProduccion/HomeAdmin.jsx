import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function CollapsibleDrawer() {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Ancho del Drawer
  const drawerWidth = open ? 240 : 64;

  const menuItems = [
    { text: 'Inbox', icon: <InboxIcon /> },
    { text: 'Starred', icon: <MailIcon /> },
    { text: 'Send email', icon: <InboxIcon /> },
    { text: 'Drafts', icon: <MailIcon /> },
  ];

  // Estado para el item seleccionado (lo inicializamos con el primer elemento)
  const [selected, setSelected] = React.useState(menuItems[0]?.text || '');

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: 'width 0.5s',
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            p: 1,
          }}
        >
          {open && <Box sx={{ fontWeight: 'bold', pl: 1 }}>Menú</Box>}
          <IconButton
            onClick={toggleDrawer}
            aria-label="toggle drawer"
            aria-expanded={open}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ py: 1 }}>
          {/* Título tipo "MAIN MENU" */}
          {open && (
            <Box sx={{ px: 2, pb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  letterSpacing: 0.6,
                }}
              >
                MAIN MENU
              </Typography>
            </Box>
          )}

          {menuItems.map((item) => {
            const content = (
              <ListItemButton
                onClick={() => setSelected(item.text)}
                selected={selected === item.text}
                sx={{
                  minHeight: 52,
                  px: 2,
                  my: 0.5,
                  borderRadius: 2,
                  justifyContent: open ? 'flex-start' : 'center',
                  // estilo del item seleccionado (fondo morado claro similar a la imagen)
                  bgcolor: selected === item.text ? '#F3EEFF' : 'transparent',
                  '&:hover': {
                    bgcolor:
                      selected === item.text ? '#F3EEFF' : 'action.hover',
                  },
                  transition: 'background-color 160ms, transform 120ms',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : 'auto',
                    justifyContent: 'center',
                    color:
                      selected === item.text ? '#6B46C1' : 'text.secondary',
                    fontSize: 22,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {open && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: {
                        fontWeight: 600,
                        color:
                          selected === item.text
                            ? 'text.primary'
                            : 'text.secondary',
                      },
                    }}
                  />
                )}
              </ListItemButton>
            );

            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: 'block' }}
              >
                {open ? (
                  content
                ) : (
                  <Tooltip title={item.text} placement="right" arrow>
                    <Box>{content}</Box>
                  </Tooltip>
                )}
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h2>Contenido principal</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero id
          facere quia quae quis nesciunt culpa consequuntur autem. Quisquam,
          eveniet excepturi! Dolorem in asperiores excepturi harum deserunt
          illum rerum perspiciatis.
        </p>

        {/* Ejemplo de mostrar qué item está seleccionado */}
        <Box sx={{ mt: 3 }}>
          <strong>Seleccionado:</strong> {selected}
        </Box>
      </Box>
    </Box>
  );
}
