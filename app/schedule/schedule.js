"use client"
import data from './schedules.json';
//import state hook
import { useEffect, useState } from 'react';


export default function Schedule() {
    const getScheduleDay = () =>{
        const date = new Date()
        const weekDay = date.getDay()
        //if weekday is thursday then return Thursday else return normal
        if(weekDay === 4){
            return "Thursday"
        }else{
            return "Normal"
        }
    } 
    const [scheduleDay, setDay] = useState(getScheduleDay())
    const [time , setTime] = useState("12:00:00 AM")
    useEffect(() => {

        setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => {
            clearInterval()
        }
    }, [])
    const toggleDay = () =>{
        if(scheduleDay === "Normal"){
            setDay("Thursday")
        }else{
            setDay("Normal")
        }
    }
    const timeRemaining = (startingTime, endingTime, isConservative) => {
        //find the differenct between time and ending time, use the time in the state and account for the AM and PM
        //if the time is after or equal to the ending time then return "Done"
        //if the time is before the ending time then return the time remaining
        //return the time remaining in minutes, if it's less than 1 minute than return the seconds remaining
        //if the time is before the starting time, then return "Not Started"
        const SECONDS_IN_HOUR = 3600
        let timeArr = time.split(":")
        let endingTimeArr = endingTime.split(":")
        let startingTimeArr = startingTime.split(":")
        if(timeArr[2].includes("PM") && timeArr[0] != 12){
            timeArr[0] = parseInt(timeArr[0]) + 12

        } 
        if(timeArr[2].includes("AM") && timeArr[0] == 12){
            timeArr[0] = 0
        }
        if(endingTimeArr[2].includes("PM") && endingTimeArr[0] != 12){
            endingTimeArr[0] = parseInt(endingTimeArr[0]) + 12
        }
        if(endingTimeArr[2].includes("AM") && endingTimeArr[0] == 12){
            endingTimeArr[0] = 0
        }
        if(startingTimeArr[2].includes("PM") && startingTimeArr[0] != 12){
            startingTimeArr[0] = parseInt(startingTimeArr[0]) + 12
        }
        if(startingTimeArr[2].includes("AM") && startingTimeArr[0] == 12){
            startingTimeArr[0] = 0
        }
        let timeInSeconds = parseInt(timeArr[0])*3600 + parseInt(timeArr[1])*60 + parseInt(timeArr[2])
        let endingTimeInSeconds = parseInt(endingTimeArr[0])*3600 + parseInt(endingTimeArr[1])*60 + parseInt(endingTimeArr[2])
        let startingTimeInSeconds = parseInt(startingTimeArr[0])*3600 + parseInt(startingTimeArr[1])*60 + parseInt(startingTimeArr[2])
        if(timeInSeconds > endingTimeInSeconds){
            return "Done"
        }else if(timeInSeconds < startingTimeInSeconds && isConservative){
            return "Not Started"
        }else{
            let timeLeft = endingTimeInSeconds - timeInSeconds
            if(timeLeft < 60 && timeLeft > 0){
                return timeLeft + " Seconds"
            }else if (Math.abs(timeLeft) > SECONDS_IN_HOUR){
                let minutes = Math.abs(Math.floor((timeLeft%SECONDS_IN_HOUR)/60)) // get the minutes in the form of 2 digits (ex: 5 -> 05) and 0 -> 00
                if(minutes < 10) minutes = "0" + minutes
                return Math.floor(timeLeft/SECONDS_IN_HOUR) + ":" + minutes + " Hours"
            }
            else{
                return Math.floor(timeLeft/60) + " Minutes"
            }
        }

      }
        let periods = []
        let keyNumber = 0
        for (const period in data[scheduleDay]) {
            let arr = data[scheduleDay][period].split(" ")
            let timeLeft = timeRemaining(arr[0]+':00 '+arr[1],arr[3]+':00 '+arr[4], true)
            let totalTimeLeft = timeRemaining(arr[0]+':00 '+arr[1],arr[3]+':00 '+arr[4], false)
            let eachPeriod =
                    (<div key = {keyNumber++} className = " flex justify-between mb-2  pl-3 pr-3">
                        <div key = {keyNumber++} className = "">{period}</div>
                        <div key = {keyNumber++} className = "">{data[scheduleDay][period]}</div>
                        <div key = {keyNumber++} className = "">{totalTimeLeft}</div>
                    </div>)
            if(timeLeft === "Done"){periods.push(<div key = {keyNumber++} className = "pr-5 bg-green-300 rounded-md">{eachPeriod}</div>)}
            else if(timeLeft === "Not Started" ){periods.push(<div key = {keyNumber++} className = "bg-gray-400 rounded-md">{eachPeriod}</div>)}
            else{periods.push(<div key = {keyNumber++} className = "bg-yellow-200 rounded-md">{eachPeriod}</div>)}

            // console.log(arr[3]+':00 '+arr[4])
        }

    return (
        
        <div >
            
            <div  className = "bg-gray-200 p-5  rounded-lg max-w-2xl m-auto mt-20 text-xl">
                    <div className = "pt-0 text-center text-2xl mb-4">
                        ICCSD School Schedule
                    </div>
                <div className='flex justify-between'>
                    <div className = "flex justify-center">
                        {scheduleDay}
                        <label className=" ml-3 inline-flex relative items-center mb-4 cursor-pointer">
                            <input  type="checkbox" value="" className="sr-only peer" onChange = {toggleDay} checked = {scheduleDay == 'Thursday'}/>
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className = "mr-4"> Time: {time} </div>
                    <div className = "cursor-pointer">
                        Time Left: 
                    </div>
                </div>
                {periods}
            </div>
        </div>
    );
}