import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => makeRequest.post("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload(file);
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share bg-white shadow-md rounded-lg p-4">
      <div className="container">
        <div className="top flex items-center">
          <div className="left flex items-center flex-1">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src={"/upload/" + currentUser.profilePic}
              alt=""
            />
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img
                className="w-full h-auto rounded-lg mt-2"
                alt=""
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>
        <hr className="my-4" />
        <div className="bottom flex justify-between items-center">
          <div className="left flex space-x-4">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file" className="flex items-center cursor-pointer">
              <div className="item flex items-center space-x-2">
                <img className="w-6 h-6" src={Image} alt="" />
                <span className="text-blue-500">Add Image</span>
              </div>
            </label>
            <div className="item flex items-center space-x-2 cursor-pointer">
              <img className="w-6 h-6" src={Map} alt="" />
              <span className="text-blue-500">Add Place</span>
            </div>
            <div className="item flex items-center space-x-2 cursor-pointer">
              <img className="w-6 h-6" src={Friend} alt="" />
              <span className="text-blue-500">Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleClick}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
