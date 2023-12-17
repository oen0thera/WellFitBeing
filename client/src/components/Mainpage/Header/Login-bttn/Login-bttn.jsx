import React, { useState, useEffect } from "react";
import styles from "./Login-bttn.module.css";
import Profile from '../../../User/Profile';
import ModifyUserInfoClient from '../../../../api/modifyUserInfoClient';
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout, googleUserChange } from '../../../../api/firebase';

const Login = ({getUserId}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = { ...location.state };

  const [isLogin, isLoginValid] = useState(false);
  const [isLoginPopup, isLoginPopupValid] = useState(false);
  const [isModify, isModifyValid] = useState(false);
  const [id,setId] = useState(userInfo.id);
  const [selectedEmail, setSelectedEmail] = useState('naver.com');
  
  useEffect(() =>{
    console.log(selectedEmail);
  },[selectedEmail])
  useEffect(() =>{
    console.log(id);
    getUserId(id);
  },[id]);
  var photo = "";
  var name = "";
  var isGoogleLogin = false;
  if(userInfo.id){
    photo = userInfo.photo;
    name = userInfo.name;
    isGoogleLogin = userInfo.isGoogleLogin;
  }
  const [info, setInfo] = useState({id:'',passwd:'',age:'',gender:'',email:''});
  const [infos, setInfos] = useState([]);
  const fullEmail = info.email + '@' + selectedEmail;
  const handleChange = (e) => {
    const {value,name} = e.target;
    setInfo({...info,[name]:value});
  }
  const modifyInfoClient = new ModifyUserInfoClient();
  const handleSubmit = async () => {
    try {
        console.log("ModifyInfo");

        const response = await modifyInfoClient.modifyUserInfo(id, info.passwd, info.age, info.gender, fullEmail);
        console.log(response);
        if (response) {
            setInfo({ id: '', passwd: '',age:'',gender:'', email: '' });
            window.alert(JSON.stringify(response));
        }
    } catch (error) {
        console.log(error);
    }
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
  
var selectEmailChange = (e) => {
  setSelectedEmail(e.target.value);
}
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
      <div className='h-10 items-center justify-items-end z-5'>
      {isGoogleLogin&&<Profile photoURL={photo} displayName={name}/>}
      <button className={`${styles['ModifyInfo-bttn']} + ${isLogin === true ? styles[''] : styles['close']}`} id="ModifyInfo-bttn" value={userInfo} onClick={ToggleModifyPopup}>{isLogin?'Modify': 'Closed'}</button>
      <button className={`${styles['Login-bttn']} + ${isLogin === true ? styles['active'] : styles['']}`} id="Login-bttn" value={userInfo.id} onClick={()=>{ToggleLogindiv(); NavLogbttn();}}>{isLogin?'Log-out':'Log-in'}</button>
      <div className={`${styles['ModifyInfo-div']} + ${isModify === true ? styles['active'] : styles['close']}`}>
        <div className={`${styles['ModifyInfo-content']}`}>
          <div className={`${styles['ModifyInfo-Inputspace']}`}>
            <div>
              <h1 className="text-2xl">사용자 정보 변경</h1>
            </div>
            <div className="flex items-center">
              <h1>ID</h1>
              <input className={`${styles['ModifyInfo-Input']}`} type="text" name="id" value={id} onChange={handleChange} disabled/> 
            </div>
            <div className={`${styles['Modifygender-div']}`}>
              <h1 className={`${styles['gender-label']}`}>성별 </h1>
              남성<input type="radio" className={`${styles['Modifygender-input']}`} name='gender' value={"0"} onChange={handleChange}/>
              여성<input type="radio" className={`${styles['Modifygender-input']}`} name='gender' value={"1"} onChange={handleChange}/>
            </div>
            <div className="flex items-center">
              <h1>나이</h1>
              <input className={`${styles['ModifyInfo-Input']} + ${styles['age']}`} type="number" min="1" name="age" value={info.age} onChange={handleChange}/>
            </div>
            <div>
            <div className="flex items-center">
              <h1>E-mail</h1>
              <input className={`${styles['ModifyInfo-Input']} + ${styles['email']} + ${styles['id']}`} type="text" name="email" value={info.email} onChange={handleChange}/>
              @<select className={`${styles['ModifyInfo-Input']} + ${styles['email']} + ${styles['loc']}`} name="emailSelect" onChange={selectEmailChange} value={selectedEmail}>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="hanmail.com">hanmail.com</option>
                <option value="Custom">직접 입력</option>
              </select>
            </div>

            <button className={`${styles['Login-bttn']} + ${styles['mod-confirm']}`} onClick={()=>{handleSubmit(); ToggleModifyPopup()}}> 확인</button>
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
