import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTemperaments, postDog } from '../../actions';
import { useState } from 'react';
import styles from './NewDog.module.css'
import {IoHome} from 'react-icons/io5'

function validation(newDog){
    let errors = {}
    if(newDog.name === ' '){
        errors.name = 'Debe colocar un nombre'
    }
    if(newDog.minheight && newDog.minheight <= 0 ){
        errors.numberMinheight = 'Min height debe ser mayor a 0!'
    }
    if(newDog.maxheight && (newDog.maxheight > 500 || parseInt(newDog.minheight) > parseInt(newDog.maxheight))){
        errors.numberMaxheight = `${newDog.maxheight} cm es demasiada altura para un Dog!`
    }
    if(newDog.minweight && newDog.minweight <= 0) {
        errors.numberMinweight = 'Min weight debe ser mayor a 0!'
    }
    if(newDog.maxweight && (newDog.maxweight > 500 || parseInt(newDog.minweight) > parseInt(newDog.maxweight))){
        errors.numberMaxweight = `${newDog.maxweight} kg demasiado peso para un Dog!`
    }
    return errors
}

export default function NewDog(){
    const [newDog, setNewDog] = useState({name:'',  minheight:'', maxheight:'', minweight:'', maxweight:'', minlife_span:'', maxlife_span:'', temperament:[]});
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const [errors, setErrors] = useState({})


    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);


    function handleChange(e){
        setNewDog({
          ...newDog,
          [e.target.name]: e.target.value
          
        });
        setErrors(validation({
            ...newDog,
            [e.target.name]: e.target.value
        }))
      };
     
      function handleSelect(e){ 
          setNewDog({
              ...newDog,
              temperament: [...newDog.temperament,e.target.value]
          });
          e.target.value = 'default'
      };

      function handleDelete(t){
          setNewDog({
              ...newDog,
              temperament: newDog.temperament.filter(temp => temp !== t )
          });
      };

      function handleSubmit(e){
          e.preventDefault();
          if(newDog.minheight >= 0 && newDog.minweight >= 0 && parseInt(newDog.maxheight) >= parseInt(newDog.minheight) && parseInt(newDog.maxweight) >= parseInt(newDog.minweight) && newDog.name){
          dispatch(postDog(newDog));
          alert('Dog creado Correctamente');
          setNewDog({name:'',  minheight:'', maxheight:'', minweight:'', maxweight:'', minlife_span:'', maxlife_span:'', temperament:[]});
        }
        else{
            alert('Oops! Algo salio mal, asegurese de haber completado los datos correctamente')
        }
        };

      
    return (
        <div className={styles.bkg}>
        <div className={styles.container}>
        <br />
        <Link to ='/dogs'>
        <button className={styles.home}><IoHome/>HOME</button> 
        </Link>
        <h3 className={styles.head}>Crea un nuevo DOG</h3>
        <form onSubmit={handleSubmit} >
            <div className={styles.formName}>
            <label>Name/Breed </label>
            <input type="text" name ="name" value ={newDog.name} onChange={handleChange} required/><br />
            { errors.name && 
            <span className={styles.errors}>{errors.name}</span>
            }
            </div>
            <div className={styles.formHeight}>
            <label>Height min (cm) </label>
            <input type="number" name ="minheight" value ={newDog.minheight} onChange={handleChange} required style={{marginRight:'1rem'}}/>
            <label>Height max (cm) </label>
            <input type="number" name ="maxheight" value ={newDog.maxheight} onChange={handleChange} required style={{marginRight:'1rem'}}/>
            <br />
            { (errors.numberMinheight ||errors.numberMaxheight) && 
            <span className={styles.errors}>{(errors.numberMinheight)|| (errors.numberMaxheight)}</span>
            }            
            </div>
            <div className={styles.formWeight}>
            <label>Weight min (kg) </label>
            <input type="number" name ="minweight" value ={newDog.minweight} onChange={handleChange} required style={{marginRight:'1rem'}}/>
            <label>Weight max (kg) </label>
            <input type="number" name ="maxweight" value ={newDog.maxweight} onChange={handleChange} required style={{marginRight:'1rem'}}/>
            <br />
            { (errors.numberMaxweight || errors.numberMinweight) && 
            <span className={styles.errors}>{(errors.numberMaxweight)||(errors.numberMinweight)}</span>
            }
            </div>
            <div className={styles.formLifeSpan}>
            <label>Life span min (years)</label>
            <input type="number" name ="minlife_span" value ={newDog.minlife_span} onChange={handleChange} style={{marginRight:'1rem'}}/>
            <label>Life span max (years)</label>
            <input type="number" name ="maxlife_span" value ={newDog.maxlife_span} onChange={handleChange} style={{marginRight:'1rem'}}/>
            </div>
            <div className={styles.formTemperaments}>
            <label>Temperaments options: </label>
            <select onChange ={e => handleSelect(e)} defaultValue='default'>
            <option value='default' disabled='default'></option>
            { temperaments && temperaments.map(d =>    
            <option key={d} value={d}>{d}</option>
            )}
            </select>
            </div>
            <br /><br />
            <button type='submit' className={styles.submit}>Submit</button>
            <br /><br />
        </form>
        <div>
            { newDog.temperament.map(t =>
                <div key={t}>
                <ul>{t}</ul>
                <button onClick={()=>handleDelete(t)}>Borrar</button>
                </div>
                )
            }
        </div>
        </div>
        </div>
    );   
    
}