const { Router } = require('express');
const api = require('../controller/api.js');
const tempFunc = require('../controller/tempFunc.js');
const {Temperaments} = require('../db');
const { sequelize } = require('sequelize'); 
const { apiDogs } = require('../controller/api.js');
//const router = express.Router();



const router = Router();


// router.get('/', async (req, res, next) =>{
//     try{
//     const tempApi = await tempFunc();    
//     const temp = await Temperaments.findAll();
//     const listTemp = await temp.map(t =>{
//       return t.name
//     });
//     let temps = [...listTemp, ...tempApi]
//     temps = temps.sort()
//      //res.send(listTemp.sort());
//      res.send(temps)
//   }
//   catch(error){
//       next(error)
//   }
//  });

 router.get('/', async(req,res,next)=>{
     try {
         let tempApi = await apiDogs();
         let temp = tempApi.map((el)=>el.temperament)
        

         tempApi = tempApi.map(d => {
            if(d.temperament){
            return d.temperament;
          };
          }).join().split(',');

          let temps = []; //Aca voy a guardar todos los Temperamentos de la Api en mi DB
          tempApi.map(d => {
            if(!temps.includes(d.trim()) && d){
               temps.push(d.trim());
            };
          });
          temps = temps.sort() //oredeno alfabeticamente los temperamentos

        //Aca meto todos los temperamentos a la tabla de mi DB

         temps.forEach((el)=>{
             Temperaments.findOrCreate({
                 where: {name: el}
             })
         })
        let allTemps = await Temperaments.findAll()
        console.log(allTemps)
        
        res.send(temps)

     } catch (error) {
         next(error)
     }
 });

router.post('/temperament', async (req, res, next) => {
    //res.send('soy post en /temperament')
    try{
    const {name} = req.body;
    const newTemperament = await Temperaments.create({
        name
    })
    res.send(newTemperament)
    }catch(error){
        next(error)
    }
});

// router.get('/lala', async (req, res, next) => {
//     //res.send('soy get en /temperaments/lala')
//     try{
//     const temperamentsApi = await tempFunc();
//     res.send(temperamentsApi)
//     }catch(error){
//         next(error)
//     }
// });

module.exports = router;
