import axios from 'axios';

export default class ModifyUserInfoClient {
    // 생성자(constructor)가 생략됨

    modifyUserInfo(id, pw, em) {
        this.id = id;
        this.pw = pw;
        this.em = em;
        return this.modify(); // 실제로는 여기서 axios.post 등의 로직을 포함할 것입니다.
    }

    async modify() {
        const userValidation = await this.checkUserValidation();
        
        if (userValidation) {
            try {
                const response = await axios.post("http://localhost:4000/auth/modify", {
                    id: this.id,
                    pw: this.pw,
                    em: this.em,
                });

                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("에러:", error);
            }
        } else {
            console.log("사용자에게 수정 권한이 없습니다. 수정이 취소되었습니다.");
            return null;
        }
    }

    async checkUserValidation() {
        const res = await axios.get(`http://localhost:4000/auth/check-permission?id=${this.id}`);
        console.log("checkUserValidation:", res);
        return res;
    }
}