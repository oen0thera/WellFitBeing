import React from "react";
import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <>
      <ul className="flex w-96 justify-center my-3">
        <li className="inline-block">
          <Link to="/Join" className="inline-block no-underline text-myGray_bold">
            회원가입
          </Link>
        </li>
        &nbsp;
        <li className="inline-block before:content-['|'] text-myGray_bold">
          &nbsp;
          <Link to="/" className="inline-block no-underline text-myGray_bold">
            아이디 찾기
          </Link>
        </li>
        &nbsp;
        <li className="inline-block before:content-['|'] text-myGray_bold">
          &nbsp;
          <Link to="/" className="inline-block no-underline text-myGray_bold">
            비밀번호 찾기
          </Link>
        </li>
      </ul>
    </>
  );
}
