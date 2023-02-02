"use client"
import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import React from 'react'
import { useState } from 'react'
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
  //  setDoc,
    updateDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from 'firebase/storage';



export default function Form() {
    const [title, setTitle] = useState("");
    const [date,setDate] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    async function saveMessage(e) {
        e.preventDefault(); 
        
        // Add a new message entry to the Firebase database.
        try {
          await addDoc(collection(getFirestore(), 'blogPosts'), {
            name: user.current.displayName,
            text: formValue,
            profilePicUrl: user.current.photoURL,
            timestamp: serverTimestamp(),
            uid: user.current.uid
          });
        }
        catch(error) {
          console.error('Error writing new message to Firebase Database', error);
        }
        setTitle('');
        setDate('');
        setMessage('');
        
      }

    return (
        <div className="text-center mt-5 ">
            <h1>Form:</h1>
            <form className = "m-auto flex flex-col" onSubmit={saveMessage}>
                <input className = " w-96 border-2 border-black rounded-lg mb-4 h-9 m-auto" onChange={(e)=>{setTitle(e.currentTarget.value)}} type = "text" placeholder = "Title"></input>
                <input className = "w-96 border-2 border-black rounded-lg mb-4 h-9 m-auto" onChange={(e)=>{setDate(e.currentTarget.value)}} type = "text" placeholder = "Date"></input>
                <textarea className = "w-8/12 m-auto p-3 max-w-4xl border-2 border-black rounded-lg h-24" onChange={(e)=>{setMessage(e.currentTarget.value)}} type = "text" placeholder = "Blog Post"></textarea>
                <input className = "mt-5 m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" type = 'submit' disabled = {!title|| !date || !message} value = "Submit" />
            </form>
        </div>
    )
}
