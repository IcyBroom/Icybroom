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

  import {UserAuth} from '../../context/AuthContext'

export default function Form() {
    const {user} = UserAuth()
    const [title, setTitle] = useState("");
    const [date,setDate] = useState("");
    const [message, setMessage] = useState("")
    const [titleImage, setTitleImage] = useState(null);
    const [blogImages, setBlogImages] = useState([]);


    async function saveMessage(e) {
        e.preventDefault(); 
        let imageUrls =  await saveImage(titleImage,"Title")
        for (let i = 0; i < blogImages.length; i++) {
          let imageUrl = await saveImage(blogImages[i],i+1)
          imageUrls = {...imageUrls,...imageUrl}
        }
        // Add a new message entry to the Firebase database.
        try {
          await addDoc(collection(getFirestore(), 'blogPosts'), {
            ...imageUrls,
            titleImage:titleImage,
            name: user.displayName,
            text: message,
            profilePicUrl: user.photoURL,
            timestamp: serverTimestamp(),
            date: date,
            title: title,
            uid: user.uid
          });
        }
        catch(error) {
          console.error('Error writing new message to Firebase Database', error);
        }
        setTitle('');
        setDate('');
        setMessage('');
        setTitleImage(null);
        setBlogImages([]);
        
      }
    let [blogImageForms,setBlogImageForms] = useState([<input key = {0} className = "w-56 max-w-4xl border mb-4 h-9 m-auto" onChange={(e)=>{setBlogImages(blogImages.concat(e.currentTarget.value))}} type = "file" placeholder = "Title Image" />])
    let addBlogImage = () => {
      console.log(blogImageForms)
      setBlogImageForms(blogImageForms.concat(<input key = {blogImageForms.length} className = "w-56 max-w-4xl border mb-4  h-9 m-auto" onChange={(e)=>{setBlogImages(blogImages.concat(e.currentTarget.value))}} type = "file" placeholder = "Title Image" />))
    }

    async function saveImage(file,key) {
      try {
        // 1 - We add a message with a loading icon that will get updated with the shared image.
        
    console.log(user)
    console.log(user.displayName)
        
        // 2 - Upload the image to Cloud Storage.
        const filePath = `${user.uid}/${title}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        
        // 3 - Generate a public URL for the file.
        const publicImageUrl = await getDownloadURL(newImageRef);
    
        // 4 - Update the chat message placeholder with the image's URL.
        let imageUrl = "imageUrl" + key
        let storageUri = "storageUri" + key
        let imageUrls = {}
        imageUrls[imageUrl] = publicImageUrl
        imageUrls[storageUri] = fileSnapshot.metadata.fullPath

        return  imageUrls
      } catch (error) {
        console.error('There was an error uploading a file to Cloud Storage:', error);
      }
  }
    
    return (
        <div className="text-center mt-5 ">
            <h1>Form:</h1>
            <form className = "m-auto flex flex-col" onSubmit={saveMessage}>
                {/* take in an image file */}
                <div className = "mt-5">
                  <span className = "mr-3">Title Image:</span>
                  <input className = "w-56 max-w-4xl border h-9 m-auto" onChange={(e)=>{setTitleImage(e.currentTarget.value)}} type = "file" placeholder = "Title Image"></input>
                </div>
                <div className = "flex m-auto">
                <span className = " h-10 mt-5 w-24">Blog Images:</span>
                <div className = "mt-5 border-2 m-auto w-60 border-black mb-4 rounded-lg" >
                  
                  
                  {blogImageForms}
                  <div onClick = {addBlogImage} className = "cursor-pointer text-blue-600  hover:text-red-400" > Add another Blog Image:</div>
                </div>
                </div>
                
                <input className = " w-64 border-2 border-black rounded-lg mb-4 h-9 m-auto" onChange={(e)=>{setTitle(e.currentTarget.value)}} type = "text" placeholder = "Title"></input>
                <input className = "w-64 border-2 border-black rounded-lg mb-4 h-9 m-auto" onChange={(e)=>{setDate(e.currentTarget.value)}} type = "text" placeholder = "Date"></input>
                <textarea className = "w-8/12 m-auto p-3 max-w-4xl border-2 border-black rounded-lg h-24" onChange={(e)=>{setMessage(e.currentTarget.value)}} type = "text" placeholder = "Blog Post"></textarea>
                <input className = "mt-5 m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" type = 'submit' disabled = {!title|| !date || !message} value = "Submit" />
            </form>
        </div>
    )
}
