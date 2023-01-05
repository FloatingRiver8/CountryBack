
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllCountries, filterByContinent, orderByAlphabet, orderByPopulation, getActivity, getAllActivities } from '../actions'

import SearchBar from './SearchBar'
import Paginate from './Paginate'
import Card from './Card'


import Error from './Error'
import s from './styles/home.module.css'
import f from './styles/form.module.css'




function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.allCountries)
    const [alphOrder, setAlphOrder] = useState("")  // para provocar el renderizado
    const [popOrder, setPopOrder] = useState("")
    const [contFilter, setContFilter] = useState("")

    const error = useSelector(state => state.error)

    const activity = useSelector((state) => state.allActivities)

   

 



    //Paginate
    const [currentPage, setCurrentPage] = useState(1);
    const countryPerPage = 15;
    const indexOfLastCountry = currentPage * countryPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
    //me devuelve un array con 15 elementos del 0 al 14.
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)


    //seteo el nº de la página en la que estoy, me vuelve del evento que me tira la func. del componente paginador
    const paginator = (pageNumber) => {
        setCurrentPage(pageNumber);
    }



    //Filtro actividades repetidas para mostrar en mi select
    const actvtNames = []
    activity.map((e) => actvtNames.push(e.name))
    const uniqueActivities = actvtNames.filter((name, index) => actvtNames.indexOf(name) === index)


    //Para pasarle a mi componente Card por props
    const country = currentCountry.length && currentCountry.map((c) => {
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
       
  
    }, [dispatch, ])




    const handleOnContinents = (e) => {
        dispatch(filterByContinent(e.target.value))

        // para que siempre esté ordenado según el option del select sin importar si se cambia de continente ya q hace es dispatch cuando pido x continnte
        if (alphOrder === "Z-A") {
            dispatch(orderByAlphabet("Z-A"))
        } else {
            dispatch(orderByAlphabet("A-Z"))
        } 

        setContFilter(e.target.value)//actualiza el estado del filtro para renderizar
    }



    const handleOnAlphabet = (e) => {
        dispatch(orderByAlphabet(e.target.value))
        setAlphOrder(e.target.value)//actualiza el estado del filtro
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
                <SearchBar contFilter={contFilter} className={`${s.home_select}`} />



                <div>
                    <select onChange={handleOnContinents} className={`${s.home_select}`}>
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
                    <select defaultValue={'A-Z'} onChange={handleOnAlphabet} className={`${s.home_select}`}>
                        <option value="A-Z" key="ascendent">A-Z</option>
                        <option value="Z-A" key="descendent">Z-A</option>
                    </select>
                </div>

                <div>
                    <select onChange={handleOnPopulation} className={`${s.home_select}`}>
                        <option value="population" name="population">Population</option>
                        <option value="min" key="min">Min</option>
                        <option value="max" key="max">Max</option>
                    </select>
                </div>




                {/* //Filtro PAISES por ACTIVIDADES*/}
                <div>
                    <select onChange={handleOnActivity} className={`${s.home_select}`} >
                        <option value="1" name="default">Activity</option>
                        {
                            uniqueActivities.map((e) => {
                                return (
                                    <option value={e} name="activity" key={e}>{e} </option>
                                )

                            })}
                    </select>
                </div>


                <div>

                    {/* FORM ACTIVITY */}
                    <Link to='/form' >
                        <button className={`${f.home_btn_createActivity}`}>
                            <p> Create activity</p>
                        </button>
                    </Link>
                </div>



                <Paginate
                    countryPerPage={countryPerPage}
                    allCountries={allCountries.length}
                    paginator={paginator}
                />

            </div>

            {/* //SHOWING CARDS */}

            {error ? <Error /> : <Card country={country}/> }

        </div>


    )

}


export default Home