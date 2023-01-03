
import { useSelector } from 'react-redux'
import s from './styles/searchBar.module.css'




export default function Error() {


    const error = useSelector(state => state.error)



    return (
        
            <div className={`${s.searchBar_errorDiv}`}>
            {error !== "" && <p>{error}</p>}
            {console.log(error)}
            </div>

        
    )
}