
import { useDispatch } from 'react-redux'
import { getOneCountry } from '../actions'

export default function SearchBar() {

    const dispatch = useDispatch()


    const handleChange = (e) => {

        dispatch(getOneCountry(e.target.value))

        /* console.log(e.target.value) */
    }




    return (
        <div>SearchBar

            <input type="text" onChange={handleChange}></input>


        </div>
    )
}
