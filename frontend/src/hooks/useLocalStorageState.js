import {useState,useEffect} from "react";

const useLocalStorageState=(key,initialValue=null)=>{
    const [state,setState]=useState(()=>{
        let value=(window.localStorage.getItem(key) || initialValue);
        console.log(value)
        return value;
    })
    useEffect(()=>{
        window.localStorage.setItem(key,state)
    },[key,state])
    return [state,setState]
}
export default useLocalStorageState;