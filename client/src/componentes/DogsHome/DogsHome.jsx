import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterTemperament, filterDog, sortByWeight, sortByName} from '../../actions';
import { Link } from 'react-router-dom';
import DogCard from '../DogCard/DogCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import styles from './DogsHome.module.css';
//import { state } from '../../reducer/index'


export default function DogsHome(){

const dispatch = useDispatch();
const dogs = useSelector(state => state.dogs);
const temperaments = useSelector(state => state.temperaments);

const [order, setOrder] = useState('');
const [orderW, setOrderW] = useState('');

useEffect(() => {
    dispatch(getDogs());
},[dispatch]); 

useEffect(() => {
    dispatch(getTemperaments());
},[dispatch]); 


// ---------- PAGINATION ------------------
const [currentPage, setCurrentPage] = useState(1); 
const [dogsPage,setDogsPage] = useState(8); 
const lastDogPos =(currentPage * dogsPage);  
const firsDogPos =(lastDogPos - dogsPage);
const currentDogs = dogs.slice(firsDogPos,lastDogPos);

const pagination = (page) =>{
    setCurrentPage(page);
};

// --------- HANDLER FILTERS BY DOGS AND TEMPERAMENTS-----------
function handleFilterByDogs(e){
    e.preventDefault();
    dispatch(filterDog(e.target.value));

};

function handleTemperaments(e){
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));

};

 // --------- HANDLER SORTS BY WEIGHT AND NAME ----------- 
function handleSortByWeight(e){
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrderW(`${e.target.value}`);
    e.target.value ='default';
    setOrder(`${e.target.value}`);

}

function handleSortByName(e){
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
    e.target.value = 'default'
    setOrderW(`${e.target.value}`)
}

// --------- RELOAD DOGS ----------- 

function handleDogs(e){
    e.preventDefault()
    dispatch(getDogs())

}


return (
    <div className={styles.bkg}>
        
        <h1 className={styles.head}>La DOGipedia</h1>
        <br/>
        <div>   
        <nav className={styles.navBar}>
        <div className={styles.searchBar}>
            <SearchBar/>
        </div>
        </nav>
        <bd/>
        <div className={styles.createButton}>
        <Link to= '/newDog'>
            <button className={styles.button}>Crea un nuevo DOG</button>
        </Link>
        </div>
        <br/>
        <div>
            <button onClick={e => {handleDogs(e)}} className={styles.button}>
                Reload Dogs 
            </button>
        </div>
        <div className={styles.filters}>   
            <select onChange={(e)=> handleSortByName(e)} defaultValue="default"> 
                <option value="default" disabled="disabled">Sort by Name</option>          
                <option value="ascN" key="asc">Ascendent</option>
                <option value="desN" key="des">Descendent</option>
            </select>
            <select onChange={(e)=> handleSortByWeight(e)} defaultValue="default">
                <option value="default" disabled="disabled">Sort by Weight</option>
                <option value="ascW" key="ascW">Ascendent Weight</option>
                <option value="desW" key="desW">Descendent Weight</option>
            </select>
            <select onChange={(e)=> handleFilterByDogs(e)} defaultValue="default">
                <option value='default' disabled='disabled'>Filter by breeds</option> 
                <option value='all' key="all">All breeds</option>    
                <option value='number' key="number">Api</option>
                <option value ='notnumber' key="notnumber">Created</option>
            </select>
            <select onChange ={e => handleTemperaments(e)} defaultValue="default">
            <option value='default' disabled='disabled' >Filter by temperaments</option>
                <option value='allT' key="allT">All temperaments</option>
                { temperaments && temperaments.map(d =>   
                    <option key={d} value={d}>{d}</option>
                )}
            </select>
        </div>  

        <div>
            <Pagination
            dogsPage= {dogsPage}
            dogs = {dogs.length}
            pagination={pagination}
            />  
            <ul className={styles.cards}>
            {
             currentDogs && currentDogs.map(d => { return (
                <div key={d.id} className={styles.dogCard}>
                <Link to= {'/dogs/'+d.id} className={styles.linkCard}>
                <DogCard 
                name={d.name} 
                image={d.image} 
                weight={d.weight} 
                temperament ={d.temperament} />
                </Link>
                </div>
                )})   
            }
            </ul>
        </div>
        </div>
        <div className={styles.landingButton}>
        <Link to= '/'>
            <button className={styles.button}>Landing Page</button>
        </Link>
        </div>
        <div className={styles.footer}>
            <footer>APP by Fer Ruiz</footer>
        </div>
    </div>


);
};