import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <>
        <footer className='my-3'>
        <ul className="flex w-96 justify-center">
        <li className="inline-block">
          <Link to="/Login" className="inline-block no-underline text-myGray_bold">
            로그인
          </Link>
        </li>
        &nbsp;
        <li className="inline-block before:content-['|'] text-myGray_bold">
          &nbsp;
          <Link to="#" className="inline-block no-underline text-myGray_bold">
            아이디 찾기
          </Link>
        </li>
        &nbsp;
        <li className="inline-block before:content-['|'] text-myGray_bold">
          &nbsp;
          <Link href="/" className="inline-block no-underline text-myGray_bold">
            비밀번호 찾기
          </Link>
        </li>
      </ul>
        </footer>
        </>

    )
}

