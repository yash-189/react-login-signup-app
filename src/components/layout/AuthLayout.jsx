import React from "react"

const AuthLayout = ({ 
  children, 
}) => {
  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="visual"
           className="w-full h-full min-h-screen"
          version="1.1"
          viewBox="0 0 960 540"
          preserveAspectRatio="xMidYMid slice"
        >
          <path fill="#fff" d="M0 0h960v540H0z"></path>
           <path
      fill="#06F"
      d="M960 459c-61.4-9.7-122.8-19.4-170.3-47.9s-81-75.8-125.3-115.5c-44.3-39.8-99.4-71.9-128.5-119.9-29-48-32-111.9-34.9-175.7h459ZM0 81c46.4 36.4 92.7 72.8 153.5 88.5 60.7 15.8 135.7 10.9 171.1 45.9 35.3 35.1 31 110 46.8 170.8 15.8 60.7 51.7 107.3 87.6 153.8H0Z"
    ></path>
        </svg>
      </div>

      <div className="z-10  overflow-y-auto py-4 w-full max-w-4xl flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout