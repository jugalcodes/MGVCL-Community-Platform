// we have created this as without signout he can still access the page so we need to create private route so that 
// we can access several components such as dashboard and all only when the user is signed in 
// Navigate is actually a component which is used to redirect navigate and "useNavigate" is a hook 

import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)

    return currentUser ? <Outlet /> : <Navigate to="/sign-in"/>

}
