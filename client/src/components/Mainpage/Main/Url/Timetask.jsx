import React,{useState, useEffect} from 'react';
import styles from './Timetask.module.css';

const Timetask = ({selectedId, selectedName, selectedHeight, selectedTimes, modState, delState, modToggle, modId, isExcercise, isDiet, ToggleSelectedMod,ToggleIsExcercise, ToggleIsDiet, getModId, getSelectedIds, getTimeTables }) => {
    console.log(selectedId);
    console.log(selectedName);
    console.log(selectedHeight);
    console.log(modState);
    console.log(modId);
    console.log(selectedTimes);
    if(selectedTimes){
        console.log(selectedTimes[0]===selectedTimes[1])    
    
        if (selectedTimes[0]===selectedTimes[1]){
            selectedId='';
        }
    }
    const[width,setWidths] = useState(()=> {
        const newWidths = {};
        for (let i=1; i<=120; i++){
          newWidths[i] ='40px';
        }
        return newWidths;
    });
    const[height,setHeights] = useState(()=> {
        const newHeights = {};
        for (let i=1; i<=120; i++){
          newHeights[i] ='50px';
        }
        return newHeights;
    });

    const[margin,setMargins] = useState(()=> {
        const newMargins = {};
        for(let i=1; i<=120; i++){
            newMargins[i] = '0px';
        }
        return newMargins;
    })

    const[left, setLeft] = useState(()=>{
        const newLeft = {};
        for(let i=1; i<=120; i++){
            newLeft[i] = '0px';
        }
        return newLeft;
    })
    const[color, setColor] = useState(()=>{
        const newColor = {};
        for(let i=1; i<=120; i++){
            newColor[i] = '#4ade80';
        }
        return newColor;
    })
    const[name,setNames] = useState(()=>{
        const newNames = {};
        for (let i=1; i<=120; i++){
            newNames[i] ='null';
        }
        return newNames;
    });
    const[time,setTimes] = useState(()=>{
        const newTimes = {};
        for (let i=1; i<=120; i++){
            newTimes[i] = '';
        }
        return newTimes;
    })
    
    const[selectedIdHeights, setSelectedIdHeights] = useState([]);
    const[selectedIdNames, setSelectedIdNames] = useState([]);
    const[selectedIdTimes, setSelectedIdTimes] = useState([]);
    console.log(selectedIdNames)
    useEffect(()=>{
        console.log(name,modState,modId)
    },[name,modState,modId]);
    useEffect(()=>{
        getSelectedIds(selectedIdNames);
        getTimeTables(time);
    },[selectedIdNames,time]);
    useEffect(()=>{
        console.log("times:", time);
        console.log("selectedIdTimes:", selectedIdTimes);
        console.log("margin:",margin);
    },[selectedIdTimes,time,margin])
    useEffect(()=>{
        console.log("Excercise, Diet", isExcercise, isDiet);
        if(isExcercise){
            setWidths((prevWidths)=>({
                ...prevWidths,
                [selectedId] : `913px`
            }));
            setLeft((prevLefts)=>({
                ...prevLefts,
                [selectedId] : `-80px`
            }));
            setColor((prevColors)=>({
                ...prevColors,
                [selectedId] : `#743531`
            }))
            console.log(color);
            ToggleIsExcercise();
        } ;
        
        if(isDiet){
            setWidths((prevWidths)=>({
                ...prevWidths,
                [selectedId] : `913px`
            }));
            setLeft((prevLefts)=>({
                ...prevLefts,
                [selectedId] : `-80px`
            }));
            setColor((prevColors)=>({
                ...prevColors,
                [selectedId] : `#ffd400`
            }))
            console.log(color);
            ToggleIsDiet();
        } ;
        
    },[isExcercise,isDiet,width,color])
    
    useEffect(()=>{
        delTime(modId);
        if (selectedId&&selectedHeight) {
            const newHeight = parseFloat(selectedHeight);
            const newMargin = parseFloat(selectedTimes[0].slice(3,6));
            setMargins((prevMargins)=>({
                ...prevMargins,
                [selectedId] : `${(newMargin/60)*2*25}px`
            }));
            setHeights((prevHeights)=>({
                ...prevHeights,
                [selectedId] : `${newHeight * 2 * 25}px`,
            }));
            setSelectedIdHeights((prevSelectedIdHeights) => [...prevSelectedIdHeights, `${selectedId}`]);
        }
        

        if(selectedId){
            const tempNames = JSON.stringify(selectedName);
            const newNames = tempNames.slice(1,-1);
            console.log(newNames,typeof newNames)
            setNames((prevNames)=>({
                ...prevNames,
                [selectedId] : `${newNames}`,
            }));
            console.log(name[selectedId],`${newNames}`);
            setSelectedIdNames((prevselectedName)=> {
                const newSelectedName = `${selectedId}`;
                const uniqueSelectedName = new Set(prevselectedName);
                uniqueSelectedName.add(newSelectedName);
                return [...uniqueSelectedName];
            });
        }
        if(selectedId&&selectedTimes){
            const newTimes = selectedTimes;
            setTimes((prevTimes)=>({
                ...prevTimes,
                [selectedId] : `${newTimes}`
            }));
            setSelectedIdTimes((prevselectedTimes)=> [...prevselectedTimes, `${selectedId}`]);
            
        }
        
        
        console.log(name);
        console.log("Id and height",selectedId,height[selectedId]);
        console.log("Id and Name",selectedId, name[selectedId]);
    },[selectedId,selectedHeight,selectedName,selectedTimes]);


const numberOfButtons = 120;


const toggleModInput = () => {
    if (modState){
        if (modToggle){
            ToggleSelectedMod(false);
        }
        else{
            ToggleSelectedMod(true);
        }
    }
}


const modifyTime = ({modState,id,name,time}) =>{
    if (!modState) {
        console.log("This should be in add func");
        return; // Do nothing if modState is false
      }
    else{
        if (id) {
            console.log("This should be in mod func");
            console.log('modifying:', modState);
            console.log(time);
            if(selectedTimes){
                console.log("Mods selected Times",selectedTimes);
                console.log(selectedTimes[0],selectedTimes[1])
                if (selectedTimes[0]!==selectedTimes[1]){
                    delTime(id);
                }
            }
            getModId(id, name, time);
          }
    }
      
}

const deleteTime = ({delState,id}) =>{
    if(delState){
        if(id){
            delTime(id);
        }
    }
} 

const delTime = (removeId) => {
    if (modState||delState){
        setSelectedIdHeights((prevSelectedIdHeights) => prevSelectedIdHeights.filter((id)=> id !== (removeId).toString()));
        setSelectedIdNames((prevSelectedIdNames) => prevSelectedIdNames.filter((id)=> id !== (removeId).toString()));
        setTimes((prevTimes)=>({
            ...prevTimes,
            [removeId] : ``
        }));
    }   
}


return(
    <div className={`${styles['Timetask-body']}`}>
                
        <div className={styles['Time-task']}>
            {Array.from({ length: numberOfButtons }, (_, index) => (
                <div className={`${styles['Time-line-container']}`} key={index+1}>
                    <button
                    key={index + 1}
                    className={`${styles['Time-line']} ${selectedIdHeights.includes(`${index+1}`)? styles['selected'] : styles['close']}`}
                    id={`${index + 1}`}
                    value={{name: name[index+1]}}
                    style={{ width: width[index+1], height: height[index + 1], marginTop: margin[index+1], left: left[index+1], backgroundColor: color[index+1]}}
                    onClick= {()=>{modifyTime({modState, id:index+1, name: name[index+1], time: time[index+1]}); deleteTime({delState, id:index+1}); toggleModInput();}}
                    >
                    
                    </button>
                </div>
            ))}
        </div>
    </div>
);

}

export default Timetask;