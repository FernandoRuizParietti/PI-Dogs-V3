const { Router } = require('express');
const   express = require('express');
// de la base de datos me traigo el modelo Dogs
const {Dogs} = require('../db.js');
const api = require('../controller/api.js');
const dogsApi = require('../controller/dogsApi');
const {Temperaments} = require('../db');
const dogsBD = require('../controller/dogsDB');
const dbDogs = require('../controller/dbFunc');


const router = Router();

//cuando usamos next en las rutas, pasa al siguiente middleware, que
//en app, el siguiente middleware es el control centralizado de errores



//-------Busqueda de todos Dogs y Dogs por nombre(raza)-----

router.get('/', async (req,res, next) =>{ 

    const {name} = req.query;  
    let dogs = await dogsApi();  
    const dogsDB = await dogsBD();
    const allDogs = [...dogsDB,...dogs];

     try{
      if(name){
        const dogName = allDogs.filter(d => {
          return d.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
        });
        if(!dogName.length){
          res.status(404).send({ msg: "Dog not found" });
        };
        return res.send(dogName);      
      };
      //Si no hay name, retorno todos
      return res.send(allDogs);
    }catch(error) {
        next(error)
    }   
   });

    // -------- Busqueda de Dogs por su ID  --------------

 router.get('/:idDog', async (req,res) =>{

  const {idDog} = req.params;
  const dogs = await api.apiDogs();
  const dogsBD  = await dbDogs.dogsDB()
 try{ 

   if(!isNaN(idDog)){ 
     let oneDog = dogs.find(d => { 
       return d.id === parseInt(idDog);
     });
     
     if(oneDog){
      res.send(oneDog);
     }
     else {
      res.status(400).send('Dog not found')
     }
 
   };

   let oneDogDB = dogsBD.find(d =>{ 
     return d.id === idDog;
   })

     if(oneDogDB){
       try {
         res.send(oneDogDB) 
       }
       catch(e){
         console.log('no se creo correctamente')
       }
     }
}

catch(e){
 res.status(400).send({ msg: "Id incorrecto"});
}

})

// -------- post de un nuevo dog  --------------

router.post('/', async (req,res,next) =>{

  const {
        name, 
        minheight, 
        maxheight, 
        minweight, 
        maxweight, 
        minlife_span, 
        maxlife_span, 
        temperament} = req.body;

  let height = minheight + ' - ' + maxheight;
  let weight = minweight + ' - ' + maxweight;
  let life_span;

  if(minlife_span && maxlife_span && parseInt(minlife_span) <= parseInt(maxlife_span)){
  life_span = minlife_span + ' - ' + maxlife_span + ' years';
  }
  else{
    life_span = 'Life span is not declarated';
  }

  let image ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWuTdWGJpggl3arhhken5DrrU0u0Q7NByMKQ&usqp=CAU'


    if(name && minheight && maxheight && minweight && maxweight){
          try{
            
            let temps =  temperament.toString()
            
          const newDog = await Dogs.create({
              name: name,
              height: height,
              weight: weight,
              life_span: life_span,
              image: image,
              temperament: temps,
            }); 
             //console.log(newDog,'Antes')

            const newTemp = await Temperaments.create({
              name: temps,
            })           

            res.send(newDog);
            
                }catch(error){
                  next(error)
                }
      }else{
          res.status(404).send({msg: "Faltan los valores basicos"})
    }

});

// -------- delete de un dog by name  --------------

// router.delete('/delete', async (req,res, next) =>{ 
//   // res.send('soy un delete en /delete')
//   const {name} = req.query;
//   const dogsDB = await dogsBD();  
//   try{
//     if(name){
//       console.log(name , 'Holaaaa')
//       const dogName = dogsDB.splice(d => {
//         return d.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
//       });
//       if(!dogName.length){
//         res.status(404).send({ msg: "Dog not found" });
//       };
//       return res.send(dogName); 
//     };

//   }catch(error){
//     next(error)
//   }
// });














// router.get('/', (req, res, next) => {
//     //console.log(URL_BASE_API)
//     //console.log(API_KEY)
//     const ApiURL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
//     const DogsPromiseApi = axios.get(ApiURL) 
//     const DogsPromiseDb = Dogs.findAll({include: Temperaments})

//     Promise.all([DogsPromiseApi,DogsPromiseDb]) //ejecuto las dos promesas en paralelo

//     .then((respuesta) =>{
//         const [DogsApi, DogsDb] = respuesta
//         console.log(DogsApi)
//         console.log(DogsDb)
//         res.send('Hola')
//     })
//     .catch((error) =>{
//         next(error)
//     })
// });

// router.get('/', (req, res, next) => {
//     //res.send('soy get en /dogs')
    
//     return Dogs.findAll({include: Temperaments})
        
//     .then((dogs) => {
//         res.send(dogs)
//     })
//     .catch((error) =>{ //hago manejo de errores
//         next(error)
//     })
// });


// router.get('/dogs:name', (req, res, next) => {
//     try{
//     res.send('soy get en /dogs:name')
//     }catch(error){
//         next(error)
//     }
// });

// router.get('/dogs/{dogId}', async (req, res, next) => {
//     try{
//     res.send('soy get en /dogs/{idRaza}')   
//     }catch(error){
//         next(error)
//     }
// });

// router.post('/:dogId/temperaments/:temperamentid', async (req, res, next) => {
//     try{
//     //res.send('soy get en /dogs/{idRaza}')
//     const {dogId, temperamentId} = req.params
//     const dog = await Dogs.findByPk(dogId)
//     await dog.addTemperaments(temperamentId)
//     res.send(200)    
//     }catch(error){
//         next(error)
//     }
// });

// router.post('/dog', async (req, res, next) => {
//     // res.send('soy post en /dog')
//     try {
//         const {name, height, weight, yearsOfLife} = req.body;
//     const newDog = await Dogs.create({
//         name, 
//         height,
//         weight,
//         yearsOfLife
//     })
//     res.send(newDog)
        
//     } catch (error) {
//         next(error)
//     }
    
// });




module.exports = router;
