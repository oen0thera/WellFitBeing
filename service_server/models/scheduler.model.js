const { error } = require("console");
const sql = require("./db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

class Scheduler {
    constructor(scheduler) {
        this.id = scheduler.id || 0
        this.time = scheduler.time || '1700,1800,1900,2000'
    }
}

Scheduler.create = async (newScheduler)=>{
    try{
        const res = await query("INSERT INTO scheduler SET ?", newScheduler)
        if (res){
            return {err:null, data: {insertId:res.insertId, newScheduler}}
        }
    } catch(err){
        return {err:err, data:null}
    }

    // result(err, data) -> 콜백함수 느낌으로 err 발생시 리턴해줌, 성공적으로 실행되면 data 를 리턴해줌. 
//     sql.end();
};

Scheduler.findByID = async (id)=>{
    try{
        const res = await query('SELECT * FROM scheduler WHERE id = ?',id)
        if (res.length){
            return {err: null, data: res[0]}
        }
        return {err:"Not Found", data:null}
    }catch(err){
        return {err:err, data:null}
    }
}
Scheduler.updateByID = async (time, id)=>{
    try{
        const res = await query("UPDATE SCHEDULER SET time=? WHERE id = ?", [time, String(id)])
        if (res.length){
            return {err: null, data: res[0]}
        }
        return {err:"Not Found", data:null}
    }catch(err){
        return {err:err, data:null}
    }
}


// // user id로 조회
// User.findByID = async (id)=>{
//     try{
//         const res = await query('SELECT * FROM user WHERE id = ?',id)
//         if (res.length){
//             return {err: null, data: res[0]}
//         }
//         return {err:"Not Found", data:null}
//     }catch(err){
//         return {err:err, data:null}
//     }
// }

// // user 전체 조회
// User.getAll = async () =>{
//     try{

//         const res = await query('SELECT * FROM user')
//         return {err:null, data: res}
//     }catch(err){
//         return {err:err, data:null}
//     }
// };

// // customer id로 삭제
// User.removeOne = async (id)=>{
//     try{
//         const res = await query('DELETE FROM user WHERE id = ?',id)

//         if(res.affectedRows ==0){
//             // id 결과가 없을 시 
//             return {err: "not_found", data:null}
//         }
//         return {err:null, data: res[0]}
//     }catch(err){
//         return {err:err, data:null}
//     }
// };

// // user 전체 삭제
// User.removeAll = async () =>{
//     try{
//         const res = await query('DELETE FROM user')
//         if(res.affectedRows ==0){
//             // id 결과가 없을 시 
//             return {err: "not found", data: null};
//         }
//         return {err:null, data:res}
//     }catch(err){
//         return {err:err, data:null}
//     }
// }
module.exports = Scheduler;