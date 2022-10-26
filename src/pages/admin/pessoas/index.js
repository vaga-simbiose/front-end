import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';

import Footer from '../../../components/footer-admin'
import MenuAdmin from '../../../components/menu-admin';
import api from '../../../services/api';

import auth from '../../../services/auth'

const mdTheme = createTheme();

export default function PessoasListagem() {

  const [pessoa, setPessoa] = useState([]);

  console.log('pessoa', pessoa)

  useEffect(() => {
    async function loadPessoa() {
      const response = await api.get('/pessoa');
      setPessoa(response.data)
    }
    loadPessoa();
  }, [])

  async function handleDelete(_id){
      if(window.confirm('Deseja realmente excluir esta pessoa?')){
        let result = await api.delete('/pessoa/'+_id) 
        if(result.status === 200){
          console.log('result', result.status)
           window.location.href = `/admin/pessoas/`
        } else {
          alert('Ocorreu um erro')
        }
      }
  }


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <MenuAdmin title={'Pessoas'} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper>
                  <h2>Listagem de pessoas</h2>
                  <Grid container paddingLeft={5} spacing={3}>
                    <Grid item xs={12} sm={12} >
                      <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Tipo</TableCell>
                              <TableCell align="center">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pessoa.map((p) => (
                              <TableRow
                                key={p._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="p">
                                  {p.nome_pessoa}
                                </TableCell>
                                <TableCell align="center">{p.email_pessoa}</TableCell>
                                <TableCell align="center">{p.tipo_pessoa===1?<> <Chip label="Administrador" color='info'/></>:<><Chip label="Funcionário" color="secondary" /></>}</TableCell>
                                <TableCell>
                                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button href={'/admin/pessoas/editar/'+p._id}>Atualizar</Button>
                                    <Button color='error' onClick={() => handleDelete(p._id)}>Excluir</Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

