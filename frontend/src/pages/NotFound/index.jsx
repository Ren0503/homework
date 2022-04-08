import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="flex items-center flex-col w-full h-[100vh] justify-center">
        <h1 className="text-9xl text-gray-500">404</h1>
        <p className="text-2xl text-gray-400">Page Not Found</p>
        <Link to='/' className="btn mt-2">Go to Home</Link>
      </div>      
    </>
  );
}

export default NotFound;
