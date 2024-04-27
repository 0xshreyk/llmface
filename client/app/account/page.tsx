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

            <h1 className='font-bold p-2'>Account</h1>

          </div>
        </div>
      </div>
    </>
  )
}

export default Page