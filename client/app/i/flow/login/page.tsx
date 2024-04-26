'use client'
import React, { useRef, useState } from 'react'
import { Notification } from '@/app/hub';

const Page: React.FC = () => {
  const [usernameRef, passwordRef] = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [notification, setNotification] = useState({
    display: false,
    type: '',
    message: ''
  })

  return (
    <>
      <div className="text-center space-y-1 p-2">
        <h2 className='font-bold'>Provide Creds</h2>
        <input type="text" name="username" placeholder='username' ref={usernameRef} id="username" className='px-4 py-2 text-sm border' /><br />
        <input type="text" name="password" placeholder='password' ref={passwordRef} id="password" className='px-4 py-2 text-sm border' /><br />
        <div className="p-1">
          <button type="button" className='px-4 py-2 bg-blue-600 text-white text-sm w-full max-w-[200px] active:bg-blue-800 disabled:opacity-70' onClick={async (e: any) => {
            e.target.disabled = true;
            const username: string = usernameRef.current?.value || '';
            const password: string = passwordRef.current?.value || '';
            const body = {
              username: username,
              password: password,
            }
            const response: any = (await fetch("http://localhost:8080/api/check/user", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            }));
            const resBody: any = await response.json();
            if (response.status === 200) {
              /**
               * Go
               */
              if (resBody.ok === true) {
                localStorage.setItem("sid", resBody.sid);
                setNotification({
                  display: true,
                  type: 'special',
                  message: 'Login successful. Redirecting...'
                })
                setTimeout(() => {
                  location.href = "/";
                }, 1000);
              } else {
                setNotification({
                  display: true,
                  type: 'Error',
                  message: resBody.error
                })
                console.log('Failed');

              }
            } else {
              setNotification({
                display: true,
                type: 'Error',
                message: `Status code : ${response.status}`
              })
            }
            e.target.disabled = false;
          }}>Login</button>
        </div>

      </div>
      {
        notification.display && <Notification type={notification.type} message={notification.message} />
      }
    </>
  )
}

export default Page