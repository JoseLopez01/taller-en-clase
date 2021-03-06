import { useEffect, useState } from 'react';
import format from 'date-fns/format';

import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

export interface PersonsProps {
  handleOnSelect: (person: any) => void;
  handleOnDelete: (id: string) => void;
  rows: any[];
}

function Persons({ handleOnSelect, rows, handleOnDelete }: PersonsProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Carrera</TableCell>
            <TableCell>Fecha de nacimiento</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleOnSelect(row)}
            >
              <TableCell component="th" scope="row">
                {row.nombres} {row.apellidos}
              </TableCell>
              <TableCell>{row.carrera}</TableCell>
              <TableCell>
                {format(new Date(row.fechaNacimiento), 'MMM, dd, yy')}
              </TableCell>
              <TableCell>{row.imagen}</TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => handleOnDelete(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Persons;
