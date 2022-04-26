import { FormEvent, useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Form from './components/Form';
import Persons from './components/Persons';
import { getAll, updatePerson, add, deletePerson } from './db/db';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [persons, setPersons] = useState<any>([]);

  useEffect(() => {
    async function getPersons() {
      const persons = await getAll();
      setPersons(persons);
    }

    getPersons();
  }, []);

  const handleOnSubmit = async (data: any) => {
    if (selectedPerson) {
      await updatePerson(selectedPerson.id, data);
    } else {
      await add(data);
    }
    const persons = await getAll();
    setPersons(persons);
  };

  const handleOnDelete = async (id: string) => {
    await deletePerson(id);
    const persons = await getAll();
    setPersons(persons);
  };

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
              <Form person={selectedPerson} handleOnSubmit={handleOnSubmit} />
            </Grid>
            <Grid item xs={8} sx={{ padding: 4 }}>
              <Persons
                handleOnSelect={setSelectedPerson}
                handleOnDelete={handleOnDelete}
                rows={persons}
              />
            </Grid>
          </Grid>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
