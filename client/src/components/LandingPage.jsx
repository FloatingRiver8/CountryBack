import React from 'react'
import { Link } from 'react-router-dom'
import s from './styles/landing.module.css'


function LandingPage() {
    return (
        <div className={`${s.landing_cardDiv}`}>
            
            <Link to='/home'><button className={`${s.landing_button}`}> <p>Home</p></button></Link>

        </div>
    )
}

export default LandingPage