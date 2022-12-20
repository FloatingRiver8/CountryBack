import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCountries, filterByContinent } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import SearchBar from './SearchBar'

import s from './card.module.css'
import f from './form.module.css'



function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.allCountries)

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

const handleOnContinents = (e) => {
   
dispatch(filterByContinent(e.target.value))
}



    return (
        <div>

            <SearchBar />


            <div>
                <select onChange={handleOnContinents}>
                    <option value='All'>All</option>
                    <option value='Africa'>Africa</option>
                    <option value='America'>America</option>
                    <option value='Antarctica'>Antarctica</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                </select>
            </div>
 





            {/* FORM ACTIVITY */}
            <Link to='/form'>
                <button className={`${f.home_btn_createActivity}`}>
                    <p> Create activity</p>
                </button>
            </Link>


            {/* //SHOWING CARDS */}

            <h3>Home</h3>
            <div className={`${s.home_cardDiv}`}>
                {allCountries.length && allCountries.map((c) => {
                    return (
                        <div className={`${s.home_cardEach}`} key={c.id} >
                            <Card name={c.name} capital={c.capital} flag={c.urlFlag} continent={c.continent} subregion={c.subregion} area={c.area} population={c.population} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Home