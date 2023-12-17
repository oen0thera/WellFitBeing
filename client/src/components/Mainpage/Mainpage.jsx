
import React, { useState, useRef , useEffect} from 'react';
import { FaReact, FaUserCircle, FaHistory, FaRegStar, FaFilePdf, FaCog, FaQuestionCircle } from "https://cdn.skypack.dev/react-icons@4.1.0/fa";
import styles from "./Mainpage.module.css";
import Menu from './Header/Menu/Menu';
import Title from './Header/Title/Title';
import Login from './Header/Login-bttn/Login-bttn';
import Url from './Main/Url/Url';
import loginClient from '../../api/loginClient';

import { QueryClient,QueryClientProvider, useQuery} from "@tanstack/react-query";

const QC = new QueryClient();

const App = () => {
  const [FiledivIsOpen, FiledivSetIsOpen] = useState(false);
  const [LogindivIsOpen, LogindivSetIsOpen] = useState(false);
  const [FileIsLoaded, FileLoadSetIsOpen] = useState(false)
  const [userId,setUserId] = useState('');

    const LoadedFile = () => {
        if (FileIsLoaded) {
            FileLoadSetIsOpen(false);
        }
        else {
            FileLoadSetIsOpen(true);
        }
    }
    const getUserId = (id) => {
      setUserId(id);
    }
    useEffect(() => {
      console.log(userId);
    }, [userId]);
    
  return(

    <QueryClientProvider client={QC}>
    <div>
    <script src="https://unpkg.com/tailwindcss-jit-cdn"></script>
      <div className="Top border-2 border-slate100 w-full h-20">
       <section className="Menu">
         <Menu/>
       </section>
       <Title/>
       <Login getUserId={getUserId}/>
      </div>
      <Url userId={userId}/>
     </div>
     </QueryClientProvider>
  );
}

export default App;