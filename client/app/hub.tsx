import React from 'react'

interface NotProps {
    type: String,
    message: String
}
const Notification: React.FC<NotProps> = ({ type, message }) => {
    return (
        <>
            {
                (type === 'special') ? (<>
                    <div className="p-2 fixed top-0 flex justify-center items-center w-screen">
                        <div className="p-2 border border-green-400 rounded-md backdrop-blur-xl w-[30%] min-w-[max-content] max-w-[400px] text-center">
                            <span className='text-gray-700 text-sm'>{message}</span>
                        </div>
                    </div>
                </>) : (<>
                    <div className="p-2 fixed top-0 flex justify-center items-center w-screen">
                        <div className="p-2 border border-red-400 rounded-md backdrop-blur-xl w-[30%] min-w-[max-content] max-w-[400px] text-center">
                            <span className='text-gray-700 text-sm'>{message}</span>
                        </div>
                    </div>
                </>)
            }
        </>
    )
}
export { Notification }