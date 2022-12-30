import React from 'react'
import {Link} from 'react-router-dom'
import s from './card.module.css'


export default function Card({ name, flag, continent,id}) {
    return (
        <Link to = {`/country/${id}`} > 
        
        <div className={`${s.card_cardDiv}` }>
            <h1>{name}</h1>
            <img src={flag} alt="flag" height='150px' width='210px' />
            <p>Continent: {continent}</p>
          
          
        </div>
       
       </Link> 










    )
}