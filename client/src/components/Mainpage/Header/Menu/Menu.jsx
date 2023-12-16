import React from 'react';
import { FaReact, FaUserCircle, FaHistory, FaRegStar, FaCog, FaQuestionCircle } from "https://cdn.skypack.dev/react-icons@4.1.0/fa";
import styles from './Menu.module.css'

export default function Menu(){
    return (
        <div className={`${styles['Menu-sidebar']} ${"mt-20 w-42 border-r-2 border-r-titlegreen h-[800px] bg-titlegreen"}`}>
           <div className={`${styles['logo-div']} ${"p-4 w-40 h-20 border-b-2 border-b-slate200 bg-titlegreen"}`}>
             <form className={`${styles['fa_react']}`}>
              <FaUserCircle className="Icons" size="40"/>
             </form>
             <h2 className= {`${styles['Logotext']} ${"pl-[52px] pt-2.5 font-primary"}`}>MyPage</h2> 
           </div>
           <div className={`${styles['logo-div']} ${"p-4 w-40 h-20 border-b-2 border-b-slate200 bg-titlegreen"}`}>
             <form className={`${styles['fa_react']}`}>
              <FaHistory className="Icons" size="40"/>
             </form>
             <h2 className={`${styles['Logotext']} ${"pl-[52px] pt-2.5 font-primary"}`}>Recent</h2> 
           </div>
           <div className={`${styles['logo-div']} ${"p-4 w-40 h-20 border-b-2 border-b-slate200 bg-titlegreen"}`}>
             <form className={`${styles['fa_react']}`}>
              <FaRegStar className="Icons" size="40" />
             </form>
             <h2 className={`${styles['Logotext']} ${"pl-[52px] pt-2.5 font-primary"}`}>Favorites</h2> 
           </div>
           <div className={`${styles['logo-div']} ${"p-4 w-40 h-20 border-b-2 border-b-slate200 bg-titlegreen"}`}>
             <form className={`${styles['fa_react']}`}>
              <FaCog className="Icons" size="40" />
             </form>
             <h2 className={`${styles['Logotext']} ${"pl-[52px] pt-2.5 font-primary"}`}>Settings</h2> 
           </div>
           <div className={`${styles['logo-div']} ${"p-4 w-40 h-20 border-b-2 border-b-slate200 bg-titlegreen"}`}>
             <form className={`${styles['fa_react']}`}>
              <FaQuestionCircle className="Icons" size="40" />
             </form>
             <h2 className={`${styles['Logotext']} ${"pl-[52px] pt-2.5 font-primary"}`}>FAQ</h2> 
           </div>
         </div>
    );
}