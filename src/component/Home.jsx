import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Post from './Post';
import { useQuery } from '@tanstack/react-query';
import { BiLoader } from 'react-icons/bi';
import Loader from './loader';
import Createpost from './Createpost/Createpost';
import { Link } from 'react-router-dom';
import getFollowers from '../utils/getFollowers';
import { Avatar } from '@heroui/react';
import putFollow from '../utils/putFollow';


export default function Home() {
 

  async function getAllpost(){
      
       return axios.request({
              method:'GET',
              params:{sort:'-createdAt'},
              url:'https://route-posts.routemisr.com/posts',
              headers:{
                  Token :localStorage.getItem('token')
              }  }) 
      }

   const {data,isError ,isLoading ,error}  = useQuery({
    queryKey:['getAllPost'],
    queryFn:getAllpost,
  })

     const {mutate}=putFollow()
 

       const  {data:dataFollowers} =getFollowers()
       console.log('followers',dataFollowers?.data?.data.suggestions);
       const followers=dataFollowers?.data?.data.suggestions || []
       
  
  if (isError){
    return <> <h4> {error.message } </h4> </>
  }

  if(isLoading){
    return <div className=' flex justify-between items-center'>  <Loader/> </div>
  }

  return (
    <div className='p-5 md:grid  md:grid-cols-12'>
 
 <div className=' md:col-span-3 '> 
    <ul className=' flex flex-col gap-2 shadow-sm bg-white rounded-lg p-2'>
    
      <Link className=' text-gray-500 font-bold hover:bg-blue-400 rounded-lg p-1 hover:text-white'>Feed</Link>
      <Link className=' text-gray-500 font-bold hover:bg-blue-400 rounded-lg p-1 hover:text-white'>My Posts</Link>
      <Link className=' text-gray-500 font-bold hover:bg-blue-400 rounded-lg p-1 hover:text-white'> Community</Link>
      <Link to={`/saved`} className=' text-gray-500 font-bold hover:bg-blue-400 rounded-lg p-1 hover:text-white'> Saved</Link>
    </ul>
   </div>
 <div className='md:col-span-6 '> 
    <Createpost/>
     {data?.data?.data.posts.map((post)=> (<>
      <Post key={post._id} post={post} isPostDetails={false} />
     </>) )}
  </div>

   <div className='md:col-span-3 shadow rounded-sm h-fit'>

   {/* {dataFollowers?.data?.data.suggestions.map((item))} */}

    {/* <div className=' flex items-center shadow-sm rounded-lg justify-between mx-5 px-3 py-1'>
      <div>
        <h4 className=' mb-2'>usernsme</h4>
          <button className='bg-blue-400 px-2 py-1 rounded-sm'>follow</button>
      </div>
      <Avatar size="lg" isBordered src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </div> */}
     
    <div className=' flex flex-col gap-5 py-3 '>
       {followers.map((item)=>{
      return(<>
       <div key={item._id} className=' flex items-center  rounded-lg justify-between mx-2 px-4 py-1'>
      <div>
        <h4 className=' mb-2 text-sm text-gray-500'>{item.username}</h4>
          <button
           onClick={()=>mutate(item._id)} 
           className='bg-pink-800 text-white px-3 py-1 rounded-sm cursor-pointer'>
            follow</button>
      </div>
      <Avatar size="lg" isBordered src={item.photo} />
    </div> 
      </>)
     })}
    </div>
      
     
   </div>

    </div>
  )
}



