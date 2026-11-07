import React, { useState } from 'react'
import { FaMessage } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaVenusMars } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { ImSpinner7 } from "react-icons/im";
import img from '../assets/alex.png'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [isloadin, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { handleSubmit, register, watch, formState: { errors, touchedFields } } = useForm({
    defaultValues: {
      "name": '',
      'username': '',
      "email": '',
      "password": "",
      "rePassword": "",
      "dateOfBirth": "",
      "gender": ""

    }
  }
  )


  async function handleRegister(values) {
    setIsLoading(true)
    try {
      const res = await axios.request({
        method: 'POST',
        url: 'https://route-posts.routemisr.com/users/signup',
        headers: {
          'Content-Type': 'application/json',
        },
        data: values
      })
      setIsLoading(false)
      console.log(res.data);

      if (res.data.success) {
        toast(res.data.message)
        // localStorage.setItem('token', res.data.data.token)
        navigate('/login')
      }

    }
    catch (e) {
      setIsLoading(false)
      console.log(e.response);
      console.log(e.response.data.errors);
      toast(e.response.data.errors)

    }


  }




  return (
    <div className='register grid lg:grid-cols-2 '>
      {/* socialHub */}


      <div className=' signup-hero text-white bg-cover bg-center min-h-screen flex flex-col p-10'>
        <div className='top-data'>
          <span className='bg-[#7da0f0]'>s</span>
          <span>SocialHub</span>
          <h1 className='text-5xl font-bold leading-[56px] '>Conncet width <br /> amazing people</h1>
          <p className='text-[16px] leading-[24px] my-3'>Join millions of users sharing moments, ideas, and building meaningful connections every day</p>
        </div>

        <div className='center-data grid lg:grid-cols-2 gap-4'>
          <div className='bg-[#5679E1] rounded-2xl hover:scale-105 duration-1000 flex items-center py-2 border border-white/30 px-4' >
            <span className='bg-[#4389d9] inline-block me-3  rounded-xl p-3  '><FaMessage className='text-[#7bf1a7]' /></span>
            <div>
              <h2>Real-time Chat</h2>
              <p>Instant messaging</p>
            </div>
          </div>
          <div className='bg-[#5679E1] rounded-2xl flex items-center py-2 border border-white/30 px-4' >
            <span className='bg-[#5480E8] inline-block me-3  rounded-xl p-3 '> <FaImage className='text-whie' /> </span>
            <div>
              <h2>Share Media</h2>
              <p>Photos & videos</p>
            </div>
          </div>
          <div className='bg-[#5679E1] rounded-2xl flex items-center py-2 border border-white/30 px-4' >
            <span className='bg-[#7A77D7] inline-block me-3  rounded-xl p-3  '><FaBell className='text-white' /></span>
            <div>
              <h2>Real-time Chat</h2>
              <p>Instant messaging</p>
            </div>
          </div>
          <div className='bg-[#5679E1] rounded-2xl flex items-center py-2 border border-white/30 px-4' >
            <span className='bg-[#438cdc] inline-block me-3  rounded-xl p-3  '><FaUsers className='text-[#7BF1A7] text-[20px]' /></span>
            <div>
              <h2>Communities</h2>
              <p>Find your tribe</p>
            </div>
          </div>
        </div>
        {/* <FaMessage className='text-[#7bf1a7]' /> */}
        <div className=' flex mt-5'>
          <div className=''>
            <div className='flex items-center '>
              <span className='me-2 '><FaUsers className='text-[20px]' /></span>
              <h3 className='text-2xl font-bold'>2M+</h3>
            </div>
            <p className='text-[16px]'>Active Users</p>
          </div>
          <div className='mx-5'>
            <div className='flex items-center '>
              <span className='me-2 '><FaHeart /></span>
              <h3 className='text-2xl font-bold '>10M+</h3>
            </div>
            <p>Posts Shared</p>
          </div>
          <div className=''>
            <div className='flex items-center '>
              <span className='me-2 '><FaMessage /></span>
              <h3 className='text-2xl font-bold'>50M+</h3>
            </div>
            <p>Active Users</p>
          </div>
        </div>
        {/* box */}
        <div className='p-5 bg-white/25 rounded-2xl border border-white/30 flex flex-col gap-4'>
          <div className='flex '>
            <FaStar color='yellow' />
            <FaStar color='yellow' />
            <FaStar color='yellow' />
            <FaStar color='yellow' />
            <FaStar color='yellow' />

          </div>
          <p className='w-[90%]'>"SocialHub has completely changed how I connect with friends and discover new communities. The experience is seamless!"</p>
          <div className='flex items-center '>
            <img className=' rounded-full w-10.5 h-10.5 me-3 ' src={img} alt="" />
            <div>
              <h2 className=' italic'>Alex Johnson</h2>
              <p>Product Designer</p>
            </div>
          </div>
        </div>

      </div>

      {/* form */}
      <div className=' signup-form bg-gray-100 min-h-screen pt-5 '>
        <div className="data-form  w-[80%] mx-auto my-[60px] shadow p-5 bg-white rounded-2xl">

          <div className="title flex items-center flex-col gap-3 ">
            <h3 className=' text-[#364153] text-3xl font-bold'>Create account</h3>
            <p>Already have an account?<Link to={`/login`}>Sign in</Link></p>
            <div className='grid grid-cols-2 gap-2'>
              <button className='border border-1 px-[70px]  py-2 rounded-2xl hover:scale-105 border-[#E6DDE1]'><FaGoogle className=' inline-block text-red-500 me-1' />  Google</button>
              <button className='px-[70px] border border-1 rounded-2xl py-2 hover:scale-105 bg-[#2B7FFF] border-none text-white '><FaFacebookF className=' inline-block ' /> Facebook</button>
            </div>
            <p>or continue with email</p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col gap-3' >

            <div className='relative'>
              <label className='text-[#8390a3]  ' htmlFor="fullname">Full Name</label>
              <input
                {...register('name', {
                  required: {
                    value: true,
                    message: 'full name is requred'
                  },
                  minLength: {
                    value: 6,
                    message: 'min lenth is 6'
                  },
                  maxLength: {
                    value: 20,
                    message: 'max length is 20'
                  }
                })}
                type="text"
                className=' w-full border border-1 border-[#CFD3D9] py-3 ps-[40px] bg-[#F3F4F6] 
            placeholder:text-gray-500  rounded-[10px]  focus:outline-0 focus:border-[#2B7FFF]'
                placeholder='Enter your full name' />
              <FaUser className=' text-[#99A1AF] absolute top-10  left-4' />

            </div>
            {errors?.name && touchedFields?.name && (<p className='text-red-500 mb-4'> {errors?.name?.message}</p>)}

            <div className='relative'>
              <label>Username</label>
              <input
                {...register('username', {
                  required: {
                    value: true,
                    message: 'username is required'
                  }
                })}
                type="text"
                className='w-full border py-3 ps-[40px] bg-[#F3F4F6] rounded-[10px]'
                placeholder='Enter username'
              />
              <FaUser className='absolute top-10 left-4' />
            </div>
            {errors?.username && touchedFields?.username && (<p className='text-red-500 mb-4'> {errors?.username?.message}</p>)}

            <div className='relative'>
              <label className='text-[#8390a3] ' htmlFor="fullname">Email Address</label>
              <input
                type="email"
                {...register('email', {

                  required: {
                    value: true,
                    message: 'emai'
                  },
                  pattern: {
                    value: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                    message: 'email invaild'
                  }
                })}
                className='w-full border border-1 border-[#CFD3D9] py-3 ps-[40px] bg-[#F3F4F6] 
            placeholder:text-gray-500  rounded-[10px]  focus:outline-0 focus:border-[#2B7FFF]'
                placeholder='name@example.com' />
              <FaEnvelope className=' text-[#99A1AF] absolute top-10  left-4' />

            </div>

            {errors?.email && touchedFields?.email && (<p className='text-red-500 mb-4'> {errors?.email?.message}</p>)}
            <div className='relative'>
              <label className='text-[#8390a3]  ' htmlFor="fullname">Password</label>
              <input
                {...register('password', {
                  required: {
                    value: true,
                    message: 'password is required'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'password in vaild '
                  }
                })}
                type='password' className=' w-full border border-1 border-[#CFD3D9] py-3 ps-[40px] bg-[#F3F4F6] 
           placeholder:text-gray-500  rounded-[10px]  focus:outline-0 focus:border-[#2B7FFF]'
                placeholder='Create a strong password' />
              <FaLock className=' text-[#99A1AF] absolute top-10  left-4' />
            </div>
            {errors?.password && touchedFields?.password && (<p className='text-red-500 mb-4'> {errors?.password?.message}</p>)}
            <div className='relative'>
              <label className='text-[#8390a3]  ' htmlFor="fullname">Confirm Password</label>
              <input
                {...register('rePassword', {
                  required: {
                    value: true,
                    message: 'rePassword is required'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'rePassword in vaild '
                  },
                  validate: function (value) {
                    if (value === watch('password')) {
                      return true
                    }
                    return 'rePassword is not match password'
                  }
                })}
                type="password"
                className='w-full border border-1 border-[#CFD3D9] py-3 ps-[40px] bg-[#F3F4F6] 
              placeholder:text-gray-500  rounded-[10px]  focus:outline-0 focus:border-[#2B7FFF]'
                placeholder='Confirm your password' />
              <FaLock className=' text-[#99A1AF] absolute top-10  left-4' />

            </div>
            {errors?.rePassword && touchedFields?.rePassword && (<p className='text-red-500 mb-4'> {errors?.rePassword?.message}</p>)}
            <div className='flex gap-2'>

              <div className='relative'>
                <label className='text-[#8390a3]  ' htmlFor="fullname">Date Of Birth</label>
                <input type="date"
                  {...register('dateOfBirth', {
                    required: {
                      value: true,
                      message: 'data is required'
                    },
                    valueAsDate: true,
                    validate: function (value) {
                      const userData = value.getFullYear()
                      const currentYear = new Date().getFullYear()

                      if (currentYear - userData >= 18) {
                        return true
                      }
                      return 'must age bigger than 18'

                    }
                  })}
                  className='  w-full border border-1 border-[#CFD3D9] py-3 ps-[40px] bg-[#F3F4F6] 
              placeholder:text-gray-500  rounded-[10px]  focus:outline-0 focus:border-[#2B7FFF]'
                  placeholder='Confirm your password' />
                <FaCalendar className=' text-[#99A1AF] absolute top-10  left-4' />

              </div>


              <div class="relative">
                <label htmlFor="gender" className="text-sm mb-1 text-[#8390a3] ">Gender</label>

                <select
                  {...register('gender', {
                    required: {
                      value: true,
                      message: 'gender is required'
                    },
                    pattern: {
                      value: /^(male|female)$/,

                    }
                  })}
                  className="  w-full border border-1 border-[#CFD3D9] py-3 ps-[40px] bg-[#F3F4F6] 
           placeholder:text-gray-500  rounded-[10px]  focus:outline-0 focus:border-[#2B7FFF]"
                  name="gender" id="gender">
                  <option value={''}>Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <FaVenusMars className=' text-[#99A1AF] absolute top-10  left-4' />

              </div>
            </div>

            <div className='relative'>
              <button className='text-white font-bold bg-[#727A8A] py-4 w-full rounded-2xl'> {isloadin ? <ImSpinner7 className='ms-[200px]' /> : 'Rrgister'}</button>
              <FaArrowRight className='absolute top-5 left-80 text-white' />
            </div>
          </form>

        </div>

      </div>

    </div>
  )
}
