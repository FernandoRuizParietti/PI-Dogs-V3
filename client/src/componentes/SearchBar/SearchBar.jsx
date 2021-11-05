import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsName } from '../../actions';
import styles from './SearchBar.module.css';
import {IoSearch} from 'react-icons/io5';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    
    function handleChange(e){
        e.preventDefault();
        setSearch(e.target.value);
      }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogsName(search));
        setSearch("");
    }
    
    return(
        <div>
            <input className={styles.input} value ={search} type="text" placeholder='Search dog by name...' onChange={(e) => handleChange(e)}/>
            <button className={styles.button} type='submit' onClick={e => handleSubmit(e)}><IoSearch/></button>
        </div>

    );    
};