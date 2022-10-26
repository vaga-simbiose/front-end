import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'

import api from '../../../services/api';
import Footer from '../../../components/footer-admin'
import MenuAdmin from '../../../components/menu-admin';
import { useState } from 'react';
import { useEffect } from 'react';

const mdTheme = createTheme();

export default function PessoasEditar() {

  const [nome_pessoa, setNome_pessoa] = useState('')
  const [email_pessoa, setEmail_pessoa] = useState('')
  const [tipo_pessoa, setTipo_pessoa] = useState('')
  const [senha_pessoa, setSenha_pessoa] = useState('')

  const { _id } = useParams()

  useEffect(() => {
    async function getPessoa(){
      let response = await api.get('/pessoa.details/'+_id)
      
      setNome_pessoa(response.data.nome_pessoa)
      setEmail_pessoa(response.data.email_pessoa)
      setTipo_pessoa(response.data.tipo_pessoa)
      setSenha_pessoa(response.data.senha_pessoa)

    }
    getPessoa()
  },[])

  async function handleSubmit(){
   
    const data = {_id, nome_pessoa, email_pessoa, tipo_pessoa, senha_pessoa}
    console.log('test', data)

    const response = await api.put('/pessoa/'+_id, data)
    console.log('response', response)
    if(response.status === 200 ){
      window.location.href='/admin/pessoas'
    } else{
      alert('Erro ao atualizar')
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

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
          <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <h2 paddingBottom={0} >Atualização de Pessoas</h2>
                <Paper>
                  <Grid container paddingLeft={5} spacing={3}>
                    <Grid item xs={12} sm={10} paddingLeft={11}>
                      <TextField
                        required
                        id="nome_pessoa"
                        name="nome_pessoa"
                        label="Nome Completo"
                        fullWidth
                        value={nome_pessoa}
                        onChange={e => setNome_pessoa(e.target.value)}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} paddingLeft={5} paddingBottom={2.5}>
                      <TextField
                        required
                        id="email_pessoa"
                        name="email_pessoa"
                        label="Email da pessoa"
                        fullWidth

                        value={email_pessoa}
                        onChange={e => setEmail_pessoa(e.target.value)}
                        variant="standard"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} paddingLeft={5}>
                      <InputLabel id="tipo_pessoa" >Tipo</InputLabel>
                      <Select
                        labelId="tipo_pessoa"
                        id="tipo_pessoa"
                        fullWidth
                        value={tipo_pessoa}
                        onChange={e => setTipo_pessoa(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Funcionário</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6} paddingLeft={5} paddingBottom={2.5}>
                      <TextField
                        required
                        id="Senha_pessoa"
                        name="Senha_pessoa"
                        label="Senha"
                        type="password"
                        fullWidth
                        value={senha_pessoa}
                        onChange={e => setSenha_pessoa(e.target.value)}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} paddingBottom={5}>
                    <Button variant="outlined" onClick={handleSubmit}>Salvar</Button>
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
