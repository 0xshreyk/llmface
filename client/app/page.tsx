'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
function HomeComponent() {
  return (
    <>
    Home Page, Welcome.
    </>
  )
}
function LandingComponent() {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="">
          <Link href={`/i/flow/login`}>
            <button type="button" className="px-4 py-2 border border-gray-400 font-bold rounded-md active:bg-gray-400">Login</button>
          </Link>
          <Link href={`/i/flow/signup`}>
            <button type="button" className="px-4 py-2 border border-gray-400 font-bold rounded-md active:bg-gray-400">Signup</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <>
      {localStorage.getItem('sid') ? (
        <HomeComponent />
      ) : (
        <LandingComponent />
      )}
    </>
  );
}