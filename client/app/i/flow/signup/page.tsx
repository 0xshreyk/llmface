'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Notification } from '@/app/hub';
const Page = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const [notification, setNotification] = useState({
    display : false,
    type : '',
    message : ''
  })


  useEffect(() => {


    return () => {
    }
  }, [])

  return (
    <>
      <div className="text-center space-y-1 p-2">
        <h2 className='font-bold'>Creds</h2>
        <input type="text" name="username" placeholder='username' ref={usernameRef} id="username" className='px-4 py-2 text-sm border' /><br />
        <input type="text" name="password" placeholder='password' ref={passwordRef} id="password" className='px-4 py-2 text-sm border' />
        <h2 className='font-bold'>General</h2>
        <input type="email" name="email" id="email" placeholder='email' ref={emailRef} className='px-4 py-2 text-sm border' /><br />
        <input type="number" name="number" id="number" placeholder='phone number' ref={phoneNumberRef} className='px-4 py-2 text-sm border' /><br />
        <span className='font-bold'>Gender</span>
        <select name="gender" id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="Female">Female</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select><br />
        <div className="space-y-4 py-3">
          <button type="button" className='px-4 py-2 bg-blue-600 text-white text-sm w-full max-w-[200px] active:bg-blue-800 disabled:opacity-70' onClick={async (e: any) => {
            e.target.disabled = true;
            const username : string = usernameRef.current?.value || '';
            const password : string = passwordRef.current?.value || '';
            const email : string = emailRef.current?.value || '';
            const phoneNumber : number = Number(phoneNumberRef.current?.value || '');
            const gender : string = genderRef.current?.value || '';
            const body = {
              username: username,
              password: password,
              email: email,
              phone_number: phoneNumber,
              gender: gender,
            };
            console.log(body);
            

            const response: any = (await fetch(`http://localhost:8080/api/create/user`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            })).json();
            console.log(response);
            
            if (response.status === 200) {
              localStorage.setItem('sid', response.sid)
              setNotification({
                display : true,
                type :'special',
                message : 'Signup successful. Redirecting...'
              })
              setTimeout(() => {
                location.href = "/";                
              }, 1000);
            } else {
              setNotification({
                display : true,
                type :'Error',
                message : 'Error'
              })
            }
            e.target.disabled = false;
          }}>Signup</button>
        </div>
      </div>
      {
        notification.display && <Notification type={notification.type} message={notification.message} />
      }
    </>
  )
}

export default Page