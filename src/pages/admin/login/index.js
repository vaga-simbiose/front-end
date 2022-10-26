import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '../../../assets/img/a.jpg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import api from '../../../services/api';
import { useReducer } from 'react';
import { login, setIdPessoa, setNomePessoa, setTipoPessoa } from '../../../services/auth';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/santiagoidu">
        Desenvolvido por Marco Tulio C Santiago
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  
  
  const [ email_pessoa, setEmail_pessoa] = useState('')
  const [ senha_pessoa, setSenha_pessoa] = useState('')

  async function handleSubmit() {
    await api.post('pessoa/login/', {email_pessoa, senha_pessoa})
        .then(res => {
            if(res.status === 200) 
            {   console.log('res', res)
                if(res.data.status === 1){
                    console.log('res', res)

                    login(res.data.token);
                    setIdPessoa(res.data.id_client);
                    setNomePessoa(res.data.nome_pessoa);
                    setTipoPessoa(res.data.user_type);
                    window.location.href= '/admin'
                } else if(res.data.status === 2){
                }
            } else {
                alert('Erro no servidor')
            }
        })
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img src={LockOutlinedIcon} />
          
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          
            <TextField
              margin="normal"
              required
              fullWidth
              id="email_pessoa"
              label="Digite seu email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email_pessoa}
              onChange={e => setEmail_pessoa(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha_pessoa"
              label="Digite sua senha"
              type="password"
              id="senha_pessoa"
              autoComplete="current-password"
              value={senha_pessoa}
              onChange={e => setSenha_pessoa(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Entrar
            </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
