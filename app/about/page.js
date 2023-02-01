import React from 'react';
import Image from 'next/image'
import ayman from './ayman.jpg'

function Person(props){
    //take in name, description, and image
    return (
        <div className = "text-center mb-3 mt-5 border-solid border-2 rounded-lg w-72 m-auto pb-3 border-black">
            <h1 className = "text-2xl mb-4">{props.name}</h1>
            <Image className = "m-auto" src = {props.image} width = {200}></Image>
            {/* <p className = "text-xl">{props.description}</p> */}
        </div>
    )
}
export default function About(props){
    return (
        <div className = "text-center mt-9">
            <h1 className = "text-4xl mb-2">About</h1>
            <Person name = "Ayman Noreldaim" description = "This is a website that I made to learn about Programming websites. It's pretty cool" image = {ayman}></Person>
            <p className = "text-xl"> This is a website I made to learn more about programming in JavaScript. I used Next.js and TailwindCSS</p>
            <br />
            <p> I built a few small games, a chat app(retired), an authentication system, a server, and a time table to keep track of my high school bell schedule.</p>
            <br />
            <p className = "text-sm"> {""}</p>
        </div>
    )
}