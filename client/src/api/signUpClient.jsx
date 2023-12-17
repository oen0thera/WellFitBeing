import axios from 'axios';

const signUp = async (id,pw,age,gen,em) => {
    const response = await axios.post("http://localhost:8080/user/signup",{
            id: id,
            pw: pw,
            age: age,
            gender:gen,
            email: em,
        });
        console.log(response.data);
        return response.data;
    }
    


export default signUp;