import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

export default function usePutBookMark(id) {
 
    function putMarks(){
        return axios.request({
            method:'put',
            url:`https://route-posts.routemisr.com/posts/${id}/bookmark`,
            headers:{
                Token: localStorage.getItem('token')
            }
        })
    }
    
   return useMutation({
        mutationFn:putMarks,
        mutationKey:['putmarks'],
        onSuccess:()=>{
            toast.success('add Bookmark successfuly ')
        }
    })


}
