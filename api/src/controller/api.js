const { default: axios } = require("axios");
const {URL_BASE_API, API_KEY} = process.env;


const API = (`${URL_BASE_API}?api_key${API_KEY}`)

// TRAIGO TODA LA INFO QUE NECESITO DE LA API PARA TODAS MIS RUTAS
module.exports = {
    apiDogs: async function (){
        try{ 
        const dataApi = await axios.get(API) //uso axios en lugar de fetch, para no tener que acomodar la respuesta con un .json
           
        
         const dogs =  await dataApi.data.map((d) => {
             if(d.temperament){
                 try{
                 let arrayTemp = d.temperament.split(',').map(t => {
                    return t.trim()
                     }).join(', ')
                     d.temperament = arrayTemp
                }catch(e){
                console.log('error en el if de temperament')
                }
            }return {
                 id: d.id,
                 image: d.image.url,
                 name: d.name,
                 weight: d.weight.metric,
                 height: d.height.metric,
                 life_span: d.life_span,
                 temperament: d.temperament,
                }
            });
        
         return dogs
        }
        catch(e){
         console.log('error')

        }
     },

};