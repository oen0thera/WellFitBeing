const User = require("../models/user.model.js");

// 새 객체 생성
exports.create = async (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };
    console.log("TESTING 12/17")
    const user = new User({
        user_id: req.body.user_id || 0,
        user_pw: req.body.user_pw || 0,
        user_money: req.body.user_money || 0
    });

    // 데이터베이스에 저장
    await User.create(user)
      .then((result) => {
        // 여기서 if(err)는 불필요합니다. 에러 처리는 .catch() 블록에서 처리합니다.
        res.status(200).json(result);  // result.data 대신에 result로 수정
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the user.",
        });
      });
};



// 전체 조회 
exports.findAll = async (req,res)=>{
    await User.getAll().then((result)=>{
      if (result.err)
          res.status(500).send({
            message:
              result.err || "Some error occurred while retrieving users."
          });
        else res.status(200).json(result.data);
      });
};
        

exports.findOne = async (req,res)=>{
    await User.findByID(req.body.user_id).then((result)=>{
      if (result.err) {
        if (result.err === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.body.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.body.user_id
          });
        }
      } else res.status(200).json({ message: "success", data: result.data });
    });

};

// id로 삭제
exports.deleteOne = async (req,res)=>{
    await User.removeOne(req.body.user_id).then((result)=>{
      if (result.err){
        if (result.err === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.body.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.body.user_id
          });
        }
      } else res.status(200).json({ message: `User was deleted successfully!` });
    })
};

// 전체 삭제
exports.deleteAll = async (req,res)=>{
    await User.removeAll().then((result)=>{
      if (result.err)
          res.status(500).send({
            message:
              result.err || "Some error occurred while removing all users."
          });
        else res.status(200).json({ message: `All users were deleted successfully!` });
    })
};

exports.login = async (req, res)=>{
  console.log("TESTING",req.body)
  await User.findByID(req.body.user_id).then((result)=>{
      if (! result.err=== "Not Found" ){
        console.log("Not found");
        res.status(500).json({message: result.err, data: result.data})
      }else if (result.data === null){
        res.status(500).json({message: "Error retrieving User with id", data: result.data})
      }
      else{
        const user_pw = result.data.user_pw
        console.log(user_pw, req.body.user_pw)
        if(user_pw === req.body.user_pw){
          req.body.session.is_login = true 
          res.cookie('sessionID', req.sessionID, { maxAge: 1 });
          res.status(200).json({message: "Success login & produce sessionID", data: result.data})
        }
        else{
          res.status(401).json({message:"Valid ID, but wrong password was entered", data: result.data})
        }
        }
    })
}

exports.logout = async (req, res)=>{
    await req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/');
        res.status(200).json({message: "success logout"}) // 웹페이지 강제 이동 & session file 삭제
    });
}

exports.register = async (req, res) => {
    // pw, id중 하나라도 없는 경우
    if (!req.body.user_pw || !req.body.user_id) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    
    await User.findByID(req.body.user_id).then((result)=>{
        if (! result.err=== "Not Found" ){
            res.status(500).json({message: result.err})
        }else if (result.err === null){
            res.status(500).json({message: "exist ID", data: result.data})
        }
    })

    const user = new User({
        user_id: req.body.user_id,
        user_pw: req.body.user_pw,
        user_money: req.body.user_money
    });

    // 데이터베이스에 저장

    await User.create(user).then((result)=>{
        if (result.err){
            res.status(500).json({message: result.err})
        }else{
            res.status(200).json({message: "Success register", data: result.data})
        }
    })
  };
  