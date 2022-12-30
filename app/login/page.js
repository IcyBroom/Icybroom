"use client"
import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
// import Router from 'next/router';
// import { useRouter } from 'next/router'


export default function Login(){
  const { googleSignIn, user } = UserAuth();
  
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  // let router = useRouter()
  // useEffect(() => {
  //   if (user != null) {
  //       router.push('/')
  //   }
  // }, [user]);

  return (
    <div className = "m-auto mt-9 w-40 h-32 border-4" >
        <h3 className= 'text-center mb-5'> Login </h3>
        <button className = 'm-auto' onClick={handleGoogleSignIn}> Google</button>
    </div>
  );
};
