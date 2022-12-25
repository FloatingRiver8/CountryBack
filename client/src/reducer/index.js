import React from "react";
import {
  GET_ALL_COUNTRIES,
  ERROR,
  GET_ONE_COUNTRY,
  FILTER_BY_CONTINENT,
  ORDER_BY_ALPHABET,
  ORDER_BY_POPULATION,
 DETAIL_CARD_BY_ID 
} from "../actions/index";

const initialState = {
  allCountries: [],
  oneCountry: [],
  copyAllCountries: [],
  error: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        copyAllCountries: action.payload
      };
    case ERROR:
      return {
        error: action.payload,
      };

    case GET_ONE_COUNTRY:
      return {
        ...state,
        allCountries: action.payload,
        error: "",
      };
    case FILTER_BY_CONTINENT:
      const countries = state.copyAllCountries //acá me quedé
      const filteredContinents = countries.filter((e) => e.continent === action.payload)
      console.log(filteredContinents)
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
          oneCountry: action.payload
        } 
    default:
      return state;
  }
}
