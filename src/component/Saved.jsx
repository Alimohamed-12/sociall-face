import React from 'react'
import getBrookMekrs from '../utils/getBrookMekrs'
import Post from './Post'

export default function Saved() {

   const {data } =getBrookMekrs()

   console.log(data?.data?.bookmarks,'data in seved');
   

  return (
    
    <div>
        
      {data?.data?.data?.bookmarks?.map((item)=>{
        return (<div key={item.id}>
           <Post post={item} />
         
        </div>)
      })}
    </div>
  )
}
