

import s from "./styles/activity.module.css"

/* Cartitas de actividades */

function ActivityCard({oneById}) {


  return (

    <div className={`${s.activity_actvMainDiv}`}>

      {oneById.activities?.map((e) => {

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

export default ActivityCard