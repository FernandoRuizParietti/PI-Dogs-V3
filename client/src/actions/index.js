import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var dogs = await axios.get("/api/dogs/",{});
        return dispatch ({
            type: 'GET_DOGS',
            payload: dogs.data
        });
    };
};

export function getTemperaments(){
    return async function(dispatch){
        var temperaments = await axios.get("/api/temperaments/",{});
        return dispatch ({
            type: 'GET_TEMPERAMENTS',
            payload: temperaments.data
        });
    };
};

//-------------------------Prueba hecha con Promesas-----------------
// export function getTemperaments(){
//     return function(dispatch){
//          axios.get("http://localhost:3001/api/temperaments/",{})
//         .then((temperaments)=>{ 
//             return dispatch ({
//                 type: 'GET_TEMPERAMENTS',
//                 payload: temperaments.data
//             });
            
//         })
//         .catch((error)=>{
//             error
//         })    
//     };
// };

export function getDogDetails(id){
    //console.log(id, 'HOALAAAAAA')
    return async function(dispatch){
        var dogDetails = await axios.get(`/api/dogs/${id}`,{});
        return dispatch ({
            type: 'GET_DOGS_DETAIL',
            payload: dogDetails.data
        });
     };
 
};

export function getDogsName(name){
    return async function(dispatch){
        try{
        var dogsName = await axios.get(`/api/dogs?name=${name}`,{});
        return dispatch ({
            type: 'GET_DOGS_NAME',
            payload: dogsName.data
        });
    
    }
    catch(e){
        alert('Dogs not found')
    }
    };
 
};


export function postDog(payload){
    return async function(){
        var newDog = await axios.post('/api/dogs',payload);
        return newDog
    };
 
};

export function filterDog(payload){
    return {
        type: 'FILTER_DOG',
        payload
    };
};

export function filterTemperament(payload){
    return {
        type: 'FILTER_TEMPERAMENT',
        payload
    };
};
export function sortByWeight(payload){
    return {
        type: 'SORT_BY_WEIGHT',
        payload
    };
};

export function sortByName(payload){
    return {
        type: 'SORT_BY_NAME',
        payload
    };
};