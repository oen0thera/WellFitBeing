import React, { useState, useEffect } from "react";
import styles from "./Login-bttn.module.css";
import Profile from '../../../User/Profile';
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout, googleUserChange } from '../../../../api/firebase';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = { ...location.state };

  const [isLogin, isLoginValid] = useState(false);
  const [isLoginPopup, isLoginPopupValid] = useState(false);
  const [isModify, isModifyValid] = useState(false);
  const [id,setId] = useState(userInfo.id);
  var photo = "";
  var name = "";
  var isGoogleLogin = false;
  if(userInfo.id){
    photo = userInfo.photo;
    name = userInfo.name;
    isGoogleLogin = userInfo.isGoogleLogin;
  }

  const ToggleLogindiv = () => {
    const Login = document.getElementById("Login-bttn");
    setId(Login.value);
    if (Login.value) {
      //window.alert("Logged-in");
      isLoginValid(true);
    } else {
      //window.alert("Logged-out");
      isLoginValid(false);
      isModifyValid(false);
    }
  };

  const ToggleModifyPopup = () =>{
    console.log("ToggleModify",isModify);
    if (isModify){
        isModifyValid(false);
    }
    else{
        isModifyValid(true);
    }
  }
  const NavLogbttn = () => {
    if (isLogin) {
      Login.value = "";
      isLoginValid(false);
      navigate("/");
      
      if (id.includes("@")) {
        //구글간편로그인을 한 경우
        googleLogout().then(setId);;
      }
      else{
        ToggleLoginPopup();
      }
    } else {
      navigate("/Login");
      
    }
    
  };
const ToggleLoginPopup = () =>{
        if(isLoginPopup){
            isLoginPopupValid(false);
            console.log("pop");
        }
        else{
            isLoginPopupValid(true);
            console.log("up");
        }
    }
  useEffect(() => {
    ToggleLogindiv();
    googleUserChange(setId);
  });
  const TEST_TEXT =  
    `Logged Out`
  return (
    <div className={`${styles["Login-div"]}`}>
      <div className='items-center justify-items-end'>
      {isGoogleLogin&&<Profile photoURL={photo} displayName={name}/>}
      <button className={`${styles['ModifyInfo-bttn']} + ${isLogin === true ? styles[''] : styles['close']}`} id="ModifyInfo-bttn" value={userInfo} onClick={ToggleModifyPopup}>{isLogin?'Modify': 'Closed'}</button>
      <button className={`${styles['Login-bttn']} + ${isLogin === true ? styles['active'] : styles['']}`} id="Login-bttn" value={userInfo.id} onClick={()=>{ToggleLogindiv(); NavLogbttn();}}>{isLogin?'Log-out':'Log-in'}</button>
      <div className={`${styles['ModifyInfo-div']} + ${isModify === true ? styles['active'] : styles['close']}`}>
        <div className={`${styles['ModifyInfo-content']}`}>
          <div className={`${styles['ModifyInfo-Inputspace']}`}>
            <div>
              <h className="text-2xl">사용자 정보 변경</h>
            </div>
            <div>
              <h>이름</h> 
              <input className={`${styles['ModifyInfo-Input']}`} type="text"/>
            </div>
            <div className={`${styles['Modifygender-div']}`}>
              <h className={`${styles['gender-label']}`}>성별</h>
              남성<input type="radio" className={`${styles['Modifygender-input']}`} name='gender'/>
              여성<input type="radio" className={`${styles['Modifygender-input']}`} name='gender'/>
            </div>
            <div>
              <h>나이</h>
              <input className={`${styles['ModifyInfo-Input']} + ${styles['age']}`} type="number" min="1"/>
            </div>
            <div>
            <div>
              <h>E-mail</h>
              <input className={`${styles['ModifyInfo-Input']} + ${styles['email']} + ${styles['id']}`} type="text"/>
              @<select className={`${styles['ModifyInfo-Input']} + ${styles['email']} + ${styles['loc']}`}>
                <option value="Naver">naver.com</option>
                <option value="Gmail">gmail.com</option>
                <option value="Hanmail">hanmail.com</option>
                <option value="Custom">직접 입력</option>
              </select>
            </div>

            <button className={`${styles['Login-bttn']} + ${styles['mod-confirm']}`}> 확인</button>
            </div>
            
          </div>  
        </div>
      </div>
      </div>
            <div className={`${styles['Login-popup']} + ${isLoginPopup === true ? styles['active'] : styles['close']}`}>
                Login popup
                <div className={`${styles['Popuptext-div']}`}>
                    {TEST_TEXT}
                </div>
                <div className={`${styles['Popupbttn-div']}`}>
                    <button className={`${styles['Login-bttn']} + ${isLoginPopup === true? styles[''] : styles['close']}`} onClick={()=>{ToggleLoginPopup()}}>Got it!</button>
                </div>
            </div>
       </div>
    );
};

export default Login;
