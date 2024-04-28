'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import llmface from '../public/llmface-logo.png'
import Link from "next/link";
import NextNProgress from 'nextjs-progressbar';

import RestofHomePage from "./HomePage";
function HomeComponent() {
  useEffect(() => {

    document.title = "Home";

    return () => {
    }
  }, [])

  return (
    <>
      <NextNProgress />

      <nav className="bg-white flex px-2 border-b">
        <div className="w-full flex p-3">
          {/* Use that llmface image as a logo here */}
          <Image
            src={llmface}
            alt="LLMFace Logo"
            className="p-2"
            width={100} // Set the desired width
            height={100} // Set the desired height
          />
        </div>
        <div className="w-full flex justify-end p-6">
          <button type="button" className="bg-black text-white px-4 py-2 border active:bg-red-600" onClick={(e: any) => {
            e.target.disabled = true;
            console.log(localStorage.getItem("sid"));
            localStorage.removeItem("sid");
            console.log(localStorage.getItem("sid"));

            location.href = "/";
            e.target.disabled = false;
          }}>Logout</button>
          <Link href={'/account'} className="p-4 text-blue-600 hover:underline">Your Account</Link>
        </div>
      </nav>
      <RestofHomePage />
    </>
  )
}
function LandingComponent() {
  return (
    <>
      <NextNProgress />

      <div className="h-screen w-screen flex items-center justify-center">
        <div className="px-4 py-2 border">
          <Link href={`/i/flow/login`}>
            <button type="button" className="px-4 w-full py-2 border border-gray-400 font-bold rounded-md active:bg-gray-400">Login</button>
          </Link><br />
          <Link href={`/i/flow/signup`}>
            <button type="button" className="px-4 w-full py-2 border border-gray-400 font-bold rounded-md active:bg-gray-400">Signup</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default function Home() {
  let sid = localStorage.getItem('sid');

  return (
    <>
      {(sid !== null && sid !== '' && sid !== undefined) ? (
        <HomeComponent />
      ) : (
        <LandingComponent />
      )}
    </>
  );
}