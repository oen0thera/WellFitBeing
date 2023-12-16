import axios from 'axios';

export default class loginClient {
    constructor(){
        this.httpClient = axios.create({
            baseURL: process.env.REACT_APP_baseURL
        })
    }
    async login(params){
        return this.httpClient.get('login',params);//api호출
    }
}

