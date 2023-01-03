
import React from 'react'
import { Link } from 'react-router-dom'
import s from './card.module.css'


export default function Card({ country }) {
   

    return (

        <div  className={`${s.home_allCards}`}  >

            {country.length && country.map(e => {
                return (
                    <div   >
                        < Link to={`/country/${e.id}`} style={{ textDecoration: 'none' }} >

                            <div className={`${s.home_cardEach }`}>
                                <h1>{e.name}</h1>
                                <img src={e.flag} alt="flag" height='150px' width='210px' />
                                <p>Continent: {e.continent}</p>
                            </div>

                        </Link >
                    </div>
                )
            })

            }
        </div>
    )
}
