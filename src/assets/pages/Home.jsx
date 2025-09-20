import React from 'react'
import { useAppContext } from '../components/AppContext'
import { useEffect } from 'react'

const Home = () => {

    useEffect(()=>{
        document.title = "Home"
    }, [])

    return (
        <div>
            Home

            
        </div>
    )
}

export default Home