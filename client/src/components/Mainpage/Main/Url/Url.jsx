import React, {useState, useEffect} from 'react';
import { FaFilePdf } from "https://cdn.skypack.dev/react-icons@4.1.0/fa";
import styles from './Url.module.css';
import Calendar from 'react-calendar';
import moment from 'moment';
import Schedule from './Schedule';
import Timetable from './Timetable';
import Timetask from './Timetask';
import './Calendar.css';

const Url = () => {

    const [value, onChange] = useState(new Date());
    const monthOfActiveDate = moment(value).format('YYYY-MM');
    const [activeMonth, setActiveMonth] = useState(monthOfActiveDate)
    const handleDateChange = (selectedDate) => {
        onChange(selectedDate);
    }
    const [isSelectDate, setSelectDate] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const [applyName, setApplyName] = useState("");
    const [selectTime, setSelectTime] = useState();
    const [addTime, setAddTime] = useState(false);
    const [modTime, setModTime] = useState(false);
    const [delTime, setDelTime] = useState(false);
    const [modToggle, setModToggle] = useState(false);
    const [modId, setModId] = useState('');
    const ToggleDateSelect = (()=>{
      if(isSelectDate){
        setSelectDate(false);
        console.log('active');
        console.log(setSelectDate);
        const C = document.getElementById('C');
        console.log(C);
      }
      else{
        if(addTime){
          setAddTime(false);
        }
        if(modTime){
          setModTime(false);
        }
        if(delTime){
          setDelTime(false)
        }
          setSelectDate(true);
          console.log('close');
          console.log(setSelectDate);
          const C = document.getElementById('C');
          console.log(C);
      }
    });
    const setTimetaskName = (event) =>{
      const newValue = { name: event.target.value || ''};
      setNameValue(newValue.name);
    }
    const ToggleTimeAdd = () =>{
      if(addTime){
        setAddTime(false);
        console.log('active');
        console.log(setAddTime);

      }
      else{
        if(isSelectDate){
          setSelectDate(false);
        }
        if(modTime){
          setModTime(false);
        }
        if(delTime){
          setDelTime(false)
        }
        setAddTime(true);
          console.log('close');
          console.log(setAddTime);
      }
    };
    const ToggleTimeMod = () =>{
      if(modTime){
        setModTime(false);
      }
      else{
        if(isSelectDate){
          setSelectDate(false);
        }
        if(delTime){
          setDelTime(false)
        }
        if(addTime){
          setAddTime(false);
        }
        setModTime(true);
      }
    }

    const ToggleTimeDel = () =>{
      if (delTime){
        console.log("Here");
        setDelTime(false);
      }
      else{
        if(isSelectDate){
          setSelectDate(false);
        }
        if(modTime){
          setModTime(false);
        }
        if(addTime){
          setAddTime(false);
        }
        console.log("changer");
        setDelTime(true);
      }
    }
    
    const ToggleSelectedMod = (timeInput) =>{
      setModToggle(timeInput);
    }
    const ToggleIsExcercise = () =>{
      setIsExcercise(false);
      console.log("isExcercise:",isExcercise);
    }
    const ToggleIsDiet = () =>{
      setIsDiet(false);
      console.log("isExcercise:",isDiet);
    }
    const getTimeTables = (times) =>{
      setTotalTimetable(times);
      console.log(totalTimetable);
    }

    const getSelectedIds = (Ids)=>{
      setSelectedIds(Ids);
      console.log(selectedIds)
    }
    const getModId = (inputModId,inputModName,inputModTime)=>{
      if(modTime){
        setModId(inputModId);
      setSelectId(inputModId);
      console.log(inputModId);
      console.log(inputModName,inputModName.name);
      const currName = inputModName.toString();
      setNameValue(currName);
      console.log(typeof nameValue);
      console.log(inputModTime.slice(0,5));
      setStartTime(inputModTime.slice(0,5));
      setEndTime(inputModTime.slice(6,11));
      }
    }

    
    const[selectId, setSelectId] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [totalTimetable, setTotalTimetable] = useState([]);
    const[calcId, setCalcId] = useState('');
    const [startTime, setStartTime] = useState('06:00');
    const [endTime, setEndTime] = useState('12:00');
    const [isExcercise, setIsExcercise] = useState(false);
    const [isDiet, setIsDiet] = useState(false);
    const [recommendDietTime, setRecommendDietTime] = useState([]);
    const [recommendExcerciseTime, setRecommendExcerciseTime] = useState([]);
    const handleNameValue = (event) => {
      const newValue = { name: event.target.value || ''};
      setNameValue(newValue.name);
    };
    const handleStartTime = (event) =>{
      setStartTime(event.target.value);
    }
    const handleEndTime = (event) =>{
      setEndTime(event.target.value);
    }

    const[height,setHeights] = useState(()=> {
      const newHeights = {};
      for (let i=1; i<=120; i++){
        newHeights[i] ='50px';
      }
      return newHeights;
    });
    const[selectHeight,setSelectHeight] = useState('');
    useEffect(() => {
      console.log('selectId changed:', selectId);
      console.log(nameValue,applyName);
      // Any additional logic you want to perform when selectId changes
    }, [selectId]);
    useEffect(()=>{
      console.log('nameValue changed:',nameValue);
      console.log('applyName', applyName);
    }, [nameValue,applyName]);
    useEffect(()=>{
      console.log("addTime:",addTime);
      console.log("modTime:",modTime);
    },[addTime,modTime]);
    useEffect(()=>{
      console.log('selectedIds changed:', selectedIds);
    },[selectedIds])
    
    useEffect(()=>{
      console.log('totalTimetable changed:', totalTimetable);
    },[totalTimetable]);
    const timeSelect = (stime)=>{
      console.log('timeselect');
      if (stime<=23&&stime>=6){
        const newId = 1 + 5 * (stime - 6);
        console.log(newId);
        return newId;
      }
      else{
        const newId = 91 + 5 * stime;
        console.log(newId);
        return newId;
      }

    }



    const isTimeCollideVertical = (selectedStartTime,selectedEndTime,timeId) =>{
      for(let i=timeId%5;i<120;i+=5){
        console.log(totalTimetable[i]);
        if (totalTimetable[i]){
          console.log('selectedStartTime from Vertical totalTimeTable',totalTimetable[i].slice(0,2),totalTimetable[i].slice(3,5));
          console.log('selectedEndTime from Vertical totalTimeTable',totalTimetable[i].slice(6,8),totalTimetable[i].slice(9,11));
          const compTimeStartTime =  parseInt(totalTimetable[i].slice(0,2)) + parseFloat(totalTimetable[i].slice(3,5))/60;
          const compTimeEndTime = parseInt(totalTimetable[i].slice(6,8)) + parseFloat(totalTimetable[i].slice(9,11))/60;
          console.log('comparing time vertically',compTimeStartTime,compTimeEndTime);
          const selectedTimeStartTime = parseInt(selectedStartTime.slice(0,2)) + parseFloat(selectedStartTime.slice(3,5))/60;
          const selectedTimeEndTime = parseInt(selectedEndTime.slice(0,2)) + parseFloat(selectedEndTime.slice(3,5))/60;
          if ((selectedTimeStartTime>=compTimeStartTime && selectedTimeStartTime<compTimeEndTime)||(selectedTimeEndTime>compTimeStartTime && selectedTimeEndTime<=compTimeEndTime)||(compTimeStartTime>=selectedTimeStartTime && compTimeEndTime<=selectedTimeEndTime)||(compTimeStartTime<selectedTimeStartTime && compTimeEndTime>selectedTimeEndTime)){
            return true;
          }
        }
      }
      return false;
    }
    const isTimeCollideHorizontal = (selectedStartTime,selectedEndTime,timeId)=>{
      alert("time collided vertical, proceeding horizontal check")
      for(let i=1+5*parseInt((timeId-1)/5); i<1+5*parseInt((timeId-1)/5)+5;i++){
        // if (totalTimetable[i]){
        //   console.log('selectedStartTime from Horizontal totalTimeTable',totalTimetable[i].slice(0,2),totalTimetable[i].slice(3,5));
        //   console.log('selectedEndTime from Horizontal totalTimeTable',totalTimetable[i].slice(6,8),totalTimetable[i].slice(9,11));
        //   const compTimeStartTime =  parseInt(totalTimetable[i].slice(0,2)) + parseFloat(totalTimetable[i].slice(3,5))/60;
        //   const compTimeEndTime = parseInt(totalTimetable[i].slice(6,8)) + parseFloat(totalTimetable[i].slice(9,11))/60;
        //   console.log('comparing time horizontally',compTimeStartTime,compTimeEndTime);
        //   const selectedTimeStartTime = parseInt(selectedStartTime.slice(0,2)) + parseFloat(selectedStartTime.slice(3,5))/60;
        //   const selectedTimeEndTime = parseInt(selectedEndTime.slice(0,2)) + parseFloat(selectedEndTime.slice(3,5))/60;
        //   if ((selectedTimeStartTime>compTimeStartTime && selectedTimeStartTime<compTimeEndTime)||(selectedTimeEndTime>compTimeStartTime && selectedTimeEndTime<compTimeEndTime)){
        //     return true;
        //   }
        // }
        console.log("Horizontal:",i)
        if(isTimeCollideVertical(selectedStartTime,selectedEndTime,i)){
          continue;
        }
        else{
          console.log("Horizontal result:",i);
          return i;
        }
      }
      return 0;
    }
    // 추후에 지울것. 테스트용 함수 코드
    const setExcerciseTime = () =>{
      setRecommendExcerciseTime(['18:20','19:40']);
    }
    const setDietTime = () =>{
      setRecommendDietTime(['12:30','13:30']);
    }
    useEffect(()=>{
      console.log('recommendExcerciseTime:', recommendExcerciseTime);
      let startTime = JSON.stringify(recommendExcerciseTime[0]);
      let endTime = JSON.stringify(recommendExcerciseTime[1]);
      console.log(startTime,endTime);
      if(startTime&&endTime){
        let newId = timeSelect(parseInt(startTime.slice(1,3)));
        setSelectId(newId);
        setCalcId(newId);
        console.log(newId);
        console.log(startTime.slice(1,3));
        let hourDiff = parseInt(endTime.slice(1,3))-parseInt(startTime.slice(1,3));
        if (hourDiff>=0){
          }
        else{
          hourDiff = 24+parseInt(hourDiff);
          }
        let minDiff = parseInt(endTime.slice(4,6))-parseInt(startTime.slice(4,6));
        if (minDiff>=0){
        }
        else{
          hourDiff-=1;
          minDiff = 60+parseInt(minDiff);
        }
        console.log(hourDiff,minDiff);
        let timeDiff = (hourDiff*60+minDiff)/60;
        console.log(timeDiff);
        setSelectHeight(timeDiff);
        setApplyName("운동스케줄 추천 시간");
        setSelectTime([startTime.slice(1,6),endTime.slice(1,6)]);
        setIsExcercise(true);
      }
      
      
    },[recommendExcerciseTime])
    useEffect(()=>{
      console.log('recommendDietTime:', recommendDietTime);
      let startTime = JSON.stringify(recommendDietTime[0]);
      let endTime = JSON.stringify(recommendDietTime[1]);
      console.log(startTime,endTime);
      if(startTime&&endTime){
        let newId = timeSelect(parseInt(startTime.slice(1,3)));
        setSelectId(newId);
        setCalcId(newId);
        console.log(newId);
        console.log(startTime.slice(1,3));
        let hourDiff = parseInt(endTime.slice(1,3))-parseInt(startTime.slice(1,3));
        if (hourDiff>=0){
          }
        else{
          hourDiff = 24+parseInt(hourDiff);
          }
        let minDiff = parseInt(endTime.slice(4,6))-parseInt(startTime.slice(4,6));
        if (minDiff>=0){
        }
        else{
          hourDiff-=1;
          minDiff = 60+parseInt(minDiff);
        }
        console.log(hourDiff,minDiff);
        let timeDiff = (hourDiff*60+minDiff)/60;
        console.log(timeDiff);
        setSelectHeight(timeDiff);
        setApplyName("식사스케줄 추천 시간");
        setSelectTime([startTime.slice(1,6),endTime.slice(1,6)]);
        setIsDiet(true);
      }
      
      
    },[recommendDietTime])

    const RecommendExcerciseTimetask = ()=>{
      
      console.log(recommendExcerciseTime);
      
    }

    const timeCalc = () =>{
      console.log("Time Calc function");
      console.log(startTime,endTime);
      console.log(startTime.slice(0,2),startTime.slice(3,5));
      console.log(endTime.slice(0,2),endTime.slice(3,5));
      if (startTime==endTime){
        setSelectTime([startTime,endTime]);
        alert("startTime cannot be same to endTime");
        return;
      }
      let newId = timeSelect(parseInt(startTime.slice(0,3)));
      
      // if (!modTime&&!delTime){
      //   console.log(selectedIds);
      //   console.log(selectedIds.includes(newId.toString()));
      //   for(let i=0; i<5; i++){
      //     if(selectedIds.includes(newId.toString())){
      //       newId+=1;
      //       console.log(newId);
      //       if (i==4){
      //         alert("Timeline is full. Please delete some tasks");
      //         return;
      //       }
      //     }
      //   }
      // }
      console.log(selectedIds);
      console.log(selectedIds.includes(newId.toString()));
      
      for(let i=0; i<5; i++){
        if(selectedIds.includes(newId.toString())){
          newId+=1;
          console.log(newId);
          if (i==4){
            alert("Timeline is full. Please delete some tasks");
            return;
          }
        }
      }
      // if(!modTime){
      //   const isTimetaskCollides = isTimeCollide(startTime,endTime,newId);
      //   if (isTimetaskCollides){
      //     alert("Timetask Collides!");
      //     return;
      //   }
      // }
      if(isTimeCollideVertical(startTime,endTime,newId)){
        const collideCheckedId = isTimeCollideHorizontal(startTime,endTime,newId);
        console.log(collideCheckedId);
        if(collideCheckedId==0){
          alert("Timetask Collides!");
          return;
        }
        else{
          newId = collideCheckedId; 
        }  
      }
      
      console.log(modId,newId);
      setCalcId(newId);
      setSelectId(newId);
      let hourDiff = parseInt(endTime.slice(0,2))-parseInt(startTime.slice(0,2));
      if (hourDiff>=0){
        }
      else{
        hourDiff = 24+parseInt(hourDiff);
        }
      let minDiff = parseInt(endTime.slice(3,5))-parseInt(startTime.slice(3,5));
      if (minDiff>=0){
      }
      else{
        hourDiff-=1;
        minDiff = 60+parseInt(minDiff);
      }
      console.log(hourDiff,minDiff);
      let timeDiff = (hourDiff*60+minDiff)/60;
      console.log(timeDiff);
      console.log(calcId);
      setSelectHeight(timeDiff);
      console.log(nameValue);
      setApplyName(nameValue);
      console.log(applyName);
      setSelectTime([startTime,endTime]);
      }
    return (
    <div className = 'w-[800px] h-[1000px] ml-[200px]'>
      <button className={`${styles['Daily-bttn']}`} onClick={()=>{ToggleDateSelect();}}> 날짜선택 </button>
      <button className={`${styles['Daily-bttn']}`} onClick={()=>{ToggleTimeAdd()}}> 일정추가 </button>
      <button className={`${styles['Daily-bttn']} ${modTime === true ? styles['onUse'] : styles['close']}`} onClick={()=>{ToggleTimeMod()}}> 일정변경 </button>
      <button className={`${styles['Daily-bttn']} ${delTime === true ? styles['onUse'] : styles['close']}`} onClick={()=>{ToggleTimeDel()}}> 일정삭제 </button>
      <button className={`${styles['Daily-bttn']}`} onClick={()=>{setExcerciseTime()}}> 운동스케줄 </button>
      <button className={`${styles['Daily-bttn']}`} onClick={()=>{setDietTime()}}> 식사스케줄 </button>
      <div className={`${styles['Calendar']} + ${isSelectDate === true ? styles['active'] : styles['close']}`} id='C'>
            <Calendar onChange={handleDateChange} value={value} formatDay={(locale,date) => moment(date).format("DD")}></Calendar>
            {moment(value).format("YYYY년 MM월 DD일")}
      </div>
      <div className={`${styles['CurrentDate']}`}>
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
        <Timetable/>
        <Schedule/>
        <Timetask selectedId={calcId} selectedName={applyName} selectedHeight={selectHeight} selectedTimes={selectTime} modState={modTime} delState={delTime} modToggle={modToggle}  modId={modId} isExcercise={isExcercise} isDiet={isDiet}  ToggleSelectedMod={ToggleSelectedMod} ToggleIsExcercise={ToggleIsExcercise} ToggleIsDiet={ToggleIsDiet} getModId={getModId} getSelectedIds={getSelectedIds} getTimeTables={getTimeTables} />
        <div className={`${styles['Add-input']} + ${addTime === true ? styles['active'] : styles['close']}`}>
          <div className={`${styles['input-radius']}`}>
            <div className={`${styles['input-container']}`}>
              <div className = {`${styles['Id-input']}`}
                type = "number"
                value = {selectId}
              >
              </div>
              <div className="text-2xl">
                Add Timetask
              </div>
              <div className={`${styles['Name']}`}>
              일정 :　
                <input className={`${styles['Name-input']}`} type="text" value={nameValue} onChange={setTimetaskName}/>
              </div>
              시간 :　
              <input
                className = {`${styles['Start-time']}`}
                type = "time"
                id = "stime"
                onChange ={handleStartTime}
                value = {startTime}
              />
              ~
              <input
                className = {`${styles['End-time']}`}
                type = "time"
                id = "etime"
                min = {startTime}
                onChange={handleEndTime}
                value = {endTime}
              />
              <button className="time-confirm" onClick={()=>timeCalc()}>확인</button>
            </div>
          </div>
        </div>
        <div className={`${styles['Mod-input']} ${modToggle===true? styles['active']:styles['close']}`}>
          <div className={`${styles['input-radius']}`}>
              <div className={`${styles['input-container']}`}>
                <div className = {`${styles['Id-input']}`}
                      type = "number"
                      value = {selectId}
                ></div>
                <div className="text-2xl">
                  Modify Timetask
                </div>
                <div className={`${styles['Name']}`}>
                  일정 :　
                  <input
                      className = {`${styles['Name-input']}`}
                      type = "text"
                      value ={nameValue}
                      onChange ={handleNameValue}
                />
                </div>
                  시간 :　
                <input
                      className = {`${styles['Start-time']}`}
                      type = "time"
                      id = "stime"
                      onChange ={handleStartTime}
                      value = {startTime}
                    />
                    ~
                    <input
                      className = {`${styles['End-time']}`}
                      type = "time"
                      id = "etime"
                      min = {startTime}
                      onChange={handleEndTime}
                      value = {endTime}
                    />
                <button className="time-confirm" onClick={()=>{setModToggle(false); timeCalc();}}>확인</button>
              </div>
            </div>
          </div>
      </div>
    );
}

export default Url;