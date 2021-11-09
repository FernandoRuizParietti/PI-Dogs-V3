const {Dogs, Temperaments} = require('../db.js');

// TRAIGO TODA LA INFO QUE NECESITO DE LA BASE DE DATOS PARA TODAS MIS RUTAS
module.exports = {
 dogsDB:async function (){
    let dogsDB = await Dogs.findAll({include: Temperaments}); //este include me trae temperament:[] array vacio

    let result = dogsDB.map(d => {
        return {
            id: d.id,
            image: d.image,
            name: d.name,
            height: d.height,
            weight: d.weight,
            life_span: d.life_span,
            temperament: d.temperament,
        }
    })
    return result;

},

};