const User = require("../models/user.model.js");
const { error } = require("console");
const sql = require("../models/db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

exports.signin = async (req, res)=>{
  console.log("TESTING", req.body);

  try {
    const user = await User.findByID(req.body.id);
    
    if (!user.data) {
      console.log("User not found");
      res.status(500).json({ message: "User not found", data: null });
    } else {
      const pw = user.data.pw;


      if (pw === String(req.body.pw)) {
        res.cookie('isSignIn', true, { maxAge: 3600000 });
        res.cookie('sessionID', req.sessionID || 1, { maxAge: 3600000 });


        // 데이터베이스에서 수정된 내용 저장
        const query_ =  await query("UPDATE user SET token = ? WHERE id = ?", [req.sessionID || 1, req.body.id])
    
        res.status(200).json({ message: "Success login & produce sessionID", data: {user,isSignIn:true,SessionID:1} });
      } else {
        res.status(401).json({ message: "Valid ID, but wrong password was entered", data: user });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', data: null });
  }

}

