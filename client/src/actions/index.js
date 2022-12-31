import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ONE_COUNTRY = "GET_ONE_COUNTRY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const DETAIL_CARD_BY_ID = "DETAIL_CARD_BY_ID";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES"

export const FAILURE = "FAILURE";

const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/country");

      dispatch({
        type: GET_ALL_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload: error.response.data.msg
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
        payloadCont: payloadCont,
      });
    } catch (err) {
      dispatch({
        type: FAILURE,
        payload: err.response.data.msg,
      });
    }
  };
};

const filterByContinent = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_CONTINENT,
      payload: payload,
    });
  };
};

const orderByAlphabet = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ORDER_BY_ALPHABET,
      payload: payload,
    });
  };
};

const orderByPopulation = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ORDER_BY_POPULATION,
      payload: payload,
    });
  };
};

const detailCardById = (payload) => {
  return async (dispatch) => {
    const responseId = await axios.get(
      `http://localhost:3001/country/${payload}`
    );
    console.log(responseId);

    dispatch({
      type: DETAIL_CARD_BY_ID,
      payload: responseId.data,
    });
  };
};

const postActivity = (payload) => {
  return async function () {
    try {
      const response = await axios.post("http://localhost:3001/activity", payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};



const getAllActivities = () =>{
  return async (dispatch) => {
    const responseActivity = await axios.get(
      `http://localhost:3001/activity`
    );

    dispatch({
      type: GET_ALL_ACTIVITIES,
      payload: responseActivity.data,
    });
  console.log(responseActivity)
  };
};


const getActivity = (payload) => {
  return async (dispatch) => {
    const responseActivity = await axios.get(
      `http://localhost:3001/activity?name=${payload}`
    );

    dispatch({
      type: GET_ACTIVITY,
      payload: responseActivity.data,
      
    });
  };
};

export {
  getAllCountries,
  getOneCountry,
  filterByContinent,
  orderByAlphabet,
  orderByPopulation,
  detailCardById,
  getActivity,
  getAllActivities,
  postActivity,
};
