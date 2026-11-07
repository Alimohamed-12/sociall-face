import axios from 'axios'
import {React } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function getFollowers() {


    function getFollow(){
        return axios.request({
            method:'GET',
            url:`https://route-posts.routemisr.com/users/suggestions?limit=10`,
            headers:{
                Token:localStorage.getItem('token')
            }
        })
    }

  return useQuery({
        queryKey:['getFoloowers'],
        queryFn:getFollow
    })


}
