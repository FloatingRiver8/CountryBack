import React from "react";
import {
  GET_ALL_COUNTRIES,
  GET_ONE_COUNTRY,
  FILTER_BY_CONTINENT,
  ORDER_BY_ALPHABET,
  ORDER_BY_POPULATION,
 DETAIL_CARD_BY_ID,
  GET_ACTIVITY,
  POST_ACTIVITY,
  FAILURE
} from "../actions/index";

const initialState = {
  allCountries: [],
  oneCountry: [],
  copyAllCountries: [],
  oneById: [],
  activity: [],
  error: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        copyAllCountries: action.payload,
        error: "",
      };
    case FAILURE:
      return {
        ...state,
        error: action.payload,
        
      };

    case GET_ONE_COUNTRY:
      const countriesByCont = state.copyAllCountries
      const paySearchbar = action.payload
      const payCont = action.payloadCont//me llega el continente en que está el filtro
      const filteredByContinents = paySearchbar.filter((e) => e.continent === payCont)
      /* console.log(payCont,"!!") */
/*       console.log(filteredByContinents)
      console.log(action.payload) */
      return {
        ...state,
        allCountries: payCont !== "All" ? filteredByContinents : action.payload,
        error: "",
        
      };
    case FILTER_BY_CONTINENT:
      const countries = state.copyAllCountries //acá me quedé
      const filteredContinents = countries.filter((e) => e.continent === action.payload)
      /* console.log(filteredContinents) */
      return {
       
        ...state,
        allCountries :  action.payload === 'All'? countries : filteredContinents,
      };

      case ORDER_BY_ALPHABET:
       const alphCountries = state.allCountries
     const order = action.payload === 'A-Z'? alphCountries.sort(function(a, b){ // me quedé acá
          if(a.name > b.name)return 1
          if(b.name > a.name)return -1
          return 0
        }):
         alphCountries.sort(function(a,b){
          if(a.name > b.name)return -1
          if(b.name > a.name)return 1
          return 0
        });
        return {
          ...state,
          allCountries: order
        }
        case ORDER_BY_POPULATION:
          const populationCountry = state.allCountries
          const populationOrder = action.payload === 'min'? populationCountry.sort(function (a,b){
            if(a.population > b.population) return 1
            if(b.population > a.population) return -1
            return 0
          })
           :
            populationCountry.sort(function (a,b){
            if(a.population < b.population) return 1
            if(b.population < a.population) return -1
            return 0
          })
          return{
            ...state,
            allCountries: populationOrder

          }
     case DETAIL_CARD_BY_ID:
        return{
          ...state,
          oneById: action.payload
        } 
        case POST_ACTIVITY:
          return{
            ...state
          }
     case GET_ACTIVITY:
          return {
            ...state,
            activity: action.payload
          } 
    default:
      return state;
  }
}
