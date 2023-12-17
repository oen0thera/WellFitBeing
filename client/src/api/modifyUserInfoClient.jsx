import axios from 'axios';

export default class ModifyUserInfoClient {
    // 생성자(constructor)가 생략됨

    modifyUserInfo(id, pw, age, gen, em) {
        this.id = id;
        this.pw = pw;
        this.age = age
        this.gen = gen;
        this.em = em;
        console.log(this.id,this.pw,this.age,this.gen,this.em);
        return this.modify(); // 실제로는 여기서 axios.post 등의 로직을 포함할 것입니다.
    }
    
    async modify() {
        
        try {
            const response = await axios.post("http://localhost:8080/user/modifyuserinfo", {
                id: this.id,
                modifyinfo:{
                    id: this.id,
                    pw: this.pw,
                    age: this.age,
                    gender: this.gen,
                    email: this.em,
                }
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("에러:", error);
        }
    }

    
}