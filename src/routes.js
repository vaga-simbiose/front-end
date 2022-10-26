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

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Rota Client */}
                <Route path="/" exact component={Home} />
                
                {/* Rota Admin */}
                <Route path="/admin" exact component={Dashboard} />
                <Route path="/admin/login" exact component={Login} />
                <Route path="/admin/pessoas" exact component={Pessoas} />
                <Route path="/admin/pessoas/cadastrar" exact component={PessoasCadastrar} />
                <Route path="/admin/pessoas/editar/:_id" component={PessoasEditar} />
            </Switch>
        </BrowserRouter>
    )
}