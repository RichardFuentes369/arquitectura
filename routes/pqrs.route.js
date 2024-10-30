const express = require('express');
const router = express.Router();

const pqrsController = require('../controllers/pqrs.controller');

router.get('/', (req, res) => {
  res.send('Página de inicio');
});

router.get('/pqrs-activas', (req, res) => {
  const listaPeticiones = pqrsController.getPeticiones()

  res.send(`
    ${
      JSON.stringify(listaPeticiones)
    }
  `)
});

router.post('/pqrs-crear', (req, res) => {

  const peticion = pqrsController.addPqrs(req.body)

  res.send(`
    ${
      JSON.stringify(peticion)
    }
  `)

});

router.get('/pqrs-detalle', (req, res) => {

  let _nroRadicado = req.query._nroRadicado
  const peticion = pqrsController.getDetailPeticion(_nroRadicado)
  
  res.send(`
  ${
    JSON.stringify(peticion)
  }
`)

});

router.get('/pqrs-mis-pqrs', (req, res) => {
  let _dni = req.query._dni 
  const listaPeticiones = pqrsController.misPqrs(_dni)

  res.send(`
    ${
      JSON.stringify(listaPeticiones)
    }
  `)
});


router.put('/pqrs-estado', (req, res) => {
  let _nroRadicado = req.query._nroRadicado 
  let _estado = req.query._estado 

  data = {
    "_nroRadicado": _nroRadicado,
    "_estado": _estado
  }

  const listaPeticiones = pqrsController.updateEstado(data)

  res.send(`
    ${
      JSON.stringify(listaPeticiones)
    }
  `)
});


module.exports = router;
