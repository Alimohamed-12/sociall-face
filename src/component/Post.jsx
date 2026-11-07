import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import Comment from './Comment';
import { Link, Links } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from './loader';
import CreationComment from './CreationComment';
import { HiDotsVertical } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { authContext } from './createContext/AuthContext';
import { toast } from 'react-toastify';
import { FaImage } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { FaHeart } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import usePutBookMark from './putBookMark';
export default function Post({ post, isPostDetails = false }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isshare,
    onOpen: openshare,
    onOpenChange: changeshare,
  } = useDisclosure();
  const { userId } = useContext(authContext)
  const query = useQueryClient()
  const [uplloading, setuplloading] = useState()
  const inputText = useRef(null)
  const imgInput = useRef(null)
  const [commentlogged, setcommentlogged] = useState(false)
  const refShare = useRef(null)
  const [isLiked, setIsLiked] = useState(false);


  if (!post) return null;
  const { user, body, createdAt, topComment, image, _id: id } = post
  const iduser = user._id


  useEffect(() => {
    setuplloading(image)
  }, [])


  function getAllcomments() {
    return axios.request({
      method: 'GET',
      url: `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
      headers: {
        Token: localStorage.getItem('token')
      }

    })
  }


  const { data: allComents, isError, isLoading, error } = useQuery({
    queryKey: ['getallcomments', id],
    queryFn: getAllcomments,
    // enabled: isPostDetails
  })


  function getLikesPost() {
    return axios.request({
      method: 'GET',
      url: `https://route-posts.routemisr.com/posts/${id}/likes?page=1&limit=20`,
      headers: {
        Token: localStorage.getItem('token')
      }
    })
  }

  const { data: getAllLikes } = useQuery({
    queryKey: ['getLikesPost', id],
    queryFn: getLikesPost
  })

  function handleRemove() {
    setuplloading(null)
    if (imgInput.current) {
      imgInput.current.value = '';
    }
  }


  function preperData() {
    const formData = new FormData()

    if (inputText.current.value) {
      formData.append('body', inputText.current.value)
    }

    if (imgInput.current.files[0]) {
      formData.append('image', imgInput.current.files[0])
    }

    return formData
  }

  function handleImagePreview(e) {
    const path = URL.createObjectURL(e.target.files[0])
    setuplloading(path)
  }

  function deletePost() {
    return axios.request({
      method: 'DELETE',
      url: `https://route-posts.routemisr.com/posts/${id}`,
      headers: {
        Token: localStorage.getItem('token')
      }
    })
  }

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success('delete post successfully')
      query.invalidateQueries({ queryKey: ["getAllPost"] })

    }
  })


  function handleUpdatePost() {
    return axios.request({
      method: 'PUT',
      url: `https://route-posts.routemisr.com/posts/${id}`,
      data: preperData(),
      headers: {
        Token: localStorage.getItem('token')
      }
    })
  }

  const { mutate: updatePost } = useMutation({
    mutationFn: handleUpdatePost,
    onSuccess: () => {
      toast.success(' update post successfully')
      query.invalidateQueries({ queryKey: ["getAllPost"] })
    }
  })


  // const shareBody={
  //   "body":refShare.current.value
  // }

  function sharePost() {
    return axios.request({
      url: `https://route-posts.routemisr.com/posts/${id}/share`,
      method: 'POST',
      headers: {
        Token: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: {
        "body": refShare.current.value
      }
    })
  }

  const { mutate: handleShare } = useMutation({
    mutationKey: ['sharedPost', id],
    mutationFn: sharePost,
    onSuccess: () => {
      toast.success('shared post Successfully')
      query.invalidateQueries({
        queryKey: ['getAllPost']
      })
    }
  })

  function addLikes() {
    
    return axios.request({
      method: 'Put',
      url: `https://route-posts.routemisr.com/posts/${id}/like`,
      headers: {
        Token: localStorage.getItem('token'),
        
        
      }

    })
  }
  const { mutate: adlike } = useMutation({
    mutationFn: addLikes,
    mutationKey: ['addlike', id],
    onSuccess: () => {
       query.invalidateQueries({queryKey:['getLikesPost']})
      setIsLiked(!isLiked)
      // toast.success('add like successfuly')
     
    },
    onError: () => {
      toast.error('error in add like')


    }
  })
    
    const  {mutate:putMark} =usePutBookMark(id)

  if (isLoading) {
    return <> <Loader /> </>
  }
  const countComments = allComents?.data?.data?.comments.length
  const countLikes = getAllLikes?.data?.data.likes.length


  if (!body && !image) return null;
  return (
    <div >
      <Card className=' max-w-125 mx-auto mb-6 ' >
        <CardHeader className="flex gap-3 justify-between ">
          <div className=' flex gap-3'>
            <Image
              alt={`${body}`}
              height={40}
              radius="sm"
              src={user.photo}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{user?.name}</p>
              <p className="text-small text-default-500">{createdAt}</p>
            </div>
          </div>

          {userId === iduser && (<Dropdown>
            <DropdownTrigger>
              {/* <Button variant="bordered">Open Menu</Button> */}
              <HiDotsVertical className=' cursor-pointer' />
            </DropdownTrigger>
            <DropdownMenu aria-label="Action event example" >
              <DropdownItem key="new" onClick={onOpen} > <div className=' flex justify-between items-center '>
                Update <FaPen /></div> </DropdownItem>
              <DropdownItem onPress={() => mutate()} key="delete" className="text-danger" color="danger">
                <div className=' flex justify-between items-center '>
                  Delete <FaPen /></div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>)}


          {/*  */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <textarea
                      ref={inputText}
                      defaultValue={body}
                      rows={2}
                      className='bg-slate-200 rounded-sm p-2 text-secondary-400'
                      placeholder='Create Post'
                    />
                    {uplloading && <div className=' relative '>
                      <img className='w-full h-62' src={uplloading} alt={body} />
                      <IoIosCloseCircle onClick={() => handleRemove()} size={33} className=' absolute top-3 right-3 z-10 text-white bg-black rounded-full ' />
                    </div>}
                  </ModalBody>
                  <ModalFooter className=' flex items-center'>
                    <label>
                      <FaImage className=' cursor-pointer' />
                      <input ref={imgInput} onChange={handleImagePreview} type="file" hidden />
                    </label>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={function () {
                      updatePost(),
                        onClose()
                    }}>
                      Edit
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {/*  */}
        </CardHeader>
        <Divider className=' opacity-40' />
        <CardBody >

          {body && <p className=' py-2'>{body}</p>}
          {image && <img className=' h-55' src={image} alt={body} />}
        </CardBody>

        <div className=' flex justify-between items-center ms-3'>
          <div className=' flex ' >
            <FaHeart size={25} className='bg-red-500 text-amber-50 rounded-full p-1 '    /> <span className=' ms-1'>{countLikes}</span></div>
          <div className=' flex items-center'>
            <div className=' text-gray-400 text-xs '> <span>{countComments}</span> comments</div>
            <div className='text-gray-400 text-xs mx-3'> <span>0</span> shares</div>
          </div>
        </div>

        <Divider className=' opacity-40 my-1' />

        <CardFooter className=' flex justify-between items-center'>
          <div   className={`flex items-center cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500"}`} onClick={() => adlike()}>  <FaHeart className=' me-2' /> likes </div >
          <div className=' text-gray-500' > <Link className=' flex items-center' ><FaComments /> <span onClick={() => setcommentlogged(!commentlogged)} className=' ms-1' >Comments</span></Link> </div>
          <div className=' text-gray-500 flex items-center cursor-pointer' onClick={openshare}><CiShare2 /> <span className=' ms-1'>Share</span></div>
          <div className=' text-gray-500 flex items-center cursor-pointer' onClick={putMark}> <BsBookmark size={15} className=' mx-1' /> Save </div>
        </CardFooter>

        {/* modelshare */}

        <Modal isOpen={isshare} onOpenChange={changeshare}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Share Post</ModalHeader>
                <ModalBody>
                  <Card className=' shadow-xs'>
                    <CardHeader>
                      <div className=' flex items-center gap-3'>
                        <Image
                          alt={`${body}`}
                          height={40}
                          radius="sm"
                          src={user.photo}
                          width={40}
                        />

                        <p className="text-md  font-medium">{user?.name}</p>
                      </div>
                    </CardHeader>

                    <CardBody >
                      {body && <p >{body}</p>}
                      {image && <img className=' h-25 rounded-sm' src={image} alt={body} />}
                    </CardBody>
                  </Card>
                  <textarea ref={refShare} rows={3} placeholder='say something about this post'
                    className=' border-0 focus:outline-0 p-2 py-3  placeholder:text-gray-500'></textarea>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    cancle
                  </Button>
                  <Button color="primary" onPress={function () {
                    handleShare()
                    onClose()
                  }}>
                    share
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* modelshare */}
        {/* <CreationComment queryKey={isPostDetails ? ['getallcomments'] : ['getAllPost']} id={id} /> */}
        {commentlogged && (<>
          <CreationComment queryKey={isPostDetails ? ['getallcomments'] : ['getAllPost']} id={id} />
          {/* {isPostDetails == false && topComment  && (<Comment topComment={topComment} />)} */}
          {isPostDetails === false ?
            (topComment ?
              (<><Comment id={id} topComment={topComment} />
                <Link
                  className='my-3 text-center text-xs hover:underline text-purple-700 flex justify-center items-center '
                  to={`/postdetails/${id}`}><span className='me-1 inline-block'>See all comments</span> <FaLongArrowAltRight size={10} /></Link></>) : (<h3 className='text-center text-xs text-gray-400 p-5'>No comments yet. Be the first!</h3>))
            : null
          }
        </>)}

        {isPostDetails && allComents?.data?.data?.comments.map((comment) => <Comment id={id} topComment={comment} />)}

      </Card>
    </div>
  )
}








// <div className=' text-gray-500' > <Link className=' flex items-center' to={`/postdetails/${id}`} ><FaComments /> <span onClick={()=>setcommentlogged(true)} className=' ms-1' >Comments</span></Link> </div>



