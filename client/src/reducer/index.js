// creo mi initial state

const initialState = {
    dogs:[],
    allDogs: [],
    temperaments:[],
    dogDetails: [],
};

var flag = false;

function weightA(a){
let arrayA = a.weight.split('-');
if(parseInt(arrayA[0]) && parseInt(arrayA[1])) return (parseInt(arrayA[0]) + parseInt(arrayA[1]))/2;
if(arrayA[0].trim() === 'NaN' && !arrayA[1]) return 1000;
if(!parseInt(arrayA[0]) || arrayA[0].trim() === 'NaN') return parseInt(arrayA[1]);
if(!parseInt(arrayA[1]) || arrayA[1].trim() === 'NaN' ) return parseInt(arrayA[0]);
}

function weightB(b){
let arrayB = b.weight.split('-');    
if(parseInt(arrayB[0]) && parseInt(arrayB[1])) return (parseInt(arrayB[0]) + parseInt(arrayB[1]))/2;
if(arrayB[0].trim() === 'NaN' && !arrayB[1]) return 1000;
if(!parseInt(arrayB[0]) || arrayB[0].trim() === 'NaN') return parseInt(arrayB[1]);
if(!parseInt(arrayB[1]) || arrayB[1].trim() === 'NaN' ) return parseInt(arrayB[0]);
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return {    
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };
            case 'GET_DOGS_DETAIL':
                return {
                    ...state,
                    dogDetails: action.payload
                };
        case 'GET_DOGS_NAME':
            return {
                ...state,
                dogs: action.payload
            };
        case 'POST_DOG':
            return {
                ...state,
                };           

        case 'FILTER_DOG':
            let dogs = state.allDogs;
            let filterDog;
            if(flag){
                dogs = state.dogs;
            }
            if(action.payload === 'all'){
                filterDog = state.allDogs;
            }
            else{
            if(action.payload === 'number'){
                filterDog = dogs.filter(d => !isNaN(d.id));
            
            }
            else{
                filterDog = dogs.filter(d => isNaN(d.id));
            
            }
            }
            if(!filterDog.length){
                alert('No dogs found. Click reload dogs to re-start')
            }
            flag = true
            
            return {
                ...state,
                dogs: filterDog,
            }; 
        
        case 'FILTER_TEMPERAMENT':
            let dogs3 = state.allDogs;
            let dogsTemp;
            if(flag){
                dogs3 = state.dogs
            }
            if(action.payload === 'allT'){
                dogsTemp = state.allDogs
            }
            else{
            dogsTemp = dogs3.filter(d => 
                    d.temperament && d.temperament.length && d.temperament.includes(action.payload)
                )
            }

            if(!dogsTemp.length){
                alert('No dogs found.Click reload dogs to re-start ')
            }
            flag = true

            return{
                ...state,
                dogs: dogsTemp
            };

        case 'SORT_BY_WEIGHT':
            let dogsWeight;
            if(action.payload === 'allW'){
                dogsWeight = state.dogs;
            }
            if(action.payload === 'desW'){
                dogsWeight = state.dogs.sort(function(a, b){
                    return weightA(b) - weightB(a)
                })
            };
            if(action.payload === 'ascW'){
                dogsWeight = state.dogs.sort(function(a,b){
                    return weightB(a) - weightA(b) 
                })
                };    
            return {
                ...state,
                dogs: dogsWeight,
            };       
            
        case 'SORT_BY_NAME':
            let sortDog;
            if(action.payload === 'allN'){
                sortDog = state.dogs;
            };
            if(action.payload === 'ascN'){
                sortDog = state.dogs.sort(function(a,b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(a.name < b.name){
                        return -1
                    }
                        return 0
                });
            };
            if(action.payload === 'desN'){
                sortDog = state.dogs.sort(function(a,b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(a.name < b.name){
                        return 1
                    }
                        return 0
                });
                                      
            };
            return {
                ...state,
                dogs: sortDog,
            };

        default :
            return state;    
    };
    
};

export default rootReducer;