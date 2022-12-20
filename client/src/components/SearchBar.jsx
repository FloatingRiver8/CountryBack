
import { useDispatch } from 'react-redux'
import { getOneCountry } from '../actions'
import s from './searchBar.module.css'

export default function SearchBar() {

    const dispatch = useDispatch()





    const handleChange = (e) => {

        dispatch(getOneCountry(e.target.value))

        /* console.log(e.target.value) */
    }




    return (
        <div className={`${ s.home_searchBar}`}>SearchBar

            <input type="text" onChange={handleChange}></input>


        </div>
    )
}
