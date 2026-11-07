
import { Image } from '@heroui/react'
import axios from 'axios'
import React from 'react'
import { MdDelete } from "react-icons/md";
import {useMutation} from '@tanstack/react-query'
import { toast } from 'react-toastify';
export default function CommentReply({item,postId}) {
    const  {commentCreator,content,_id:idComment}=item
         const {name,photo}=commentCreator

         
    function deletePost(){
       return axios.request({
        method:'DELETE',
        url:`https://route-posts.routemisr.com/posts/${postId}/comments/${idComment}`,
        headers:{
          Token : localStorage.getItem('token')
        }
       })
    }

         const {mutate:deleteItem} =useMutation({
          mutationKey:['handleDeletePost'],
          mutationFn:deletePost,
          onSuccess:()=>{
            toast.success('delete Comment')
          }
         })

    
  return (    
<div className="flex justify-between items-center mt-3 px-12">

 <div className='flex'>

   <img
    src={photo}
    alt={name}
    className="w-10 h-10 rounded-full"
  />

  <div className="px-3 py-2 flex  rounded">
    <h3 className=' text-sm'>{name}</h3>
    <p className="text-3xl">
     {content}
  </p>
  </div>

 </div>

   <button >
    <MdDelete className=' cursor-pointer' onClick={deleteItem} size={34} />
  </button>
</div>
    
  )
}
