import React from 'react'
import ActCardRender from './ActCardRender'
import s from './card.module.css'


export default function ActivityCard({ countryWithActivity }) {


    return (

        <div  className={`${s.home_allCards}`}  > 

            {countryWithActivity && countryWithActivity.map((c) => {

                return (

                    <> {/* key={c.id} > */}
                        <ActCardRender name={c.countries.map((n) => n.name)} flag={c.countries.map((f) => f.urlFlag)} continent={c.countries.map((a) => a.continent)} key={c.countries.map((i) => i.id)} id={c.countries.map((d) => d.id)} />
                    </>

                )
            })
            }

        </div>








    )
}
