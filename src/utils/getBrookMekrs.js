import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function getBrookMekrs() {
  
  function getMekkers(){
    return axios.request({
        method:'GET',
        url:'https://route-posts.routemisr.com/users/bookmarks',
        headers:{
            Token: localStorage.getItem('token')
        }
    })
  }

   return useQuery({
    queryKey:['getMyBookmarks'],
    queryFn:getMekkers,
  })

}
