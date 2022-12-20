import React from "react";
import {
  GET_ALL_COUNTRIES,
  ERROR,
  GET_ONE_COUNTRY,
  FILTER_BY_CONTINENT,
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
      const allCountries = state.copyAllCountries //acá me quedé
      const filteredContinents = allCountries.filter((e) => e.continent == action.payload)
      return {
       
        ...state,
        allCountries : filteredContinents,
      };

    default:
      return state;
  }
}
