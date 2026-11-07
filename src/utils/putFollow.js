import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

export default function putFollow() {
  
    function userFollowers(id){
        return axios.request({
            method:'put',
            url:`https://route-posts.routemisr.com/users/${id}/follow`,
            headers:{
                Token: localStorage.getItem('token')
            }
        })
    }

   return useMutation({
        mutationKey:['putFollowers'],
        mutationFn:userFollowers ,
        onSuccess:()=>{
            toast.success('follow done successfully')
        }
    })
}
