'use client'
import React from 'react'
import Link from 'next/link'
const Page = () => {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="p-4 border-l border-r h-full w-[100%] max-w-[500px]">
          <div className="flex border-b p-2">
            <Link href={'/'}>
              <span className="material-symbols-outlined text-sm p-2 text-blue-600 cursor-pointer">
                arrow_back_ios
              </span>

            </Link>
            <h1 className='font-bold p-2 roboto-regular'>Account</h1>
          </div>
          <div className="flex justify-center items-center p-4">
            <div className="dotted-gradient w-[10rem] h-[10rem] flex justify-center items-center active:opacity-[0.7] cursor-pointer">
              <div className="dotted-inner flex justify-center items-center">
                <img src="https://avatars.githubusercontent.com/u/1309177?v=4" alt="profile-img" className="rounded-full h-[9rem]" />
              </div>
            </div>
          </div>

          <h1 className='roboto-bold text-2xl py-4 px-2'>General</h1>
          <div className="p-2">
            <label htmlFor="username" className='text-gray-600 roboto-bold'>Username</label><br />
            <span id='usernaeme' className='roboto-regular'>Charlie Marsh</span>
          </div>
          <div className="p-2">
            <label htmlFor="username" className='text-gray-600 roboto-bold'>Email</label><br />
            <div className="flex items-center space-x-2">
              <span id='usernaeme' className='roboto-regular text-blue-600 underline'>charliemarsh.me@gmail.com</span>
              <button type="button" className='px-4 py-2 border active:opacity-[0.8] roboto-bold transition duration-200'>Verify</button>
            </div>
          </div>
          <div className="p-2">
            <label htmlFor="Phone" className='text-gray-600 roboto-bold'>Phone</label><br />
            <span id='Phone' className='roboto-regular'>28349298409</span>
          </div>
          <div className="p-2">
            <label htmlFor="gender" className='text-gray-600 roboto-bold'>Gender</label><br />
            <span id='gender' className='roboto-regular'>Male</span>
          </div>
          <h1 className='roboto-bold text-2xl py-4 px-2'>Personal</h1>
          <div className="p-2">
            <label htmlFor="password" className='text-gray-600 roboto-bold'>Password</label><br />
            <input type="password" name="password" id="password" value={'adasd'} disabled/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page