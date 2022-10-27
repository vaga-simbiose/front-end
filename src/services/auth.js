export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const NOME_USUARIO = '&nome-usuario';
export const USER_TYPE = '&user-type';

export const login = token => { localStorage.setItem(TOKEN_KEY, token) }
export const logout = () => { localStorage.clear() }

export const setIdPessoa = id => localStorage.setItem(ID_USUARIO, id)
export const getIdPessoa = () => localStorage.getItem(ID_USUARIO)

export const setNomePessoa = nome => localStorage.setItem(NOME_USUARIO, nome)
export const getNomePessoa = () => localStorage.getItem(NOME_USUARIO)

export const setTipoPessoa = tipo => localStorage.setItem(USER_TYPE, tipo)
export const getTipoPessoa = () => localStorage.getItem(USER_TYPE)

export const getToken = () => localStorage.getItem(TOKEN_KEY)
