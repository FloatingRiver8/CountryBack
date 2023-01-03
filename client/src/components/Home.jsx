import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCountries, filterByContinent, orderByAlphabet, orderByPopulation, getActivity, getAllActivities, getOneCountry } from '../actions'
import { Link } from 'react-router-dom'
import s from './card.module.css'
import f from './form.module.css'

import Card from './Card'
import ActivityCard from './AcivityCard'
import ActCardRender from './ActCardRender'
import SearchBar from './SearchBar'
import Error from './Error'





function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.allCountries)
    const [alphOrder, setAlphOrder] = useState("")  // para provocar el renderizado
    const [popOrder, setPopOrder] = useState("")
    const [contFilter, setContFilter] = useState("")

    const error = useSelector(state => state.error)

    const activity = useSelector((state) => state.allActivities)

    const countryWithActivity = useSelector((state) => state.activity)


    /* 
        console.log(countryWithActivity) */

    //Filtro actividades repetidas para mostrar en mi select

    const actvtNames = []
    activity.map((e) => actvtNames.push(e.name))
    const uniqueActivities = actvtNames.filter((name, index) => actvtNames.indexOf(name) === index)

    const country = allCountries.length && allCountries.map((c) => {
        return {
            name: c.name,
            flag: c.urlFlag,
            continent: c.continent,
            id: c.id,

        }
    })


    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getAllActivities())
    }, [dispatch,])




    const handleOnContinents = (e) => {
        dispatch(filterByContinent(e.target.value))
        // para que siempre esté ordenado según el option del select sin importar si se cambia de continente
        if (alphOrder === "Z-A") {
            dispatch(orderByAlphabet("Z-A"))
        } else {
            dispatch(orderByAlphabet("A-Z"))
        }

        setContFilter(e.target.value)//actualiza el estado del filtro
    }



    const handleOnAlphabet = (e) => {
        dispatch(orderByAlphabet(e.target.value))
        setAlphOrder(e.target.value)
    }



    const handleOnPopulation = (e) => {
        dispatch(orderByPopulation(e.target.value))
        setPopOrder(e.target.value)
    }



    const handleOnActivity = (e) => {
        console.log(e.target.value)
        dispatch(getActivity(e.target.value))

    }


    return (
        <div >
            <div className={`${s.home_cardDiv}`}>
                <SearchBar contFilter={contFilter} />


                <div>
                    <select onChange={handleOnContinents}>
                        <option value='All continents' key='All continents'>All continents</option>
                        <option value='Africa' key='Africa'>Africa</option>
                        <option value='Antarctica' key='Antarctica'>Antarctica</option>
                        <option value='Europe' key='Europe'>Europe</option>
                        <option value='North America' key='North America'>North America</option>
                        <option value='Oceania' key='Oceania'>Oceania</option>
                        <option value='South America' key='South America'>South America</option>
                        <option value='Asia' key='Asia'>Asia</option>
                    </select>
                </div>

                <div>
                    <select defaultValue={'A-Z'} onChange={handleOnAlphabet}>
                        <option value="A-Z" key="ascendent">A-Z</option>
                        <option value="Z-A" key="descendent">Z-A</option>
                    </select>
                </div>

                <div>
                    <select onChange={handleOnPopulation}>
                        <option value="population" name="population">Population</option>
                        <option value="min" key="min">Min</option>
                        <option value="max" key="max">Max</option>
                    </select>
                </div>




                {/* //Filtro PAISES por ACTIVIDADES*/}
                <div>
                    <select onChange={handleOnActivity} >
                        <option value="1" name="default">Activity</option>


                        {
                            uniqueActivities.map((e) => {
                                return (
                                    <option value={e} name="activity" key={e}>{e} </option>
                                )

                            })}
                    </select>
                </div>


                {/* FORM ACTIVITY */}
                <Link to='/form' >
                    <button className={`${f.home_btn_createActivity}`}>
                        <p> Create activity</p>
                    </button>
                </Link>

            </div>




            {/* //SHOWING CARDS */}

            {error ? <Error /> : <Card country={country} />}

            {!country.length || !error ? <div className={`${s.home_allCards}`}  ><ActivityCard countryWithActivity={countryWithActivity} /> </div> : null}


            {/*  <ActCardRender/> */}


            {/*  <ActivityCard countryWithActivity={countryWithActivity} /> */}

            {/*                 {countryWithActivity && (countryWithActivity.map((c) => {
                    console.log(c)
                     return ( 


                        <div key={c.id} >
                            <ActivityCard name={c.countries.map((n) => n.name)} flag={c.countries.map((f) => f.urlFlag)} continent={c.countries.map((a) => a.continent)} key={c.countries.map((i) => i.id)} id={c.countries.map((d) => d.id)} error={error} />
                        </div>

                     ) 

                })

                )} */}
        </div>
        /*   </div> */

    )
}


export default Home