import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { add } from '../db/db';

const Image = styled('img')(() => ({
  width: 200,
  height: 200,
}));

export interface FormState {
  nombres: string;
  apellidos: string;
  carrera: string;
  fechaNacimiento: string;
  imagen: string;
}

const initialState: FormState = {
  nombres: '',
  apellidos: '',
  carrera: '',
  imagen: '',
  fechaNacimiento: '',
};

function Form() {
  const [formState, setFormState] = useState<FormState>({
    ...initialState,
    fechaNacimiento: new Date().toISOString(),
  });

  useEffect(() => {
    async function randomImageFromPicsum() {
      console.log('randomImageFromPicsum');
      const response = await fetch('https://picsum.photos/200/200');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFormState((prevState) => ({
        ...prevState,
        imagen: url,
      }));
    }

    randomImageFromPicsum();
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnChangeDate = (date: Date | null) => {
    if (date) {
      setFormState((prevState) => ({
        ...prevState,
        fechaNacimiento: date.toISOString(),
      }));
    }
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    add(formState);
  };

  const { apellidos, carrera, fechaNacimiento, imagen, nombres } = formState;

  return (
    <form onSubmit={handleOnSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Nombres"
          name="nombres"
          value={nombres}
          onChange={handleOnChange}
          fullWidth
        />
        <TextField
          label="Apellidos"
          name="apellidos"
          value={apellidos}
          onChange={handleOnChange}
          fullWidth
        />
        <TextField
          label="Carrera"
          name="carrera"
          value={carrera}
          onChange={handleOnChange}
          fullWidth
        />
        <DatePicker
          onChange={handleOnChangeDate}
          value={fechaNacimiento}
          renderInput={(props) => (
            <TextField label="Fecha de nacimiento" fullWidth {...props} />
          )}
        />
        <Image src={imagen} alt="imagen" />
        <Button type="submit" variant="contained" color="primary" size="large">
          Guardar
        </Button>
      </Stack>
    </form>
  );
}

export default Form;
