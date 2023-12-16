import React from 'react';
import welcome from '../images/welcome.jpg';
import styles from './Header.module.css';
import {FaSignInAlt} from 'react-icons/fa';

export default function Header() {
    return (
        <>
        <div className={styles.div}>
        <header className={styles.header}>
        <ul className='flex items-center'>
            <li><FaSignInAlt/></li>&nbsp;&nbsp;
            <li><h1 className={styles.h1} alt="welcome">회원가입</h1></li>
        </ul>
        </header>
        </div>
        </>
    );
}

