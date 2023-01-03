import React from 'react'
import { Link } from 'react-router-dom'
import s from './card.module.css'


function ActCardRender({ name, flag, continent, id }) {


    console.log(flag)



    return (

        <div>

            <div className={`${s.home_cardEach}`} >

                <Link to={`/country/${id}`} style={{ textDecoration: 'none' }}>

                    <div className={`${s.card_cardDiv}`} key={`${id}`} >
                        <h1> {name}</h1>
                        <img src={flag} alt="flag" height='150px' width='210px' />
                        <p>Continenttt: {continent}</p>
                    </div>

                </Link>
            </div>

        </div>
    )
}



export default ActCardRender