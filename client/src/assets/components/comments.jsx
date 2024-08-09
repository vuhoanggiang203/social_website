import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  // Fetch comments
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  // Mutation for adding a new comment
  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="">
      <div className=" flex items-center mb-4">
        <img
          className="w-10 h-10 rounded-full object-cover mr-4"
          src={"/upload/" + currentUser.profilePic}
          alt=""
        />
        <input  
          className="flex-1 border border-gray-300 rounded px-4 py-2 mr-4"
          type="text"
          placeholder="Write a comment..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((comment) => (
            <div key={comment.id} className="comment flex mb-4">
              <img
                className="w-10 h-10 rounded-full object-cover mr-4"
                src={"/upload/" + comment.profilePic}
                alt=""
              />
              <div className="info flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{comment.name}</span>
                  <span className="text-gray-500 text-sm">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                <p className="mt-2">{comment.desc}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
