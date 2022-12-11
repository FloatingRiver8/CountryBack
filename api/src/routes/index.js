const { Router } = require('express');
const express = require('express')
const countryRoute = require('./countryRoute.js')
const activityRoute = require('./activityRoute.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/country', countryRoute)
router.use('/activity', activityRoute)



 module.exports = router; 
