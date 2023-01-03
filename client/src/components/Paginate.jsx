import React from 'react';
import s from './paginate.module.css'



function Paginate({ countryPerPage, allCountries, paginator }) {

    //para sacar la cantidad de páginas que necesito para mostrar todos mis vg
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allCountries / countryPerPage); i++) {
        pageNumbers.push(i)
    }

    //una navbar con el número de pág que viene del array pageNumbers, por cada uno de los números se crea un botoncito que contendrá ese/cada valor, a la vez se le pasa a la función paginator para establecer el estado de la currentPage que está en el home
    return (
        <div>

            <nav className={`${s.paginator_nav}`} >
                <ul className={`${s.paginator_ul}`}>
                    {pageNumbers && pageNumbers.map(number => {
                        return (
                            <li key={number}>
                                <button type="button" className={`${s.paginatorNumbers_li}`} onClick={() => paginator(number)}> {number}</button> {/* le pasa el numero a paginator en el home para setear el currentPage*/}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Paginate