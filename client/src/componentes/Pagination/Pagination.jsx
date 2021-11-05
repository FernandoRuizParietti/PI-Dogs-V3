import React from 'react';
import styles from './Pagination.module.css'


export default function Pagination({dogs,dogsPage,pagination}){
    const pageNumber = [];

    for(let i=1; i<= Math.ceil(dogs/dogsPage);i++){
        pageNumber.push(i);
    };

    return(
        <nav>
            {
            pageNumber && pageNumber.map(p => (
                <li key={p} className={styles.list}>
                    <a key={p} onClick={()=> pagination(p)}>{p}</a>
                </li>
        ))}
        </nav>
    )

};