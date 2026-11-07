import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import Post from './Post';
import Loader from './loader';

export default function PostDetails() {
  
   const {id}=useParams()

   function PostDetail(){
     return  axios.request({
        method:'GET',
        url:`https://route-posts.routemisr.com/posts/${id}`,
        headers:{
            Token:localStorage.getItem('token')
        }
    }) 
   }

   const {data ,isLoading ,isError ,error}=useQuery({
  queryKey:['postdetails', id],
    queryFn:PostDetail,
})
   

  

if(isLoading){
  return <> <Loader/> </>
}


  return (
    <div>
         <Post post={data?.data?.data?.post} isPostDetails={true} /> 
    </div>
  )
}





