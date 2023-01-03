

import { useDispatch, useSelector } from 'react-redux'
import { getOneCountry} from '../actions'
import style from './styles/searchBar.module.css'





export default function SearchBar({contFilter}) {

    const dispatch = useDispatch()
    
  

    
//para que me renderice cuando no hay onChanges en los select y tome "All" por default, de esta manera puedo hacer búsquedas en All y que las muestre
if(contFilter === ""){
    contFilter = "All continents"
}


    const handleChange = (e) => {
/* //MEJORA para buscar por país pero dentro del mismo continente
Envío el estado del select del continente como segundo payload  para luego usarlo haciéndo búsqueda específica del continente en el que estoy */

        dispatch(getOneCountry(e.target.value, contFilter))
       /*  setAcuseState(e.target.value) */
        /* console.log(e.target.value) */
    }




    return (
        <div>
           
            <div >
                <label>SearchBar  </label>
            <input type="text" onChange={handleChange} className={`${style.home_searchInput}`}></input>
            </div>


        </div>
    )
}
