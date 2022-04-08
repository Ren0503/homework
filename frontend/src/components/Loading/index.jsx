import React from "react";
import loading from "../../assets/loading.gif";
function Loading() {
  return (
    <>
        <div className="flex items-center flex-col w-full h-[100vh] justify-center z-[9999] dark:bg-white">
            {/* <h1 className="text-xl text-gray-500">Loading....</h1> */}
            <img  src={loading} alt="loading-spinner" />
        </div>
    </>
  );
}

export default Loading  