import React from 'react';
import Header from '../Join/Header/Header';
import Main from '../Join/Main/Main'
import Footer from '../Join/Footer/Footer';
import styles from './Join.module.css';
import Logo from '../Join/Logo/Logo';



export default function Join() {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
        <section className={styles.section}>
            <Header />
            <Main />
        </section>
        <Footer/>
        </div>
    );
}

