import axios from 'axios';

export default class signInClient {
    constructor(id,passwd) {
        this.id = id;
        this.pw = passwd;
    }
    async signIn(id){
        // return axios.get("fakeData/login.json");
        console.log(id);
        try{
            const response = await axios.post(`/user/login`,
            {headers:{
                "Content-Type":"application/json",
                "Cookie":this.sessionid,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"    
            },
            user_id : this.id,
            user_pw : this.pw,
            withCredentials:true,
            session:{
                is_login : false
            }
            },
            
            );
        
            return response.data;
        }catch(error){
            console.error("Error:",error);
        }
    }
}
