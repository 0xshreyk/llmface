import React from 'react'

const RestofHomePage: React.FC = () => {
    return (
        <>
            <div className="items-center flex justify-center w-screen h-full">
                <div className="w-[100%] max-w-[700px] border-l border-r h-full">
                    <div className="px-4 py-2">
                        <h1 className='font-bold text-blue-600'>Your Models </h1>
                    </div>
                    <div className="models p-2">
                        <table border={1} className='w-full border-2 border-gray-200 px-4 py-2 rounded-xl'>
                            <tr className='overflow-hidden'>
                                <th className='text-sm text-gray-700 px-4 py-2'>Model Name</th>
                                <th className='text-sm text-gray-700 px-4 py-2'>Created</th>
                                <th className='text-sm text-gray-700 px-4 py-2'>Owner</th>
                                <th className='text-sm text-gray-700 px-4 py-2'>English</th>
                            </tr>
                            <tr className='p-2 hover:bg-gray-300 cursor-pointer overflow-hidden'>
                                <td className='px-4 py-2 text-sm text-blue-600 font-bold cursor-pointer hover:underline'>Alice-1</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>21/12/2024</td>
                                <td className='px-4 py-2 text-sm text-blue-600 hover:underline font-bold'>You</td>
                                <td className='px-4 py-2 text-sm'>88</td>
                            </tr>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RestofHomePage