 import React from 'react'
import { GET_ALL_COUNTRIES, ERROR, GET_ONE_COUNTRY } from '../actions/index'


const initialState = {
 allCountries: [],
 oneCountry: [],
 error: ''
}


export default function rootReducer( state = initialState, action) {

  switch(action.type){
    case GET_ALL_COUNTRIES:

  return {
    ...state,
allCountries: action.payload

  };
case ERROR: 
return{
    error: action.payload,
};

case GET_ONE_COUNTRY:
    return {
        ...state,
        allCountries: action.payload,
        error:""
    }

default:
return state
}

}
 
