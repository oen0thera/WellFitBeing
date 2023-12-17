import axios from 'axios';

export default class signInClient {
    constructor(id,passwd) {
        this.id = id;
        this.pw = passwd;
        this.sessionID = '';
        this.isLogin = false;
    }
    async signIn(id){
        // return axios.get("fakeData/login.json");
        console.log(id);
        try{
            const response = await axios.post(`http://localhost:8080/user/signin`,
            {headers:{
                "Content-Type":"application/json",
                "Cookie":this.sessionID,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"    
            },
            id : this.id,
            pw : this.pw,
            sessionID: this.sessionID,
            isLogin: this.isLogin,
            withCredentials:true,
            session:{
                is_login : false
            },
            },
            
            );
            console.log(response.headers);
            const allCookies = document.cookie;
            console.log("쿠키값:", allCookies);
            console.log("쿠키값 타입:", typeof allCookies);
              
            return response;
        }catch(error){
            console.error("Error:",error);
        }
    }
}
