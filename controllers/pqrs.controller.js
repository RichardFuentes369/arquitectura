const pqrsGlobales = require('../globales/pqrs.globales');

const dataPeticion = []

const pqrsController = {

  getPeticiones: () => {
    if(dataPeticion.length > 0){
      response = {
        "Mensaje": `Actualmente hay (#${dataPeticion.length}) pqrs registradas en el sistema`,
        "Lista": dataPeticion
      }
    }else{
      response = {
        "Mensaje": "El sistema no encontro pqrs registradas.",
        "Lista": null
      }
    }

    return response
  },

  getDetailPeticion: (_nroRadicado) => {
    busqueda = dataPeticion.find((obj) => obj._nroRadicado == _nroRadicado)

    if(busqueda){
      response = {
        "Mensaje": `El sistema encontro la pqrs con radicado #(${_nroRadicado}).`,
        "Detalle": busqueda
      }
    }else{
      response = {
        "Mensaje": `El sistema no encontro la pqrs asociadas con radicado #(${_nroRadicado}).`,
      }
    }
    
    return response
  },

  misPqrs: (_dni)=>{
    let character = ''
    busqueda = dataPeticion.filter((obj) => obj._propietario.dni === _dni)

    if(busqueda){

      character += (busqueda.length == 1) ? '' : 's'

      response = {
        "Mensaje": `El sistema encontro (${busqueda.length}) pqrs asociada${character} al dni #(${_dni}).`,
        "Detalle": busqueda
      }
    }else{
      response = {
        "Mensaje": `El sistema no encontro pqrs asociadas al dni ${_dni}.`,
      }
    }
    
    return response
  },

  addPqrs: (data) => {

    // almaceno en una variable el tamaño de las peticiones en ese momento
    tamanoAnterior = dataPeticion.length
    
    // almaceno en el objeto el numero de radicado "fecha del sistema en timestapp"
    data._nroRadicado = pqrsGlobales.getFecha(1)
    data.estado = 3

    // pucheo al arreglo general las peticiones
    dataPeticion.push(data)

    // si el tamaño aumento, indica que se creo exitosamente
    if (dataPeticion.length > tamanoAnterior){
      response = {
        "Mensaje": "El sistema informa que la pqrs fue creada exitosamente.",
        "Radicado": {
          "_nroRadicado": data._nroRadicado,
          "_nombreCliente": `${data._propietario.nombres} ${data._propietario.apellidos}`,
          "_createdAt": pqrsGlobales.getFecha(2)
        }
      }
    } else{
      response = {
        "Mensaje": "Error, El sistema no puedo crear la pqrs.",
        "Radicado": null
      }
    }

    return response
  
  },
  
  updateEstado: (data) => {
    busqueda = dataPeticion.find((obj) => obj._nroRadicado == data._nroRadicado)
    if(busqueda){
      busqueda.estado = parseInt(data._estado)
      response = {
        "Mensaje": `El estado de la pqrs ${data._nroRadicado} fue actualizado exitosamente.`,
      }
    }else{
      response = {
        "Mensaje": `El sistema no encontro la pqrs asociadas con al radicado ${data._nroRadicado}.`,
      }
    }
    
    return response
  }
}

module.exports = pqrsController;