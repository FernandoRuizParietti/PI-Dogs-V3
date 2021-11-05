import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Landing.module.css'

function Landing() {
    return (
        <div className={styles.bgImg}>
        <h1 className={styles.head}>Bienvenido a mi Primer Pagina WEB!!!!</h1>
        <br />
        <Link to ='/dogs'>
            <button className={styles.ini}>Comenzemos</button>
        </Link>
        </div>
    )
};

export default Landing;