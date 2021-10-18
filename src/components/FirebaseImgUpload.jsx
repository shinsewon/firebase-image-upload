import React, { useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "../firebase";

function FirebaseImgUpload(props) {
  // console.log("storage>>>", storage);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);


  console.log("image>>>", image);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
          storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };



  return (
    <div>
      firebase img
      <progress value={progress} max={100} />
      <br />

      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img
        src={url || "http://via.placeholder.com/300x300"}
        alt="firebase-image"
      />
    </div>
  );
}

export default FirebaseImgUpload;
