import axios from "axios";



export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ONE_COUNTRY = "GET_ONE_COUNTRY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const DETAIL_CARD_BY_ID = "DETAIL_CARD_BY_ID" ;
export const GET_ACTIVITY = "GET_ACTIVITY";
export const ERROR = "ERROR";

const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/country");

      dispatch({
        type: GET_ALL_COUNTRIES,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};

const getOneCountry = (payload, payloadCont) => {
  return async (dispatch) => {
    try {
      const responseOne = await axios.get(
        `http://localhost:3001/country?name=${payload}`
      );

      dispatch({
        type: GET_ONE_COUNTRY,
        payload: responseOne.data,
        payloadCont:payloadCont
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

const filterByContinent = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_CONTINENT,
      payload: payload
    });
  };
};


const orderByAlphabet = (payload) =>{
  return(dispatch) => {
    dispatch({
      type: ORDER_BY_ALPHABET,
      payload: payload
    })
  }
}

const orderByPopulation = (payload) =>{
  return(dispatch) => {
    dispatch({
      type: ORDER_BY_POPULATION,
      payload: payload
    })
  }
}

 const detailCardById = (payload) =>{
  return async (dispatch)=> {
   const responseId =  await axios.get(`http://localhost:3001/country/${payload}`)
   console.log(responseId)

  dispatch({
    type: DETAIL_CARD_BY_ID,
    payload:responseId.data
  })
 }} 

/* 
 const getActivity = (payload) =>{

return async (dispatch) => {
const responseActivity = axios.get(`http://localhost:3001/activity/${payload}`)

dispatch({
  type: GET_ACTIVITY,
  payload: responseActivity.data
})

}

 } */

export { getAllCountries, getOneCountry, filterByContinent, orderByAlphabet, orderByPopulation, detailCardById };
