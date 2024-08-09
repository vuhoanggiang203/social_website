import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import Update from "./update";
import Posts from "./posts";

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get(`/users/find/${userId}`).then((res) => res.data)
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest
        .get(`/relationships?followedUserId=${userId}`)
        .then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete(`/relationships?userId=${userId}`);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="flex flex-col items-center p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div id="profile" className="relative w-full h-48 mb-4">
            <img
              src={`../../public/logo192.png`}
              alt="Cover"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src={`../../public/upload/${data.profilePic}`}
              alt="Profile"
              className="absolute bottom-0 left-4 w-24 h-24 object-cover rounded-full border-4 border-white"
            />
          </div>
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg flex flex-row">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://instagram.com">
                  <InstagramIcon fontSize="large" className="" />
                </a>
                <a href="http://twitter.com">
                  <TwitterIcon fontSize="large" className="" />
                </a>
                <a href="http://linkedin.com">
                  <LinkedInIcon fontSize="large" className="" />
                </a>
                <a href="http://pinterest.com">
                  <PinterestIcon fontSize="large" className="" />
                </a>
              </div>
              <div className="flex space-x-2">
                <EmailOutlinedIcon className="text-gray-600" />
                <MoreVertIcon className="text-gray-600" />
              </div>
            </div>
            <div className="text-center mb-4">
              <span className="text-2xl font-semibold">{data.name}</span>
              <div className="mt-2 text-gray-600">
                <div className="flex items-center justify-center mb-2">
                  <PlaceIcon className="mr-1" />
                  <span>{data.city}</span>
                </div>
                <div className="flex items-center justify-center">
                  <LanguageIcon className="mr-1" />
                  <span className="ml-3">{data.website}</span>
                </div>
              </div>
              {rIsLoading ? (
                <div>Loading...</div>
              ) : userId === currentUser.id ? (
                <button
                  onClick={() => setOpenUpdate(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Updatee
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {relationshipData.includes(currentUser.id)
                    ? "Following"
                    : "Follow"}
                </button>
              )}
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
