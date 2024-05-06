'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



const RestofHomePage: React.FC = () => {
    type Model = {
        model_name: string;
        model_id: string;
        createdAt: string;
        model_owner: string;
    };
    const [cacheModels, setCacheModels] = useState<Model[]>([]);
    useEffect(() => {
        fetch(`http://localhost:8080/api/get/models/${localStorage.getItem('sid')}`)
            .then(response => response.json())
            .then((data) => {
                if (Array.isArray(data.models)) {
                    setCacheModels((prevModels) => [...prevModels, ...data.models]); // Ensure it's flat
                } else {
                    console.error('Expected data.models to be an array, but got:', typeof data.models);
                }

            });
        return () => {
        }
    }, [])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div className="items-center flex justify-center w-screen h-full">
                <div className="w-[100%] max-w-[700px] border-l border-r h-full">
                    <div className="text-center p-2">
                        <Link href={'/create/new/model'}>
                            <button type="button" className='px-4 py-2 border rounded-xl bg-gray-700 text-white w-3/4 text-sm font-bold active:bg-gray-600'>Create New</button>

                        </Link>
                        <button type="button" className='px-4 py-2 border rounded-xl bg-green-700 text-white w-3/4 text-sm font-bold active:bg-green-600'>View Analytics</button>
                        <button type="button" className='px-4 py-2 border rounded-xl bg-blue-700 text-white w-3/4 text-sm font-bold active:bg-blue-600'>View Permissions</button>
                    </div>
                    <div className="px-4 py-2">
                        <h1 className='font-bold text-blue-600'>Your Models </h1>
                    </div>
                    <div className="models p-2">
                        <table border={1} className='w-full border-2 border-gray-200 px-4 py-2 rounded-xl'>
                            <tr className='overflow-hidden'>
                                <th className='text-sm text-gray-700 px-4 py-2'>Model Name</th>
                                <th className='text-sm text-gray-700 px-4 py-2'>Created</th>
                                <th className='text-sm text-gray-700 px-4 py-2'>Owner</th>
                                <th className='text-sm text-gray-700 px-4 py-2'>Options</th>
                            </tr>
                            {
                                cacheModels.map((element, index) => {
                                    return (<tr className='p-2 hover:bg-gray-300 cursor-pointer overflow-hidden' key={element.model_id}>
                                        <td className='px-4 py-2 text-sm text-blue-600 font-bold cursor-pointer hover:underline'>{element.model_name}</td>
                                        <td className='px-4 py-2 text-sm text-gray-700'>{element.createdAt}</td>
                                        <td className='px-4 py-2 text-sm text-blue-600 hover:underline font-bold'>{element.model_owner}</td>
                                        <td className='px-4 py-2 text-sm flex space-x-2'>
                                            <button type="button" className='text-sm border border-gray-100 px-4 py-2 rounded-lg hover:bg-red-600 duration-200 hover:text-white flex'><span className="material-symbols-outlined">
                                                delete
                                            </span></button>
                                            <button type="button" className='text-sm border border-gray-100 px-4 py-2 rounded-lg hover:bg-green-600 duration-200 hover:text-white flex'><span className="material-symbols-outlined">
                                                edit
                                            </span></button>
                                        </td>

                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestofHomePage