import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from 'react-html-parser'
import { storage,db } from "../firebase";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          let uploadTask = storage.ref(`images/${file.name}`).put(file);
          uploadTask.on(
            "state_changed", // or 'state_changed'
            function (snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");

                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            function (error) {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              // eslint-disable-next-line default-case
              switch (error.code) {
                case "storage/unauthorized":
                  reject(" User doesn't have permission to access the object");
                  break;

                case "storage/canceled":
                  reject("User canceled the upload");
                  break;

                case "storage/unknown":
                  reject(
                    "Unknown error occurred, inspect error.serverResponse"
                  );
                  break;
              }
            },
            function () {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  // console.log("File available at", downloadURL);
                  resolve({
                    default: downloadURL,
                  });
                });
            }
          );
        })
    );
  }
}

function Ckeditor(props) {
  const [data, setData] = useState("");
  const [tagData, setTagData] = useState(null);
  const [getFirebaseTagData,setFirebaseTagData] =useState(null)

  const handleOnchange = (_, editor) => {
    const data = editor.getData();
    setTagData(data);
  };

  const handleBtn=async ()=>{
      console.log('data>>>',data)
    await db.collection('editor').add({
        tagData
    })
      setData('')
  }

    const handleBtn2=async ()=>{
        console.log('data>>>',data)
        await db.collection('editor').add({
            test:'HI'
        })
        setData('')
    }



    const handleGetFirebase =async ()=>{
      const array=[]

   const response = await db.collection("editor").get()
        response.forEach(docs => array.push(docs.data()))

        setFirebaseTagData(array[0].tagData)
        console.log('array<><>>>',array)
  }

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={handleOnchange}
        onReady={(editor) => { // 사진 업로드
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new MyUploadAdapter(loader);
          };
        }}
      />
      {tagData}
      <button onClick={handleBtn}>파이어 베이스 업로드</button>
        <button onClick={handleBtn2}>파이어 베이스 텍스트 업로드</button>
        <button onClick={handleGetFirebase}>파이어 베이스 가져오기</button>

        <div>
            {getFirebaseTagData}
        </div>
        {/*<div dangerouslySetInnerHTML={ {__html: getFirebaseTagData}}/>*/}
        {ReactHtmlParser(getFirebaseTagData)}
    </>
  );
}

export default Ckeditor;
