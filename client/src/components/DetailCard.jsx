import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
/* import s from './card.module.css' */

import { useSelector, useDispatch } from 'react-redux'
import {detailCardById} from '../actions'

export default function DetailCard() {

const dispatch = useDispatch()


const oneCountry = useSelector((state) => state.oneCountry)


let { id } = useParams(); 
useEffect(() =>{
dispatch(detailCardById(id))
},[dispatch])



    return (
        <div >
            <h1>{oneCountry.name}</h1>
            <h2>{oneCountry.capital}</h2>
            <p>Id:{id}</p>
            <img src={oneCountry.flag} alt="flag" height='150px' width='210px' />
            <p>Continent: {oneCountry.continent}</p>
            <p>Subregion: {oneCountry.subregion}</p>
            <p>Area: {oneCountry.area}</p>
            <p>Population: {oneCountry.population}</p>
        </div>
    )
}
