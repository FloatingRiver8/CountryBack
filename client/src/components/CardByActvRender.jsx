import React from 'react'
import { Link } from 'react-router-dom'
import s from './styles/home.module.css'


function CardFilteredByActv({ name, flag, continent, id }) {


    return (


        <div>

            {name.map((n) => {

                return (
                    <Link to={`/country/${id}`} style={{ textDecoration: 'none' }}>

                        <div className={`${s.home_cardEach}`} key={`${id}`} >
                            <h1> {name}</h1>
                            <img src={flag} alt="flag" height='150px' width='210px' />
                            <p>Continent: {continent}</p>
                        </div>

                    </Link>

                )

            })}

        </div>)


}



export default CardFilteredByActv