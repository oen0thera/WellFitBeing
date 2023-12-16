import React from 'react';
import styles from './Title.module.css';

export default function Title(){
    return (
        <div className={`${styles['title-div']}`}>
         <h1>Well Fit Being</h1>
       </div>
    );
}