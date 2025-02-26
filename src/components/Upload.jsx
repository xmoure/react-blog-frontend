import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, setProgress, setData, type }) => {
  const ref = useRef(null);
  const onErrorUploadingImage = (err) => {
    console.log(err);
    toast.error("Image upload failed");
  };

  const onSuccessUploadingImage = (res) => {
    console.log(res);
    setData(res);
  };

  const onImgUploadProgress = (progress) => {
    console.log(progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onErrorUploadingImage}
        onSuccess={onSuccessUploadingImage}
        onUploadProgress={onImgUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          ref.current.click();
        }}
      >
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
