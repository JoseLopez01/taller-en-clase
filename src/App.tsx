import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Form from './components/Form';
import Persons from './components/Persons';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container sx={{ paddingTop: 2 }} maxWidth={false}>
          <Typography variant="h4" align="center">
            Taller Buenas Practicas
          </Typography>
          <Grid container sx={{ paddingTop: 2 }}>
            <Grid item xs={4} sx={{ padding: 4 }}>
              <Form person={selectedPerson} />
            </Grid>
            <Grid item xs={8} sx={{ padding: 4 }}>
              <Persons handleOnSelect={setSelectedPerson} />
            </Grid>
          </Grid>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
