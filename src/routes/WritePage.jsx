import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const WritePage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    img && setValue(prev => prev + `<p><image src="${img.url}" /></p>`)
  }, [img])

  useEffect(() => {
    video && setValue(prev => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`)
  }, [video])

  /* useEffect(() => {
    if (cover) {
      console.log("Cover updated:", cover);
    }
  }, [cover]); */

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      content: value,
    };
    mutation.mutate(data);
  };

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div className="">Please Login</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a new post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover image
          </button>
        </Upload>

        <input
          name="title"
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My story"
        />
        <div className="flex items-center gap-4">
          <label className="text-sm" htmlFor="">
            Choose a category:
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general"> General</option>
            <option value="web-design"> Web Design </option>
            <option value="development"> Development</option>
            <option value="databases"> Databases</option>
            <option value="search-engine"> Search Engines</option>
            <option value="marketing"> Marketing</option>
          </select>
        </div>
        <textarea
          name="description"
          placeholder="A short description"
          className="p-4 rounded-xl bg-white shadow-md"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌄
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              🎥
            </Upload>
          </div>
          <ReactQuill
            value={value}
            onChange={setValue}
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            readOnly={(progress > 0 && progress < 100)}
          />
        </div>

        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"Progress: " + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default WritePage;
