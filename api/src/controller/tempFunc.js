const { Temperaments } = require('../models/Temperaments')
const api  = require('./api');


async function tempFunc (){
    try{
    let dogsTemp = await api.apiDogs();
    

    dogsTemp = dogsTemp.map(d => {
      if(d.temperament){
      return d.temperament;
    };
    }).join().split(',');

    let temps = []; //Aca voy a guardar todos los Temperamentos de la Api en mi DB

    dogsTemp.map(d => {
      if(!temps.includes(d.trim()) && d){
         temps.push(d.trim());
      };
    });

    console.log(temps)

    //Aca se me rompe todo no se meter los temp a la Tabla de la DB

    // temps.map((t) =>{
    //   Temperaments.findOrCreate({
    //   where: {name: t}
    // })
    //   });

    //   const allTemperaments = await Temperaments.findAll();

    // return (allTemperaments);
    return(temps)
    
 
  }catch(e){
    console.log('error de carga de temperaments');
  }
};
module.exports = tempFunc;