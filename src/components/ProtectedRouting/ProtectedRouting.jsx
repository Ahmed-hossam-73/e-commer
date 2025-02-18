import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedRouting({children}) {
    if(localStorage.getItem('token')){
        return children
    }else{
        return <Navigate to='/login'/>
    }
}
