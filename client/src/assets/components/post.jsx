import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "./comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Post = ({ post }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) {
        return makeRequest.delete("/likes?postId=" + post.id);
      }
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error occurred";



  

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg p-4 mb-4">
      <div className="container">
        <div className=" flex justify-between items-center mb-4">
          <div className=" flex items-center">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src={"/upload/" + post.profilePic}
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                className="text-black no-underline"
              >
                <span className=" font-medium">{post.name}</span>
              </Link>
              <span className=" text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && post.userId === currentUser.id && (
            <button
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
        <div className="content mb-4">
          <p className="mb-2">{post.description}</p>
          <img className="w-full rounded" src={"/upload/" + post.img} alt="" />
        </div>
        <div className=" flex justify-between text-gray-500">
          <div className=" flex items-center cursor-pointer">
            {isLoading ? (
              "Loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                className="text-red-500"
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            <span className="ml-2">{data?.length} Likes</span>
          </div>
          <div className=" flex items-center cursor-pointer" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <span className="ml-2">See Comments</span>
          </div>
          <div className=" flex items-center cursor-pointer">
            <ShareOutlinedIcon />
            <span className="ml-2">Share</span>
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;