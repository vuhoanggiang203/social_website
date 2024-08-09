import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => makeRequest.get("/stories").then((res) => res.data),
  });

  // TODO: Add story using react-query mutations and use upload function.

  return (
    <div className=" flex overflow-x-scroll p-4 space-x-4 bg-gray-100">
      <div className=" flex flex-col items-center bg-white rounded-lg shadow-md p-4">
        <img
          className="w-16 h-16 rounded-full object-cover mb-2"
          src={"/upload/" + currentUser.profilePic}
          alt={currentUser.name}
        />
        <span className="font-semibold text-gray-700">{currentUser.name}</span>
        <button
          className="mt-2 bg-blue-500 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center hover:bg-blue-600"
        >
          +
        </button>
      </div>
      {error
        ? <p className="text-red-500">Something went wrong</p>
        : isLoading
        ? <p className="text-gray-500">Loading...</p>
        : data.map((story) => (
            <div
              className="story flex flex-col items-center bg-white rounded-lg shadow-md p-4"
              key={story.id}
            >
              <img
                className="w-16 h-16 rounded-full object-cover mb-2"
                src={story.img}
                alt={story.name}
              />
              <span className="font-semibold text-gray-700">{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
