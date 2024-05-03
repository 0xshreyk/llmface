'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface alert_interface {
    text: string,
    onOkClick: any,
}
const Alerting: React.FC<alert_interface> = ({ text, onOkClick }) => {
    const handleOkClick = () => {
        // Call the onOkClick prop when the "OK" button is clicked
        if (onOkClick) {
            onOkClick(); // Invoke the callback
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[transparent] bg-opacity-50 backdrop-blur-xl z-[70] flex items-center justify-center">
            <div className="text-center bg-gray-100 border rounded-xl overflow-hidden scale-[1.3]">
                <div className="p-8">
                    <span className="font-bold">{text}</span>
                </div>
                <button type="button" className="w-full px-4 py-2 border-t text-blue-600 active:bg-gray-300" onClick={handleOkClick}>
                    OK
                </button>
            </div>
        </div>
    );
};
const Page: React.FC = () => {
    const model_name_ref = useRef<HTMLInputElement>(null)
    const model_description_ref = useRef<HTMLTextAreaElement>(null)
    const model_icon_url_ref = useRef<HTMLInputElement>(null)
    const model_source_ref = useRef<HTMLInputElement>(null)
    const method_selector_ref = useRef<HTMLSelectElement>(null)
    const model_tags_ref = useRef<HTMLInputElement>(null)


    const archive_btn = useRef<HTMLButtonElement>(null);

    const publish_btn = useRef<HTMLButtonElement>(null);
    const checkLocalhost = async (url: string): Promise<boolean> => {
        if (url.trim().startsWith('http://localhost') || url.trim().startsWith("http://127.0.0.1")) {
            return true;
        } else {
            return false;
        }
    }
    const createBody = async () => {
        const body: Record<string, string | boolean | null> = {
            model_name: model_name_ref.current ? model_name_ref.current.value : null,
            model_description: model_description_ref.current ? model_description_ref.current.value : null,
            model_icon_url: model_icon_url_ref.current ? model_icon_url_ref.current.value : null,
            model_source: model_source_ref.current ? model_source_ref.current.value : null,
            model_tags: model_tags_ref.current ? model_tags_ref.current.value : null,
            isLocalhost: model_source_ref.current
                ? await checkLocalhost(model_source_ref.current.value) // Await and expect boolean
                : null,
            method_selector: method_selector_ref.current ? method_selector_ref.current.value : null,
            owner_sid: (localStorage.getItem('sid') ? localStorage.getItem("sid") : null),
        };

        return body;
    };

    const show_alert: any = async (text: string, xfunction: any) => {
        setIsAlert(true)
        setAlertText(text)
        setAlertFunction(xfunction)
    }
    const [isAlert, setIsAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [alertFunction, setAlertFunction] = useState(() => { })
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
                        <h1 className='text-sm font-bold py-2 z-[30]'>Create New Model</h1>
                    </div>
                    <div className="overflow-y-auto max-h-full min-h-[max-content] no-scrollbar pt-16">
                        <div className="general p-2">


                            <h1 className='text-xl font-bold'>General</h1>
                            <div className="p-3">
                                <h2 className='text-sm font-bold text-gray-600 px-2'>Model Name</h2>
                                <div className="space-x-0 flex">
                                    <span className='px-4 py-2 border-4 border-r-0 rounded-l-xl text-sm font-bold'>itsshreyashk/</span>
                                    <input type="text" name="model_name" id="model_name" ref={model_name_ref} className='px-4 py-2 w-full rounded-r-xl focus:border-blue-600 font-bold border-4 border-l-0 outline-none text-sm' />
                                </div>
                            </div>
                            <div className="description p-3">
                                <span className='font-bold text-sm w-full text-gray-600 px-2'>Description</span>
                                <textarea name="model_description" id="model_description" ref={model_description_ref} cols={30} rows={10} className='px-4 py-2 w-full border-4 focus:border-blue-600 resize-none rounded-xl outline-none text-sm'>
                                </textarea>
                            </div>
                            <div className="p-3">
                                <h2 className='text-sm font-bold text-gray-600 px-2'>Model Icon URL</h2>
                                <div className="space-x-0 flex">
                                    <input type="text" name="model_image_url" id="model_image_url" ref={model_icon_url_ref} className='px-4 py-2 w-full rounded-xl focus:border-blue-600 font-bold border-4 outline-none text-sm' />
                                </div>
                            </div>
                            <div className="p-3">
                                <h2 className='text-sm font-bold text-gray-600 px-2'>Model Tags <span className='text-gray-400'>{'(seperate using spaces)'}</span></h2>
                                <div className="space-x-0 flex">
                                    <input type="text" name="model_tags" id="model_tags" ref={model_tags_ref} className='px-4 py-2 w-full rounded-xl focus:border-blue-600 font-bold border-4 outline-none text-sm' />
                                </div>
                            </div>

                        </div>

                        <div className="configuration p-2">
                            <h1 className='text-xl font-bold'>Configuration</h1>
                            <div className="p-3">
                                <h2 className='text-sm font-bold text-gray-600'>Source</h2>
                                <input type="text" name="model_source" ref={model_source_ref} id="model_source" className='px-4 py-2 w-full rounded-xl focus:border-blue-600 font-bold border-4 outline-none text-sm' />
                            </div>
                            <div className="p-3">
                                <label className='text-sm font-bold text-gray-600'>Methods</label><br />
                                <select name="model_method" id="model_method" ref={method_selector_ref} className='w-full px-4 py-2 rounded-xl text-sm bg-gray-100 font-bold text-gray-800 outline-none border-5 border-gray-700'>
                                    <option value="Default" className=''>Use Default Methods</option>
                                    <option value="" disabled>More coming soon...</option>

                                </select>
                            </div>
                        </div>
                        <div className="deploy p-2"></div>
                        <div className="publish p-2 w-full flex justify-end">
                            <button type="button" ref={archive_btn} id='archive_btn' className='text-sm border px-4 py-2 disabled:opacity-70 bg-green-600 text-white active:bg-green-800 outline-none'>Archive</button>
                            <button type="button" ref={publish_btn} className='text-sm border px-4 py-2 disabled:opacity-70 bg-blue-600 text-white active:bg-blue-800 outline-none' onClick={async (e: any) => {
                                e.target.disabled = true;
                                if (archive_btn.current) {
                                    archive_btn.current.disabled = true;
                                }

                                const body = JSON.stringify(await createBody());

                                const response = await fetch('http://localhost:8080/api/create/model', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: body
                                })
                                const rjson = await response.json();
                                if (response.status === 200 && rjson.ok) {
                                    console.warn('Model added Successfully (MaS)')
                                    alert('Done')
                                    setTimeout(() => {
                                        location.href = '/'
                                    }, 1000);
                                } else {
                                    console.log(rjson);
                                }

                                /**
                                 * 
                                 * This part should only run if operation is successful
                                 * kept now for testing purposes
                                 */

                                e.target.disabled = false; location.href = '/'

                                if (archive_btn.current) {
                                    archive_btn.current.disabled = false;
                                }

                            }}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Page