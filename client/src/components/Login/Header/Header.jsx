import React from 'react';
import {BiLogIn} from 'react-icons/bi';

export default function Header() {
    return (
    <>
        <div className='w-full h-1/4 flex border-b-2 border-myGray border-solid items-center justify-center bg-myWhite'> 
        <header className='h-full'>
        <ul className='h-full flex items-center'>
            <li>
            <BiLogIn size="20"/>
            </li>&nbsp;
            <li>
            <h1 className='font-bold text-2xl'>로그인</h1>
            </li>
        </ul>
        </header>
        </div>
    </>
    );
}

