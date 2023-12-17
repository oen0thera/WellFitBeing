const { error } = require("console");
const sql = require("../models/db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

const Scheduler = require("../models/scheduler.model.js");

function findGaps(timeString) {
    const timeArray = timeString.split(",").map(time => parseInt(time));
  
    const gaps = [];
  
    for (let i = 0; i < timeArray.length - 1; i++) {
      const startTime = timeArray[i];
      const endTime = timeArray[i + 1];
  
      if (endTime - startTime > 60) {
        // 시간 간격이 100 이상인 경우(일정이 없는 경우)
        gaps.push({ start: startTime, end: endTime });
      }
    }
  
    return gaps;
  }
function convertToTimeArray(timeString) {
    // "1700,1800" 형태의 문자열을 배열로 분할
    const timeArray = timeString.split(',');

    // 배열의 각 요소에 대해 변환
    const convertedArray = timeArray.map(time => {
        // 시간과 분으로 분할
        const hour = time.substring(0, 2);
        const minute = time.substring(2);

        // 변환된 형태로 조합
        return `${hour}:${minute}`;
    });

    return convertedArray;
}


// 새 객체 생성
exports.ExerciseScheduler = async (req,res)=>{

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };
    if (req.body.sessionID === null || !req.body.sessionID || req.body.sessionID === 0){
        res.status(404).json({ message: "Please complete the login first.", data: null  });
    }
    
    const id = req.body.id || 0
    const ex_time = req.body.time || "1700,1800"
    // 스케줄 req.body 예시 -> const example_time = ["17:00","18:00"] 
    // 출력 결과: "1700,1800"
    

    const timeString = "1700,1800";
    const gaps = findGaps(timeString);
    
    const exercise_time = String(gaps[0].end+70)+ "," + String(gaps[0].end+170)
    
    const scheduler_plus_exercise_time =  String(gaps[0].start)+ "," + String(gaps[0].end+100)
    const timetoArray = convertToTimeArray(exercise_time)
    
    const new_scheduler = await Scheduler.findByID(req.body.id);
    if (!new_scheduler.data) {
        const scheduler = new Scheduler({
            id: req.body.id || 0, 
            time: scheduler_plus_exercise_time || '1700,1900',
        })
        const result = await Scheduler.create(scheduler);
        res.status(200).json({ message: "create scheduler", data: {exercise: timetoArray , isSignIn:true, SessionID:1}  });
    } else {
        const result__ = await Scheduler.updateByID( scheduler_plus_exercise_time, id)
        res.status(200).json({ message: "Success", data: {exercise: timetoArray, isSignIn:true, SessionID:1}  });
    }
}