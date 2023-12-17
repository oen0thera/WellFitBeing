const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require('./routes/user.routes');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileStore = require('session-file-store')(session); // session file store
var cors = require('cors');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// /user 경로 
app.use(cors({
    origin:'http://localhost:3000',
    credentials:'true'
  },
  '/user', session({
  secure: false,	// https 환경에서만 session 정보를 주고받도록처리
  secret: "123", // 암호화하는 데 쓰일 키
  resave: true, // 세션을 언제나 저장할지 설정함
  saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: false, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    secure: false,
    //maxAge: 3600000 // 세션 만료 시간 (1시간)
  },
  name: 'session-cookie', // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.

}))); 

app.use('/user', userRouter); // 라우팅


app.get("/", (req, res)=>{
  res.send("hello welcome")
});

app.use((req, res, next) => { // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send('Not Found');
});
// 포트넘버 설정
app.listen(port=8080, ()=>{
    console.log("Server is running on port 8080.");
})
