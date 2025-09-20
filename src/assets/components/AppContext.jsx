import React, { useEffect } from 'react'
import { useContext, createContext, useState } from 'react'
import supabase from '../../config/supabaseClient'

const AppContext = createContext(null)

export function AppProvider({ children }) {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true);


    async function getSession() {
        //retrieve a session
        const { data, error } = await supabase.auth.getSession()
        setSession(data.session)
    }

    async function logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error.message);
        } else {
            setSession(null);
        }
    }

    useEffect(() => {
        setLoading(true);
        getSession().finally(() => setLoading(false));

        // Listen for auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    return (
        <AppContext.Provider value={{ session, setSession, logout, loading }}>
            {children}
        </AppContext.Provider>
    )

}

export function useAppContext() {
    return useContext(AppContext)
}

