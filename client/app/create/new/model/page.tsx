'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
const Page: React.FC = () => {
    useEffect(() => {
        document.title = "Create New Model";
        document.body.style.backgroundColor = "whitesmoke"
        return () => {
        }
    }, [])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div className="w-screen h-screen overflow-y-auto flex items-center justify-center">
                <div className="p-4 border-l border-r h-[100%] w-full max-w-[500px] bg-white relative">
                    <div className="upper px-4 py-2 flex border-b bg-[transparent] backdrop-blur-lg absolute w-[90%]">
                        <Link href={'/'}>
                            <span className="material-symbols-outlined text-sm p-2 text-blue-600 cursor-pointer">
                                arrow_back_ios
                            </span>

                        </Link>
                        <h1 className='text-sm font-bold py-2'>Create New Model</h1>
                    </div>
                    <div className="overflow-y-auto max-h-full min-h-[max-content] no-scrollbar pt-16">
                        <div className="general p-2">
                            <h1 className='text-xl font-bold'>General</h1>
                            <div className="p-3">
                                <h2 className='text-sm font-bold text-gray-600 px-2'>Model Name</h2>
                                <div className="space-x-0 flex">
                                    <span className='px-4 py-2 border-4 border-r-0 rounded-l-xl text-sm font-bold'>itsshreyashk/</span>
                                    <input type="text" name="model_name" id="model_name" className='px-4 py-2 w-full rounded-r-xl focus:border-blue-600 font-bold border-4 border-l-0 outline-none text-sm' />
                                </div>
                            </div>
                            <div className="description p-3">
                                <span className='font-bold text-sm w-full text-gray-600 px-2'>Description</span>
                                <textarea name="model_description" id="model_description" cols={30} rows={10} className='px-4 py-2 w-full border-4 focus:border-blue-600 resize-none rounded-xl outline-none text-sm'>
                                </textarea>
                            </div>
                            <div className="p-3">
                                <h2 className='text-sm font-bold text-gray-600 px-2'>Model Icon URL</h2>
                                <div className="space-x-0 flex">
                                    <input type="text" name="model_image_url" id="model_image_url" className='px-4 py-2 w-full rounded-xl focus:border-blue-600 font-bold border-4 outline-none text-sm' />
                                </div>
                            </div>

                        </div>

                        <div className="configuration p-2">
                            <h1 className='text-xl font-bold'>Configuration</h1>
                            <div className="p-3">
                                <h2 className='text-sm font-bold text-gray-600'>Source</h2>
                                <input type="text" name="model_source" id="model_source" className='px-4 py-2 w-full rounded-xl focus:border-blue-600 font-bold border-4 outline-none text-sm' />
                            </div>
                            <div className="p-3">
                                <label className='text-sm font-bold text-gray-600'>Methods</label><br />
                                <select name="model_method" id="model_method" className='w-full px-4 py-2 rounded-xl text-sm bg-gray-100 font-bold text-gray-800 outline-none border-5 border-gray-700'>
                                    <option value="Default" className=''>Use Default Methods</option>
                                    <option value="" disabled>More coming soon...</option>

                                </select>
                            </div>
                        </div>
                        <div className="deploy p-2"></div>
                        <div className="publish p-2 w-full flex justify-end">
                            <button type="button" className='text-sm border px-4 py-2 bg-green-600 text-white'>Archive</button>
                            <button type="button" className='text-sm border px-4 py-2 bg-blue-600 text-white '>Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page