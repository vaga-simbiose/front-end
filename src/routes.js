import React from "react"

import { BrowserRouter, Switch, Route } from 'react-router-dom'

// imports Admin
import Dashboard from "./pages/admin/dashboard"
import Pessoas from "./pages/admin/pessoas"
import PessoasEditar from "./pages/admin/pessoas/pessoas.editar"
import PessoasCadastrar from "./pages/admin/pessoas/pessoas.cadastrar"
import Login from './pages/admin/login'

// imports Client
import Home from "./pages/client/home"

import PrivateRoute from './services/wAuth'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Rota Client */}
                <Route path="/" exact component={Login} />
                
                {/* Rota Admin */}
                <PrivateRoute path="/admin" exact component={Dashboard} />
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute path="/admin/pessoas" exact component={Pessoas} />
                <Route path="/admin/pessoas/cadastrar" exact component={PessoasCadastrar} />
                <PrivateRoute path="/admin/pessoas/editar/:_id" component={PessoasEditar} />
            </Switch>
        </BrowserRouter>
    )
}