import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div>
            <h3>Landing</h3>

            <Link to='/home'><button>Home</button></Link>

        </div>
    )
}

export default LandingPage