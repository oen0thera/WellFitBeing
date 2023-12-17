const User = require("../models/user.model.js");
const { error } = require("console");
const sql = require("../models/db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

exports.modifyuserinfo = async (req, res)=>{
  try {
    console.log(req.data);
    if (req.body.modifyinfo === undefined){
        res.status(500).json({ message: "modifyinfo not found", data: null });
    }else{
        const user = await User.findByID(req.body.id);
        const new_info = req.body.modifyinfo

        if (!user.data) {
        console.log("User not found");
        res.status(500).json({ message: "User not found", data: null });
        } else {

            const query_ =  await query("UPDATE user SET id=?,pw=?,email=?,age=?,gender=? WHERE id = ?", [String(new_info.id) || user.data.id,
                new_info.pw || user.data.pw, new_info.email || user.data.email, new_info.age || user.data.age, 
                new_info.gender || user.data.gender, String(req.body.id)])

            res.status(200).json({ message: 'success', data: user})
        }
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', data: null });
  }

}

