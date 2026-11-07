import React, { useEffect, useRef, useState } from 'react'
import { CardHeader, Image } from "@heroui/react";
import { CiHeart } from "react-icons/ci";
import { FaReply } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import axios from 'axios';
import { useRaf } from 'react-use';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CommentReply from './commentReply';
export default function Comment({ topComment, id }) {

  const idComment = topComment._id
  const [reply, setreply] = useState(false)
  const textInputreply = useRef(null)
  const imgInput = useRef(null)
  const query = useQueryClient()
  console.log('topCommentid', topComment);


  function preperData() {
    const formData = new FormData()
    if (textInputreply.current.value) {
      formData.append('content', textInputreply.current.value)
    }

    if (imgInput.current.files[0]) {
      formData.append('image', imgInput.current.files[0])
    }

    return formData
  }

  function createReply() {
    return axios.request({
      method: 'post',
      url: `https://route-posts.routemisr.com/posts/${id}/comments/${idComment}/replies`,
      headers: {
        Token: localStorage.getItem('token')
      },
      data: preperData()
    })
  }

  const { mutate: createCommentReply } = useMutation({
    mutationKey: ['createCommentReply'],
    mutationFn: createReply,
    onSuccess: () => {
      toast.success('comment is created uccessfully')
      removeData()
      query.invalidateQueries({ queryKey: ['getAllCommentReply', idComment] })

    },
    onError: () => {
      toast.error('error in create coment')
    }
  })

  function removeData() {
    textInputreply.current.value = '',
      imgInput.current.value = ''
  }

  function getCommentsReply() {
    return axios.request({
      method: 'get',
      url: `https://route-posts.routemisr.com/posts/${id}/comments/${idComment}/replies?page=1&limit=10`,
      headers: {
        Token: localStorage.getItem('token')
      }
    })
  }

  const { data } = useQuery({
    queryKey: ['getAllCommentReply', idComment],
    queryFn: getCommentsReply
  })



  const replies = data?.data?.data.replies
  const countReplies=data?.data?.data.replies.length

  // function addLikeReply(){
  //   return axios.request({
  //     method:'put',
  //     url:`https://route-posts.routemisr.com/posts/${id}/comments/${idComment}/like`,
  //     headers:{
  //       Token:localStorage.getItem('token')
  //     }
  //   })
  // }
  
  //    const  {mutate} =useMutation({
  //       mutationKey:['likeReply',],
  //       mutationFn:addLikeReply
  //     })

  

  return (
    <div>
      {topComment && (
        <CardHeader className=' flex flex-col' >
          <div className='flex w-full  '>
            <Image
              alt={`${topComment?.content}`}
              height={40}
              radius="sm"
              src={topComment?.commentCreator?.photo}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{topComment?.commentCreator.name}</p>
              {topComment.content && <p className="text-small text-default-500">{topComment.content}</p>}
              {topComment.image && <img width={`50px`} height={`40px`} src={topComment.image} />}
            </div>
          </div>
          <div className=' w-full mt-2 ps-8 '>
            <div className='flex items-center gap-3'>
              <p> <CiHeart /></p>
              <p className='flex items-center text-gray-600 hover:text-fuchsia-600 cursor-pointer' onClick={() => setreply(!reply)}> <FaReply className='' /> <span className='mx-2 text-sm'>Reply</span> <span className=' text-xs'> {countReplies} </span></p>
            </div>
          </div>
          {reply && (<> <div className='mt-1 flex justify-between items-center w-full ps-12 '>
            <input ref={textInputreply} placeholder='write a comment...' className=' focus:outline-0 w-8/12 p-1 rounded-lg text-sm text-gray-500' type="text" />
            <label className=' cursor-pointer w-fit' >
              <FaImage color='gray' size={30} />
              <input ref={imgInput} type="file" hidden />
            </label>
            <button onClick={createCommentReply} className='cursor-pointer text-fuchsia-600 text-xs'>Reply</button>
          </div></>)}
          {/* 
    <commentReply /> */}

          {replies && (<div className=' w-full '>
            {replies.map((item) => <CommentReply postId={id} key={item._id} item={item} />)} </div>)}

        </CardHeader>
      )}

    </div>
  )
}

