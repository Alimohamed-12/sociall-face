import axios from 'axios'
import React from 'react'
import {useQuery} from '@tanstack/react-query'

export default function getMyProfile() {
 

    function getData(){
        return axios.request({
            method:'GET',
            url:'https://route-posts.routemisr.com/users/profile-data',
            headers:{
                Token: localStorage.getItem('token')
            }
        })
    }

      
  return  useQuery({
        queryKey:['getDataUser'],
        queryFn:getData
    })
    
}
