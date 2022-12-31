const axios = require("axios");

const { Router } = require("express");
const { Country, Activity } = require("../db");

const { getAllInfo } = require("./controllers");
const { Op } = require("sequelize");
const router = Router();
/* router.use(express.json()) */

router.get("/", async (req, res) => {
  const { name } = req.query;

  try { 
    const response = await getAllInfo();

    if (name) {
      const responseFromDb = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },

        include: Activity,
    
      });

      responseFromDb.length? res.status(200).send(responseFromDb) :
      res.status(404).send({ 'msg': 'Country not found' }) 
     
      
    } else {
      const response = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name"],
        },
      });

      console.log(response.name);
      return res.status(200).send(response);
    }
  } catch (error) {
    res.send(error );
  } 
});





router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idResponse = await Country.findByPk(`${id}`,{ include: Activity });
    console.log(idResponse);

    if (!idResponse) {
      console.log("id country not found");
    } else {
      /* console.log("está") */
      res.status(200).send(idResponse);
    }
  } catch (err) {
    res.send(err, 'este error de id en back');
  }
});




module.exports = router;
