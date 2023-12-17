const User = require("../models/user.model.js");
const { error } = require("console");
const sql = require("../models/db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

exports.signout = async (req, res)=>{
    try {
        
        if (req.headers.cookie){
          const cookie = req.headers.cookie
          console.log(cookie)
          const isSignIn = cookie.replace(/(?:(?:^|.*;\s*)isSignIn\s*=\s*([^;]*).*$)|^.*$/, '$1');
          const sessionID = cookie.replace(/(?:(?:^|.*;\s*)sessionID\s*=\s*([^;]*).*$)|^.*$/, '$1');

          res.clearCookie('isSignIn');
          res.clearCookie('sessionID');
          
          const query_result = await query("UPDATE user SET token = ? WHERE token = ?", [0, sessionID]);
  
          res.status(200).json({ message: 'Logout successful',data: {req, isSignIn:false,SessionID:0} });

        }else{
          res.status(401).json({ message: 'The current state is logged out.', data: null });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', data: null });
      }
}
