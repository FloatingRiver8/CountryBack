
const { Router } = require("express");
const { Country, Activity } = require("../db");

const { getAllInfo } = require("./controllers");
const { Op } = require("sequelize");
const router = Router();

//Get country all or name
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

    
      return res.status(200).send(response);
    }
  } catch (error) {
    res.status(404).send({ 'msg': 'Error trying to get countries' }) 
  } 
});




/*Get country by Id */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idResponse = await Country.findByPk(`${id}`,{ include: Activity });
    console.log(idResponse);

    if (!idResponse) {
      res.status(400).send({ 'msg': 'Id country not found' }) ;
    } else {
      res.status(200).send(idResponse);
    }
  } catch (err) {
    res.status(404).send({ 'msg': 'Error getting data' }) 
  }
});




module.exports = router;
