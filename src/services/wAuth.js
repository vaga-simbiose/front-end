import React, { useEffect, useState} from "react"
import api from "./api"
import { login, logout, getToken } from './auth'
import { Route, Redirect} from 'react-router-dom'

export default function WAuth ({ component: Component, ... rest}){
    const [ redirect, setRedirect] = useState(false)
    const [ loading, setLoading] = useState(true)

    useEffect(() => {
        async function verify(){
            let res = await api.get('/admin/getToken',{params:{token:getToken()}})
            if(res.data.status === 200){
                setLoading(false)
                setRedirect(false)
            } else {
                logout()
                setLoading(false)
                setRedirect(true)
            }
        }
        verify()
    },[])

    return(
        <Route { ... rest}
        render={props => !redirect? (
            <Component { ... props } />
        ):<Redirect to={{pathname: '/admin/login', state:{ from: props.location}}} />
        } />
    )
}