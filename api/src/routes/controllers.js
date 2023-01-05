const axios = require("axios");
const { Country } = require("../db");

const getAllInfo = async () => {
  try {
    const dataInDB = await Country.count(); // para ver si está cargada la base de datos, si está vacía se consume la API y completa el modelo.

    if ( !dataInDB) {
      const apiResponse = await axios.get("https://restcountries.com/v3/all");

      const allApiCountries = apiResponse.data.map((e) => {
        return {
          id: e.cca3,
          name: e.name.common,
          urlFlag: e.flags[0],
          continent: e.continents[0],
          capital: e.capital ? e.capital[0] : "capital not found",
          subregion: !e.subregion ? "Antarctic" : e.subregion,
          area: e.area,
          population: e.population,
        };
      });

      await Country.bulkCreate(allApiCountries);
      console.log("creado");
    }
  } catch (err) {
    return err;
  }
};


module.exports = {
  getAllInfo,
};
