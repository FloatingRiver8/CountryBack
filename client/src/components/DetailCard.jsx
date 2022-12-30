import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {detailCardById} from '../actions'
import s from './detailCard.module.css'

import Activity from './Activity'

export default function DetailCard() {

const dispatch = useDispatch()


const oneById = useSelector((state) => state.oneById)
 const [isVisible, setIsVisible]= useState(false) 

const handleClick =() => {
    setIsVisible(!isVisible) //para las actividades, renderizado con botón
}


let { id } = useParams(); 
useEffect(() =>{
dispatch(detailCardById(id))
/* console.log(id) */
},[id])


/* Las Actividades que me vienen incluidas en el estado oneCountry ya que en el back le sumé que me traiga lo que esté en la BD del modelo Activities */

    return (




        <div className={`${s.div_detailCard}` } key={oneById.id}>

            <Link to='/home'>
                <button /* className={`${f.home_btn_createActivity}`} */>
                 Home
                </button>
            </Link>

            <div className={`${s.detailCard_card}`}>
            <h1>{oneById.name}</h1>
            <h2>Capital: {oneById.capital}</h2>
            <p>Id:{oneById.id}</p>
            <img src={oneById.urlFlag} alt="flag" height='150px' width='210px' />
            <p>Continent: {oneById.continent}</p>
            <p>Subregion: {oneById.subregion}</p>
            <p>Area: {oneById.area}</p>
            <p>Population: {oneById.population}</p>
            <p>Population: {oneById.population}</p>

            </div>
            <button onClick ={handleClick} > Activity: </button>
            {isVisible && <Activity />}
                        
        </div>
                    )}

