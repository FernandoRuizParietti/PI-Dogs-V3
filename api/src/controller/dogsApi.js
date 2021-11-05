const api = require('./api');


// ME TRAE LA INFO QUE NECESITO PARA LA RUTA DE DOGS/ID DE MI API
async function dogsApi(){

let dogs = await api.apiDogs();

dogs = dogs && dogs.map((d) =>{
  return {
  id: d.id,
  image: d.image,
  name: d.name,
  height: d.height,
  weight: d.weight,
  life_span: d.life_span,
  temperament: d.temperament,
};
});

return dogs;
};

module.exports = dogsApi;




//Para Borrar todo


// const getDogs = (req, res, next) =>{
//     const {name} = req.query;
    
//     let ApiURL = `${URL_BASE_API}breeds?api_key=${API_KEY}`
//     let findAllParams = {include: Temperaments}

//     if(name){
//         ApiURL = `${URL_BASE_API}breeds/search?q=${name}&api_key=${API_KEY}`;
//         findAllParams.where = {name: {[Op.iLike]: `%${name}%`}} //aplico la busqueda insensitive por query
//     }

//     apiReq = axios.get(ApiURL);
//     dbReq = Dogs.findAll(findAllParams);

//     Promise.all([apiReq, dbReq])
//     .then(data => {
//       let [apiRes, dbRes] = data;

//       dbRes = dbDataHandler(dbRes);
//       apiRes = apiDataHandler(apiRes);
//       return res.status(200).send([...apiRes,...dbRes]);
//     })
//     .catch(error => next(error));
// };

// const getDogById = (req, res, next) => {
//     const id = req.params.id

//     //consulto si el id no es un  numero, entonces lo busco en mi base de datos
//     if(isNaN(id)){ 
//         return Dogs.findOne({
//             where:{
//                 id: id
//             },
//             include: Temperaments
//         })
//         .then(dbRes =>{
//             const searchResult = dbDataHandler(dbRes);
//             return res.status(200).send(searchResult);
//         })
//         .catch(error => next(error))
//     }else{ // si no lo busco en la API
//         axios.get(`${URL_BASE_API}breeds?api_key=${API_KEY}`)
//     .then(apiRes => {
//       const searchResult = apiRes.data.find(dog => dog.id === parseInt(id));
//       return res.status(200).send(searchResult);
//     })
//     .catch(error => next(error));
//   }
// };

// const apiDataHandler = apiResponse => {
//     apiResponse = apiResponse.data;
//     return apiResponse.reduce((acc, breed) => {
//       if(breed.image || breed.reference_image_id) {
//         acc.push({
//           id: breed.id,
//           name: breed.name,
//           temperament: breed.temperament,
//           weight: breed.weight.imperial.split(" - ")[0],
//           image_url: breed.hasOwnProperty("image")? breed.image.url: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
//           life_span: breed.life_span.split(" ")[0]
//         })
//       }
//       return acc; 
//     }, []);
//   };