const { Router } = require("express");
const { Country, Activity } = require("../db");
const { getAllInfo } = require("./controllers");
const { Op } = require("sequelize");

const router = Router();

//Get activities

router.get("/", async (req, res) => {
  const { name } = req.query;

  const response = await getAllInfo();//para que se llene la bd en caso de estar vacía

  if (name) {
    const oneActivity = await Activity.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: Country,
    });

    res.status(200).send(oneActivity);
  } else {
    const allActivities = await Activity.findAll({ include: Country });

    res.status(200).send(allActivities);
  }
});




//Post activity
router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    if (name && difficulty && duration && season && countries) {
      let activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });

      await activity.setCountries(countries); // para relacionar la actividad con el country en la tabla intermedia

      res.status(200).send(completeActivity);
    } else {
      res.status(402).send("Some information is missing, can't add activity");
    }
  } catch (error) {
    return error;
  }
});

module.exports = router;
