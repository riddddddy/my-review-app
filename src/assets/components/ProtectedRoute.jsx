import React from 'react'
import { useAppContext } from './AppContext'
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {
    const { session, loading } = useAppContext()

    if (loading) {
        return <div>Loading...</div>; // or a spinner
    }

    if (!session?.user) {
        return <Navigate to='/' replace />
    }

    return children
}

export default ProtectedRoute