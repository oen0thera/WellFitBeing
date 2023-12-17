import React, { useState } from "react";
import styles from './Main.module.css';
import signUp from '../../../api/signUpClient';
import { BsFillPersonFill, BsEnvelopeAtFill,BsGenderAmbiguous,BsFillBalloonFill  } from 'react-icons/bs';
import { MdOutlineLockPerson } from 'react-icons/md';


export default function Main() {
  const [info, setInfo] = useState({id:'',passwd:'',age:'',gener:'',email:''});
  const [infos, setInfos] = useState([]);
  const handleChange = (e) => {
    const {value,name} = e.target;
    setInfo({...info,[name]:value});
  }
  const handleSubmit = async () => {
    try {
        console.log("Sign Up");
        const response = await signUp(info.id, info.passwd, info.age, info.gender, info.email);
        console.log(response);
        if (response) {
            setInfo({ id: '', passwd: '',age:'',gender:'', email: '' });
            window.alert(JSON.stringify(response));
        }
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className={styles.info}>
    <form className={styles.form}>
    <div className="flex h-1/5 w-full mb-0 rounded-t-md border-2 border-myGray border-solid justify-center items-center">
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
        <div className="flex h-1/5 w-full mb-0 border-t-0 border-2 border-myGray border-solid justify-center items-center ">
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
        <div className="flex h-1/5 w-full mb-0 rounded-b-md border-t-0 border-2 border-myGray border-solid justify-center items-center ">
          <div className="flex justify-center items-center mb-0">
            <span>
              <BsFillBalloonFill size="16" />
            </span>
          </div>
          <input
            type="number"
            placeholder="나이"
            value={info.age}
            name="age"
            min="1"
            max="100"
            onChange={handleChange}
            className="h-5/6 w-5/6 border-transparent"
          />
        </div>
        <div className="flex h-1/5 w-full mb-0 rounded-b-md border-t-0 border-2 border-myGray border-solid justify-center items-center ">
          <div className="flex justify-center items-center mb-0">
            <span>
              <BsGenderAmbiguous size="16" />
            </span>
          </div>
          <input className="w-[53px] pr-5" placeholder="성별" disabled>
          </input>
          <input
            type="radio"
            placeholder="성별"
            value={"0"}
            name="gender"
            onChange={handleChange}
            className="h-2/6 w-1/6 pr-1 border-transparent"
          />
          <label htmlFor="gender choice male">Male</label>
          <input
            type="radio"
            placeholder="성별"
            value={"1"}
            name="gender"
            onChange={handleChange}
            className="h-2/6 w-1/6 pr-1 border-transparent"
          />
          <label htmlFor="gender choice female">Female</label>
          
        </div>
        <div className="flex h-1/5 w-full mb-0 rounded-b-md border-t-0 border-2 border-myGray border-solid justify-center items-center ">
          <div className="flex justify-center items-center mb-0">
            <span>
              <BsEnvelopeAtFill  size="16" />
            </span>
          </div>
          <input
            type="email"
            placeholder="이메일"
            value={info.email}
            name="email"
            onChange={handleChange}
            className="h-5/6 w-5/6 border-transparent"
          />
        </div>
    </form>
    <button className='bg-titlegreen rounded-md font-bold text-lg text-myBlack
     h-1/4 w-full my-5 hover:brightness-125' onClick={()=>handleSubmit()}>가입하기</button>
    </div>
      
  );
}
