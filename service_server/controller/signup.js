const User = require("../models/user.model.js");
const { error } = require("console");
const sql = require("../models/db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

exports.signup = async (req, res) => {
    try {
        // pw, id 중 하나라도 없는 경우
        console.log(req.body.pw)
        if (req.body.pw === null) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }
        if (req.body.id === null) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }

        const userExist = await User.findByID(req.body.id);
        
        if (userExist.data !== null) {
            return res.status(500).json({ message: "exist ID", data: userExist.data  });
        } 

        const user = new User({
            id: req.body.id,
            pw: req.body.pw || 0,
            age: req.body.age || 0,
            email: req.body.email || 0,
            gender: req.body.gender || 0,
            token: req.body.token || 0
        });

        // 데이터베이스에 저장
        const result = await User.create(user);

        res.cookie('isSignIn', true, { maxAge: 3600000 });
        res.cookie('sessionID', req.sessionID || 1, { maxAge: 3600000 });

        // 데이터베이스에서 수정된 내용 저장
        const query_ =  await query("UPDATE user SET token = ? WHERE id = ?", [req.sessionID || 1, req.body.id])

        if (result.err) {
            return res.status(500).json({ message: result.err });
        }

        return res.status(200).json({ message: "Success register", data: { result ,isSignIn:true,SessionID:1} });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
