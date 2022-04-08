import React from "react";

function Avatar(props) {
  const { username,img } = props;
  return (
    <>
      <div className="flex items-center">
        <img
          className="w-11 h-11 rounded-full border border-gray-100 shadow-sm inline-block"
          src={img}
          alt="user-avatar"
        />
        <div className="ml-2 inline-block">{username}</div>
      </div>
    </>
  );
}

export default Avatar;
