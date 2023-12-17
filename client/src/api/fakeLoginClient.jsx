import axios from 'axios';

export default class fakeLoginClient {
    constructor(id) {
        this.id = id;
    }
    async login(id){
        // return axios.get("fakeData/login.json");
        try{
            const response = await axios.get(`http://localhost:8080/user/login?id=${this.id}`);
            return response.data;
        }catch(error){
            console.error("Error:",error);
        }
    }
}
