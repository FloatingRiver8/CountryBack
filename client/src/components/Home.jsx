import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCountries, filterByContinent, orderByAlphabet, orderByPopulation, detailCardById } from '../actions'
import { Link } from 'react-router-dom'
import s from './card.module.css'
import f from './form.module.css'

import Card from './Card'

import DetailCard from './DetailCard' 
import SearchBar from './SearchBar'





function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.allCountries)
    const [alphOrder, setAlphOrder] = useState("")  // para provocar el renderizado
const [popOrder, setPopOrder] = useState("") 


    useEffect(() => {
        dispatch(getAllCountries())
      
    }, [dispatch ])



    const handleOnContinents = (e) => {
        dispatch(filterByContinent(e.target.value))
        // para que siempre esté ordenado según el option del select
        if(alphOrder === "Z-A" ){
            dispatch(orderByAlphabet(  "Z-A" ))
        }else{
        dispatch(orderByAlphabet(  "A-Z" ))
        }
    }

    const handleOnAlphabet = (e) => {

        dispatch(orderByAlphabet(  e.target.value ))
        setAlphOrder(e.target.value)
    }

    const handleOnPopulation = (e) => {
        dispatch( orderByPopulation(e.target.value))
        setPopOrder(e.target.value)
    }



    return (
        <div>

            <SearchBar />


            <div>
                <select  onChange = { handleOnContinents}>
                    <option value='All'>All</option>
                    <option value='Africa' key='Africa'>Africa</option>
                    <option value='Antarctica' key='Antarctica'>Antarctica</option>
                    <option value='Europe' key='Europe'>Europe</option>
                    <option value='North America' key='North America'>North America</option>
                    <option value='Oceania' key='Oceania'>Oceania</option>
                    <option value='South America' key='South America'>South America</option>
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
                    <option value = "min" key="min">Min</option>
                    <option value = "max" key= "max">Max</option>             
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

                        <div className={`${s.home_cardEach}`} >
                            <Card name={c.name} flag={c.urlFlag} continent={c.continent} key= {c.id} id={c.id} />
                        </div>
                        
                       
                    )
                }) 
                }
            
                
            </div>
        </div>
    )
}


export default Home