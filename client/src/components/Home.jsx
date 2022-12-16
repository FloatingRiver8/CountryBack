import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCountries } from '../actions'
import Card from './Card'
import SearchBar from './SearchBar'
import s from './card.module.css'



function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.allCountries)

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])







    return (
<div>

<SearchBar/>







        {/* //SHOWING CARDS */}
        
            <h3>Home</h3>
            <div className = {`${s.home_cardDiv}`}>
            {allCountries.length && allCountries.map((c) => {
               return (
                   <div className = {`${s.home_cardEach}`} key={c.id} >
                   <Card  name ={c.name } capital={c.capital} flag={c.urlFlag} continent={c.continent} subregion={c.subregion} area={c.area} population={c.population} /> 
                   </div> 
                )
            })} 
            </div>
        </div>
    )
}


export default Home