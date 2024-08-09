import Stories from "../components/stories"
import Posts from "../components/posts"
import Share from "../components/share"


const Home = () => {
  return (
    <div className="flex flex-col ">
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home