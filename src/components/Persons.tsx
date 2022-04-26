import { useEffect, useState } from 'react';
import format from 'date-fns/format';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAll } from '../db/db';

export interface PersonsProps {
  rows: any[];
}

function Persons() {
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    async function getPersons() {
      const persons = await getAll();
      setRows(persons);
    }

    getPersons();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Carrera</TableCell>
            <TableCell>Fecha de nacimiento</TableCell>
            <TableCell>Imagen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombres} {row.apellidos}
              </TableCell>
              <TableCell>{row.carrera}</TableCell>
              <TableCell>
                {format(new Date(row.fechaNacimiento), 'MMM, dd, yy')}
              </TableCell>
              <TableCell>{row.imagen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Persons;
