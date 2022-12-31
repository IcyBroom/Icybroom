
// import React from 'react';
"use client"
import Image from 'next/image'
import icybroom from './icybroom.png'
import Link from 'next/link'
// import { Avatar } from '@mantine/core';
// import { useRouter } from 'next/navigation'
import {UserAuth} from './context/AuthContext'
import { useState } from 'react'


const pages = [
    {
        text: 'Home',
        path: '/'
    },
    {
        text: 'Games',
        path: '/games'
    },
    {
        text: 'Superchat',
        path: '/superchat'
    }
]
// const footerLinks = [
//     {
//         name: 'Twitter',
//         link: 'https://twitter.com/',
//         image: twitterIcon
//     },
//     {
//         name: 'Gmail',
//         link: 'https://gmail.com/',
//         image: googleIcon
//     },
//     {
//         name: 'Discord',
//         link: 'https://discord.com/',
//         image: discordIcon
//     },

// ]

export default function Navbar() {

    // const [drawerOpen, setDrawerOpen] = React.useState(false);
    // const router = useRouter()
    const {user, logOut} = UserAuth()
    const handleSignOut = async () =>{
        try{
            await logOut();
    } catch(err){
            console.log(err)
        }
    }
    
    let [visible,setVisible] = useState(false);
    let styles
    if(visible) {styles = ""}
    else { styles = "hidden"}
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
            <Link href="/" className="flex items-center">
                <Image priority = {true} src={icybroom} className="h-12 w-12 mr-3 " alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Icybroom</span>
            </Link>
            <button onClick = {()=>{setVisible(!visible)}} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
                <div className= {styles +" w-full md:w-auto md:flex"}  id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 mr-10  border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {pages.map((page, index) => {
                            return (
                                <li key = {index}>
                                    <Link href={page.path} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{page.text}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <Link href = {user ? "/profile" : "/login"}>
                        {/* <Avatar className = "mt-3 bg-red" radius = "xl" size = {30}  src={user ? user.photoURL : null} alt="no image here" /> */}
                        {(user && user.photoURL) ? 
                        <Image alt = "this failed to load" src = {user.photoURL } className = "mt-2 w-8 h-8 rounded-full" width = {60} height = {60}/>
                        :<svg className="text-white w-8 h-8 mt-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                        } {/* <svg className="w-6 h-6 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                    </Link>
                </div>
            </div>
        </nav>
    )
}