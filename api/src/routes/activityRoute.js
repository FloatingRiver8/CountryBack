const { Router } = require("express");
const express = require("express");
const { Country, Activity } = require("../db");
const axios = require("axios");

const router = Router();

router.use("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  if (name && difficulty && duration && season && countries) {
    const activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    await activity.setCountries(countries); // para relacionar la actividad con el country en la tabla intermedia

    let completeActivity = await Activity.findOne({
      where: {
        name: name,
      },
      include: {
        model: Country,



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
        },
        through:{
            attributes: []
        } , 

      },
    });

    res.status(200).send(completeActivity);
  } else {
    res.status(400).send("Some information is missing, can't add activity");
  }
});

module.exports = router;
