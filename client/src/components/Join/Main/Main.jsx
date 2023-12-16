import React, { useState } from "react";
import styles from './Main.module.css';
import signUp from '../../../api/signUpClient';
import { BsFillPersonFill, BsPhoneFill } from 'react-icons/bs';
import { MdOutlineLockPerson } from 'react-icons/md';


export default function Main() {
  const [info, setInfo] = useState({id:'',passwd:'',email:''});
  const [infos, setInfos] = useState([]);
  const handleChange = (e) => {
    const {value,name} = e.target;
    setInfo({...info,[name]:value});
  }
  const handleSubmit = async () => {
    try {
        console.log("Sign Up");
        const response = await signUp(info.id, info.passwd, info.email);
        console.log(response);
        if (response) {
            setInfo({ id: '', passwd: '', email: '' });
            window.alert(JSON.stringify(response));
        }
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className={styles.info}>
    <form className={styles.form}>
    <div className="flex h-1/3 w-full mb-0 rounded-t-md border-2 border-myGray border-solid justify-center items-center">
          <div className="flex justify-center items-center mb-0">
            <span>
              <BsFillPersonFill size="16" />
            </span>
          </div>
          <input
            type="text"
            placeholder="아이디"
            value={info.id}
            name="id"
            onChange={handleChange}
            data-name="id"
            className="h-5/6 w-5/6 border-transparent mt-0"
          />
        </div>
        <div className="flex h-1/3 w-full mb-0 border-t-0 border-2 border-myGray border-solid justify-center items-center ">
          <div className="flex justify-center items-center mb-0">
            <span>
              <MdOutlineLockPerson size="16" />
            </span>
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={info.passwd}
            name="passwd"
            onChange={handleChange}
            className="h-5/6 w-5/6 border-transparent"
          />
        </div>
        <div className="flex h-1/3 w-full mb-0 rounded-b-md border-t-0 border-2 border-myGray border-solid justify-center items-center ">
          <div className="flex justify-center items-center mb-0">
            <span>
              <BsPhoneFill size="16" />
            </span>
          </div>
          <input
            type="email"
            placeholder="전화번호"
            value={info.email}
            name="email"
            onChange={handleChange}
            className="h-5/6 w-5/6 border-transparent"
          />
        </div>
    </form>
    <button className='bg-blackBttn rounded-md font-bold text-lg text-myWhite
     h-1/4 w-full my-5 hover:brightness-125' onClick={()=>handleSubmit()}>가입하기</button>
    </div>
      
  );
}
