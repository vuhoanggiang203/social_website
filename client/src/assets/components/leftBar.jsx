import Friends from "../assets/1.png";
import Groups from "../assets/2.png";
import Market from "../assets/3.png";
import Watch from "../assets/4.png";
import Memories from "../assets/5.png";
import Events from "../assets/6.png";
import Gaming from "../assets/7.png";
import Gallery from "../assets/8.png";
import Videos from "../assets/9.png";
import Messages from "../assets/10.png";
import Tutorials from "../assets/11.png";
import Courses from "../assets/12.png";
import Fund from "../assets/13.png";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);
  
    return (
      <div className="leftBar bg-gray-100 h-screen p-4">
        <div className="container">
          <div className="menu mb-4">
            <div className="user flex items-center mb-4">
              <img
                className="w-10 h-10 rounded-full object-cover mr-4"
                src={"/upload/" + currentUser.profilePic}
                alt=""
              />
              <span className="font-medium">{currentUser.name}</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Friends} alt="" />
              <span>Friends</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Groups} alt="" />
              <span>Groups</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Market} alt="" />
              <span>Marketplace</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Watch} alt="" />
              <span>Watch</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Memories} alt="" />
              <span>Memories</span>
            </div>
          </div>
          <hr className="mb-4"/>
          <div className="menu mb-4">
            <span className="font-semibold mb-2 block">Your shortcuts</span>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Events} alt="" />
              <span>Events</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Gaming} alt="" />
              <span>Gaming</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Gallery} alt="" />
              <span>Gallery</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Videos} alt="" />
              <span>Videos</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Messages} alt="" />
              <span>Messages</span>
            </div>
          </div>
          <hr className="mb-4"/>
          <div className="menu">
            <span className="font-semibold mb-2 block">Others</span>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Fund} alt="" />
              <span>Fundraiser</span>
            </div>
            <div className="item flex items-center mb-4">
              <img className="w-6 h-6 mr-4" src={Tutorials} alt="" />
              <span>Tutorials</span>
            </div>
            <div className="item flex items-center">
              <img className="w-6 h-6 mr-4" src={Courses} alt="" />
              <span>Courses</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default LeftBar;  