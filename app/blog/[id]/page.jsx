"use client"
import Link from 'next/link'
import Image from 'next/image'
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
    where,
    getDoc
  } from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from 'firebase/storage';
  import { useEffect, useState} from 'react'

export default function Page({ params, searchParams }) {
  // const dofRef = doc(getFirestore(), "blogPosts", params.id);
  const [post, setPost] = useState(null)
  useEffect( () =>{
    const q = query(collection(getFirestore(), "blogPosts"),  orderBy('timestamp', 'desc'));
      onSnapshot(q, function(snapshot) {
          setPost(snapshot.docs.map((doc) => { 
            if (doc.data().postNumber == params.id) {
              console.log(doc.data(), 5)
              return doc.data(); 
            }
            console.log(post, 6)
              
              // return <BlogCard postNumber = {post.postNumber} title = {post.title} date={post.date} summary = {post.summary} titleImage = {post.imageUrlTitle} key = {doc.id} timestamp = {post.timestamp} name = {post.name} profilePicUrl = {post.profilePicUrl} /> 
          }));
          // setPost(post[0])
      });
  },[])
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // const blogRef = await setDoc(doc(getFirestore(), 'blogPosts',  "Post "+postNumber), {
    //   name: user.displayName,
    //   text: message,
    //   profilePicUrl: user.photoURL,
    //   timestamp: serverTimestamp(),
    //   date: date,
    //   title: title,
    //   uid: user.uid,
    //   summary: summary,
    //   postNumber: postNumber,
    //  blogImages: blogImages,
    // });
    if (post){
      let data = post[0]
      return  (
        <div>
          <div className ="text-center">
            <h1 className = "font-bold text-6xl">{data.title}</h1>
            <p className = "text-gray-500 text-lg">{data.summary}</p>
            <p>{data.date}</p>
            <div className = "flex m-auto w-20">By: <Image className = " ml-3 rounded-full " src = {data.profilePicUrl} width = {33} height = {33}></Image> </div>
            <p className = "mt-6  m-auto w-8/12 text-lg">{data.text}</p>
            </div>
        </div>)
    }
    return  (
    <div>
      <h1>This page does not exist</h1>
    </div>)
}