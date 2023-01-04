/* import e from "express"; */


import {
  GET_ALL_COUNTRIES,
  GET_ONE_COUNTRY,
  FILTER_BY_CONTINENT,
  ORDER_BY_ALPHABET,
  ORDER_BY_POPULATION,
  DETAIL_CARD_BY_ID,
  GET_ACTIVITY,
  POST_ACTIVITY,
  GET_ALL_ACTIVITIES,
  FAILURE,
} from "../actions/index";

const initialState = {
  allCountries: [],
  oneCountry: [],
  copyAllCountries: [],
  oneById: [],
  activity: [],
  allActivities: [],
  error: "",
  payloadCountries: [],
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
      const paySearchbar = action.payload;
      return {
        ...state,
        allCountries: paySearchbar,
        error: "",
      };


    case FILTER_BY_CONTINENT:
      const countries = state.copyAllCountries;
      const filteredContinents = countries.filter(
        (e) => e.continent === action.payload
      );   
      return {
        ...state,
        allCountries:
          action.payload === "All continents" ? countries : filteredContinents,
      };


    case ORDER_BY_ALPHABET:
      const alphCountries = state.allCountries;
      const order =
        action.payload === "A-Z"
          ? alphCountries.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : alphCountries.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        allCountries: order,
      };


    case ORDER_BY_POPULATION:
      const populationCountry = state.allCountries;
      const populationOrder =
        action.payload === "min"
          ? populationCountry.sort(function (a, b) {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;
              return 0;
            })
          : populationCountry.sort(function (a, b) {
              if (a.population < b.population) return 1;
              if (b.population < a.population) return -1;
              return 0;
            });
      return {
        ...state,
        allCountries: populationOrder,
      };


    case DETAIL_CARD_BY_ID:
      return {
        ...state,
        oneById: action.payload,
        error: ""
      };


    case POST_ACTIVITY:
      return {
        ...state,
      };


    //para paises por actividad
    case GET_ACTIVITY:
      const countriesCopy = state.copyAllCountries;    
      const countryByActv = countriesCopy.filter((c) =>
        c.activities.find((a) => a.name === action.payload)
      );
      return {
        ...state,
        allCountries: countryByActv,
      };


    //para obtener los nombres de las actividades
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };
    default:
      return state;
  }
}
