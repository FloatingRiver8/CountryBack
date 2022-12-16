import React from 'react'
import s from './card.module.css'

export default function Card({ name, capital, flag, continent, subregion, area,population }) {
    return (
        <div className={`${s.card_cardDiv}`}>
            <h1>{name}</h1>
            <h2>{capital}</h2>
            <img src={flag} alt="flag" height='150px' width='210px' />
            <p>Continent: {continent}</p>
            <p>Subregion: {subregion}</p>
            <p>Area: {area}</p>
            <p>Population: {population}</p>
        </div>
    )
}
