import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext ,React} from 'react'
import { authContext } from '../component/createContext/AuthContext'
export default function getUserPosts() {
  const { userId } = useContext(authContext)

    function getMyPosts(){
        return axios.request({
         method:'GET',
         url:`https://route-posts.routemisr.com/users/${userId}/posts`,
         headers:{
            Token: localStorage.getItem('token')
         }
        })
    }

 return  useQuery({
        queryKey:['getPostsUer'],
        queryFn:getMyPosts
    })
}
