import React from 'react';

export default function Profile({photoURL, displayName}) {
    return (
        <div className='inline-flex items-center'>
            <img className="rounded-full w-11 h-11 m-0" 
            src={photoURL} 
            alt={displayName} />
            <span className='font-bold decoration-blackBttn'>{displayName}</span>
        </div>
    );
}