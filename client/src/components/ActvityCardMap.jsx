import React from 'react'
import CardFilteredByActv from './CardByActvRender'
import s from './styles/home.module.css'

import { useHistory } from 'react-router-dom'


export default function ActivityCard({ countryWithActivity, displayAllCards }) {

    const history = useHistory()


    return (

        <div className={`${s.home_allCards}`}  >
            <div>
                {/* //para generar volver al home desd el componente activityCard */}
                <button onClick={(e) => displayAllCards(e)} className={`${s.activityCard_btnHome}`}>
                    Home
                </button>
            </div>

            {countryWithActivity && countryWithActivity.map((c) => {

                return (



                    <div key={c.id} >

                        <CardFilteredByActv name={c.countries.map((n) => n.name)} flag={c.countries.map((f) => f.urlFlag)} continent={c.countries.map((a) => a.continent)} key={c.countries.map((i) => i.id)} id={c.countries.map((d) => d.id)} />
                    </div>

                )
            })
            }

        </div>








    )
}
