/*
      rutas de Eventos /Events
      host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validatorJWT } = require('../middlewares/validatorJWT');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');

const router = Router();

//*Validacion general del JWT
router.use( validatorJWT );

//Obtener Eventos
router.get('/', getEvents);

//Crear Eventos
router.post(
      '/',
      [
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start','La fecha de inicio es obligatoria').custom( isDate ),
            check('end','La fecha de finalizacion es obligatoria').custom( isDate ),
            fieldValidator
      ],
      createEvent
);

//Actualizar Eventos
router.put('/:id', updateEvent);

//Borrar Eventos
router.delete('/:id', deleteEvent);


module.exports = router;
