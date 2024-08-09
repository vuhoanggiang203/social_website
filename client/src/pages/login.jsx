import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
function Login() {
   
        const [inputs, setInputs] = useState({
          username: "",
          password: "",
        });
        const [err, setErr] = useState(null);
      
        const navigate = useNavigate();
      
        const handleChange = (e) => {
          setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };
        
        const { login } = useContext(AuthContext);

        const handleLogin = async (e) => {
            e.preventDefault();
            try {
            await login(inputs);
            
             navigate("/")
            } catch (err) {
            setErr(err.response.data);
            }
        };
    return (
        
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg"> {/* max-w-lg sets the max-width to 32rem (512px), adjust to max-w-xl for 600px */}
            <div className="flex justify-around mb-4"></div>
            <form onSubmit={handleLogin}>
                <p className="text-gray-700 font-bold text-3xl my-5">Login with us</p>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                    Username
                    </label>
                    <input
                    id="username"
                    type="text"
                    name="username"
                    className="shadow appearance-none placeholder:username border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                    Password
                    </label>
                    <input
                    id="password"
                    type="password"
                    name="password"
                    className="shadow appearance-none placeholder:password border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Login
                    </button>
                    <button
                    onClick={()=>navigate("/register")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex items-center  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Register <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                    </button>
                </div>
        </form>
        </div>
    </div>
    )
        
    
}
export default Login