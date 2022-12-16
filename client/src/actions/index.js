import axios from "axios";


export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ONE_COUNTRY = "GET_ONE_COUNTRY";
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

const getOneCountry = (payload) => {

  return async (dispatch) => {
    try {
      const responseOne = await axios.get(
        `http://localhost:3001/country?name=${payload}`
      );

      dispatch({
        type: GET_ONE_COUNTRY,
        payload: responseOne.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

export { getAllCountries, getOneCountry };
