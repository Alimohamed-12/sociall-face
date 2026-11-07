import { Avatar } from '@heroui/react'
import React from 'react'
import getMyProfile from '../utils/getMyProfile'
import getUserPosts from '../utils/getUserPosts'
import Post from './Post'
import Createpost from './Createpost/Createpost'

export default function Profile() {

        const { data } = getMyProfile()
          const {data:myPosts} =getUserPosts()
     

       const countPosts=myPosts?.data?.data.posts.length
          



  return (
    <div className=' max-w-125 mx-auto mt-5' >
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <div className="h-32 bg-blue-200"></div>

        <div className="relative px-4">
          <Avatar
            className="w-20 h-20 absolute -top-10"
            isBordered
            src={data?.data?.data.user.photo
}
          />
        </div>

        <div className="pt-12 px-4 pb-4">
          <h2 className="font-semibold">{data?.data?.data.user.username}</h2>
          <h2 className="font-semibold text-gray-400 text-sm">{data?.data?.data.user.name}</h2>


          <div className=' flex items-center mt-4'>

             <div className=' text-center'>
             <h3 >posts</h3>
             <p className=' text-gray-500'>{countPosts}</p>
           </div>

            <div className=' mx-2 text-center'>
              <h3>followers</h3>
              <h2 className="font-semibold text-gray-500">{data?.data?.data.user.followersCount}</h2>
            </div>

            <div className=' text-center'>
              <h3>following</h3>
              <p className=" text-gray-500">{data?.data?.data.user.followingCount}</p>
            </div>

          

          </div>
        </div>
      </div>

        <div className=' my-9'>
           <Createpost/>
        </div>
        {myPosts?.data?.data.posts.map((post)=> {
   
           return(<>
             <div key={post.id} >
                 <Post post={post}/> 
             </div>
           </>)
        })}

    </div>
  )
}
