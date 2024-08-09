import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import { AuthContext } from "../context/authContext";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios" ;
function NavBar() {
  const navigate = useNavigate();
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-gray-900 no-underline">
              social
            </Link>
            <HomeOutlinedIcon className="cursor-pointer text-gray-600 hover:text-blue-400" />
            {darkMode ? (
              <WbSunnyOutlinedIcon className="cursor-pointer text-gray-600 hover:text-blue-400" onClick={toggle} />
            ) : (
              <DarkModeOutlinedIcon className="cursor-pointer text-gray-600 hover:text-blue-400" onClick={toggle} />
            )}
            <GridViewOutlinedIcon className="cursor-pointer text-gray-600" />
            <div className="flex items-center border border-gray-300 rounded-md  px-2 py-1">
              <SearchOutlinedIcon className="text-gray-600  " />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
          <Link to={`/profile/${currentUser.id}`}>
            <PersonOutlinedIcon className="cursor-pointer text-gray-600 hover:text-blue-400" />
          </Link>
            <EmailOutlinedIcon className="cursor-pointer text-gray-600 hover:text-blue-400" />
            <NotificationsOutlinedIcon className="cursor-pointer text-gray-600 hover:text-blue-400" />
            
            <Logout onClick={()=>{
              axios.post('http://localhost:5000/api/auth/logout');
              navigate('/login');
              }} className="cursor-pointer text-gray-600 hover:text-blue-400"/>
            
            <div className="flex items-center space-x-2">
              <img
                src={"/upload/" + currentUser.profilePic}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-900">{currentUser.name}</span>
            </div>
          </div>
        </div>
      );
}

export default NavBar;