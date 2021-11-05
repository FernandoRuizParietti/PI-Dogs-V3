const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//Ahora requiero mis rutas, para hacer e enrutado
const dogsRoute = require('./dogs')
const temperamentsRoute = require('./temperaments')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Aca genero mis midlleware para las rutas

router.use('/dogs', dogsRoute)
router.use('/temperaments', temperamentsRoute)


module.exports = router;
