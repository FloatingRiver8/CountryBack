
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneCountry, filterByContinent, getAllCountries } from '../actions'
import s from './searchBar.module.css'




export default function SearchBar({contFilter}) {

    const dispatch = useDispatch()
    const isContinentFull = useSelector((state) => state.allCountries)


    console.log(contFilter)

/* useEffect(()=>{
    if (contFilter === 'Africa'){
        dispatch(filterByContinent(contFilter))
    }else{
    dispatch(getAllCountries())
    } 
},[dispatch]) */

    const handleChange = (e) => {
/* //MEJORA 
envío el estado del select del continente como segundo payload  para luego usarlo haciéndo búsqueda específica del continente en el que estoy */
        dispatch(getOneCountry(e.target.value, contFilter))

        /* console.log(e.target.value) */
    }




    return (
        <div>
            SearchBar

            <input type="text" onChange={handleChange}></input>


        </div>
    )
}
