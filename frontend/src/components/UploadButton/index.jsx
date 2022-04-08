import React from "react";

function UploadButton(props) {
  const { isFilePicker, setFilePicker, showBtn, callback} = props;
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFilePicker( file);
  }

  return (
    <>
      <div className="relative block py-9 bg-white appearance-none border-2 rounded-md hover:shadow-outline-gray text-center w-full px-3 shadow-lg">      
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleChange}
          className="w-full h-full absolute inset-0 m-0 p-0 outline-none opacity-0 cursor-pointer z-10"
        />        
        <label className="relative w-full h-full text-blue-500 underline">
          {isFilePicker
            ? isFilePicker.name
            : "Click or Drag the file here to Upload a new Document"}
        </label>
        {isFilePicker&& showBtn && (
          <button type="button" className="block btn mx-auto mt-2 relative z-20" onClick={callback}>Upload</button>
        )}
      </div>
    </>
  );
}

export default UploadButton;
