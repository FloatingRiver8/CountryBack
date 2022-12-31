const { Router } = require("express");
const { Country, Activity } = require("../db");
const { getAllInfo } = require("./controllers");
const { Op } = require("sequelize");
const axios = require("axios");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  const response = await getAllInfo();
  if (name) {
    const oneActivity = await Activity.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: Country,
    });

    console.log(oneActivity);
    res.status(200).send(oneActivity);
  } else {
    const allActivities = await Activity.findAll({ include: Country });

    res.status(200).send(allActivities);
  }
});





router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    if (name && difficulty && duration && season && countries) {
      /*     if(name){ 
      const repeatedNameActivity = await Activity.findAll({
        where: {name : {[Op.iLike]: `%${name}%` }},
        include: Country,
        
      }) */

      let activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });

      await activity.setCountries(countries); // para relacionar la actividad con el country en la tabla intermedia
     /*  res.status(404).send({ 'msg': "Name repeated, try a new one" }); */


    

      let completeActivity = await Activity.findOne({
        where: {
          name: name,
        },
        include: {
          model: Country,

          /* 
        attributes: {
          include: ["name"],
          exclude: [
            "area",
            "population",
            "subregion",
            "South America",
            "createdAt",
            "updatedAt",
          ],
        }, */
          through: {
            attributes: [],
          },
        },
      });

      res.status(200).send(completeActivity);
    } else {
      res.status(402).send("Some information is missing, can't add activity");
    }
  } catch (error) {
    return error;
  }
});

module.exports = router;
