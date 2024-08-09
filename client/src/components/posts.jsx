import Post from "./post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
const Posts = ({userId}) => {
    
    const { isLoading, error, data } = useQuery({
      queryKey: ["posts", userId],
      queryFn: () => makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data),
    });
  
    if (isLoading) return "Loading...";
    if (error) return "Something went wrong";
  
    return (
      <div className="mt-10">
        {error
          ? "Something went wrong!"
          : isLoading
          ? "loading"
          : data.map((post) => <Post post={post} key={post.id} />)}
      </div>
    );
  };
  
  export default Posts;