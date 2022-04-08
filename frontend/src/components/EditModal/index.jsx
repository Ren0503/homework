import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { updateFile } from "../../redux/actions/Admin";
import ModalHeader from "../ModalHeader";
import UploadButton from "../UploadButton";

function EditModal(props) {
  const { isEdit, setIsEdit } = props;
  const [isFilePicker, setFilePicker] = React.useState(null);
  
  const id= useSelector(state => state.adminReducer.detailDocs?._id);
  const title = useSelector(state => state.adminReducer.detailDocs?.title);
  const updatedAt = useSelector(state => state.adminReducer.detailDocs?.updatedAt);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", isFilePicker);
    updateFile(id,formData);
    setIsEdit(!isEdit)
  };

  return (
    <>
      <Modal
        isOpen={isEdit}
        contentLabel="Assign User Modal"
        appElement={document.getElementById("root")}
        className="styled-modal"
        onRequestClose={() => setIsEdit(false)}
        shouldCloseOnOverlayClick={true}
        overlayClassName="over-play-modal"
      >
        <ModalHeader title={'Edit document'} callback={() => setIsEdit(false)} />
        <div className="px-4">
          <form>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mt-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Name: {title}
                 
                </label>                
              </div>                
              <label className="w-full px-3 block uppercase tracking-wide text-gray-700 text-xs font-bold my-2">
                Last update at: {new Date(updatedAt).toLocaleDateString("vi-VI")}
              </label>
              <div className="w-[90vw] xl:w-full xl:px-4 md:w-[80%] mx-auto mt-3">
                <UploadButton isFilePicker={isFilePicker} setFilePicker={setFilePicker} showBtn={false}/>
              </div>
              <button className="btn mx-auto mt-2" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default EditModal;
