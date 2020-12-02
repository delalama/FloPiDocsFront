import React , {useState}from "react";
import ImageUploader from "react-images-upload";

export default function ImageUploaderComponent({onUploadImage}) {
  const [picture, setPicture] = useState([]);

  const onDrop = (picture) => {
    setPicture([...picture, picture]);
    onUploadImage() ;
  };
  return (
    <ImageUploader
      withIcon={true}
      withPreview={true}
      buttonText="Choose image"
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      singleImage={true}
      withLabel={true}
    />
  );
}
