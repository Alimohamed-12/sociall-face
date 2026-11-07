import { form, Input } from '@heroui/react'
import axios from 'axios';
import { div } from 'framer-motion/client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { FaMessage } from "react-icons/fa6";
import { data } from 'react-router-dom';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LuLoaderCircle } from "react-icons/lu";
import { FaImage } from "react-icons/fa";
export default function CreationComment({id ,queryKey}) {


const formData= new FormData()

    function createComment(){
        return  axios.request({
            method:'POST',
            url:`https://route-posts.routemisr.com/posts/${id}/comments`,
            headers:{
                Token: localStorage.getItem('token')
            },
            data:formData
            
        })
    }
  
    const {register ,handleSubmit , reset} = useForm({ 
        defaultValues:{
            content:'',
            image:''
}})

    const queryClient = useQueryClient()

  const {data , isPending , mutate }=useMutation({
    mutationFn:createComment,
    onSuccess:()=>{
     queryClient.invalidateQueries({queryKey})
       toast('commeent is created',{
     position:'top-center'
       })
       reset()
    },
    onError:()=>{
        toast('in error')
    }
  })

 function handleCreateComment(values){
  
   if (!values.content && !values.image[0]) return null

   if(values.content){
      formData.append('content',values.content)
   }

   if(values.image[0]){
      formData.append('image',values.image[0])
   }
  
   mutate()

 }
     
  return (
       <>
      <form onSubmit={handleSubmit(handleCreateComment)} >
          <div className='flex justify-between items-center px-2'>
            <Input
          {...register('content')}
        className=' bg-transparent'
          // endContent={
        
          // }
          labelPlacement="outside"
          placeholder="Write a Comment ..."
          type="text"
        />
        <label className=' cursor-pointer  mx-auto my-2 col-span-1' >
        <FaImage size={27} />
         <input {...register('image')} hidden  type="file" />
        </label>
         <button className='text-fuchsia-600 cursor-pointer text-xs rounded-sm p-2  '>
         Comment
        </button>
          </div>
      </form>
       </>     
  )
}

