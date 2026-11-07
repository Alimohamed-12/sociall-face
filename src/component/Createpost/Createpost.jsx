import { Avatar } from '@heroui/react'
import React, { useRef, useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaImage } from "react-icons/fa";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Createpost() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [uploading, setuploading] = useState(false)

    const textInpiut = useRef(null)
    const imageInput = useRef(null)

    const query = useQueryClient()

    function handleRrmovImge() {
        setuploading(null)
        imageInput.current.value = ''
    }

    function preperData() {
        const formData = new FormData()

        if (textInpiut.current.value) {
            formData.append('body', textInpiut.current.value)
        }

        if (imageInput.current.files[0]) {
            formData.append('image', imageInput.current.files[0])
        }

        return formData
    }

    function creatPost() {
        return axios.request({
            method: 'post',
            url: 'https://route-posts.routemisr.com/posts',
            data: preperData(),
            headers: {
                Token: localStorage.getItem('token')
            }
        })
    }

    const { isPending, mutate: createpost } = useMutation({
        mutationFn: creatPost,
        onSuccess: () => {
            setuploading(false)
            toast('post is created')
            query.invalidateQueries({
                queryKey: ['getAllPost'],
            })
            textInpiut.current.value = ''
            imageInput.current.files[0] = ''

        },
        onError: () => {
            console.log('in error');

        }
    })

    function handleImagePreview(e) {
        const path = URL.createObjectURL(e.target.files[0])
        setuploading(path)
    }

    //  function getLikesPost(){
    //      const postId='698f2c2ac2767af7f1aff4f6'
    //     return axios.request({
    //         method:'get',
    //         url:`https://route-posts.routemisr.com/posts/:${postId}/likes?page=1&limit=20`,
    //         headers:{
    //             Token: localStorage.getItem('token')
    //         }
    //     })
    //  }
   



    return (
        <div className='max-w-125 mx-auto mb-6 rounded-sm p-2 shadow-sm   bg-white '>
            <div className=' flex gap-3 items-center'>
                <Avatar size="sm" isBordered src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <input onClick={onOpen} type="text" className=' w-full p-2 bg-slate-200 rounded-sm' placeholder='What do you think ?' />
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-secondary">Create Your Post</ModalHeader>
                            <ModalBody>
                                {/* text */}
                                <textarea ref={textInpiut} rows={2} className=' bg-slate-200 rounded-sm p-2 text-secondary-400' placeholder=' Create Post'></textarea>

                                {uploading && <div className=' relative'>
                                    <img
                                        alt="Woman listing to music"

                                        className='h-40 rounded-sm w-full'
                                        src={uploading}
                                    />
                                    <IoCloseCircle onClick={handleRrmovImge} size={20} className=' cursor-pointer absolute top-2.5 right-2.5 bg-white text-dark rounded-2xl' />
                                </div>}
                            </ModalBody>
                            <ModalFooter className=' items-center'>
                                <label >
                                    <FaImage size={30} className=' cursor-pointer' />
                                    <input ref={imageInput} type="file" hidden onChange={handleImagePreview} />
                                </label>

                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <button color="primary" onClick={function () {
                                    onClose(),
                                        createpost()
                                }} >
                                    Create
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

