
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DetailCountryCardById } from '../actions'
import s from "./styles/activity.module.css"



function Activity() {
  const oneById = useSelector((state) => state.oneById)

  const dispatch = useDispatch()
  let { id } = useParams();
  useEffect(() => {
    dispatch(DetailCountryCardById(id))
    console.log(id, "trayendo actividades")
  }, [id])

  return (

    <div className={`${s.activity_actvMainDiv}`}>{oneById.activities?.map((e) => {
      /*  /* console.log(oneById.activities,  "esteee") */
      return (
        <div className={`${s.activity_actvEachDiv}`} key={e.id}>
          <h4>Activity: </h4> <p>{e.name}</p>
          <p>Difficulty: {e.difficulty}</p>
          <p>Duration: {e.duration}</p>
          <p>Season: {e.season}</p>
        </div>)
    })}
    </div>
  )
}

export default Activity