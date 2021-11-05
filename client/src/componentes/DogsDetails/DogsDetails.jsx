import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDogDetails } from "../../actions";
import {Link} from 'react-router-dom';
import styles from  './DogsDetails.module.css';
import {IoHome} from 'react-icons/io5';
//import { rootReducer } from "../../reducer/index";


export default function DogsDetails({id}){
    const dispatch = useDispatch();  

    useEffect(() => {
     dispatch(getDogDetails(id));
    },[dispatch]); 

    const dogDetail = useSelector(state => state.dogDetails); 

    if(!dogDetail.temperament){
        dogDetail.temperament = "None"
    }
    return(
        // <div style = {{backgroundImage : `url(${dogDetail.image})`,width: '100%',height: '100%',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',paddingTop:'20px'}}>
        <div className={styles.bkg}>
        <div className={styles.container}>
            <br/>
        <Link to ='/dogs'>
        <button className={styles.backHome}><IoHome/>HOME</button> 
        </Link>
        <div>
        <h3 className={styles.name}>{dogDetail.name}</h3>
        <img className={styles.image} src={dogDetail.image} alt="not found"/>
        <div className={styles.allD}>
        <h5>Temperaments:</h5>
        <ul>{dogDetail.temperament}</ul>
        <div className={styles.detail}>
        <h5>Weight: </h5>
        <h5>Height: </h5>
        <h5>Life Span: </h5>
        <p>{dogDetail.weight} kg</p>
        <p>{dogDetail.height} cm</p>
        <p>{dogDetail.life_span} </p>
        </div>
        </div>
        <br />
        </div>
        </div> 
        </div>
        // </div>
    )

};