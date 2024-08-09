import { useState } from "react";
import { makeRequest } from "../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Update Your Profile</h1>
        <form>
          <div className="mb-4 flex flex-col gap-4">
            <div className="relative">
              <label htmlFor="cover" className="cursor-pointer">
                <span className="block text-gray-700 mb-2">Cover Picture</span>
                <div className="relative">
                  <img
                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : "/upload/" + user.coverPic
                    }
                    alt="Cover"
                  />
                  <CloudUploadIcon className="absolute top-2 right-2 text-gray-500" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                className="hidden"
                onChange={(e) => setCover(e.target.files[0])}
              />
            </div>
            <div className="relative">
              <label htmlFor="profile" className="cursor-pointer">
                <span className="block text-gray-700 mb-2">Profile Picture</span>
                <div className="relative">
                  <img
                    className="w-24 h-24 object-cover rounded-full border border-gray-300"
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : "/upload/" + user.profilePic
                    }
                    alt="Profile"
                  />
                  <CloudUploadIcon className="absolute bottom-2 right-2 text-gray-500" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                className="hidden"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={texts.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={texts.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Country / City</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Website</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              name="website"
              value={texts.website}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleClick}
            className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
          >
            Update
          </button>
        </form>
        <button
          className="mt-4 w-full text-red-500 hover:underline"
          onClick={() => setOpenUpdate(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
