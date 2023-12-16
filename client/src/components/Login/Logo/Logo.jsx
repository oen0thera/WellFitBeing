import React from 'react';
import {Link} from "react-router-dom";

export default function Logo() {
    return (
        <div className='flex justify-center mb-3'>
            <Link to='/' className="no-underline drop-shadow-md text-black">
            <h1 className='font-bold text-5xl text-titlegreen'>
                Well Fit Being
            </h1>
            </Link>
        </div>
    );
}

