const RightBar = () => {
    return (
      <div className="max-w-xs">
        <div className="container p-4">
          <div className="item mb-4">
            <span className="text-lg font-semibold">Suggestions For You</span>
            {[...Array(2)].map((_, index) => (
              <div className="user flex justify-between items-center mt-4" key={index}>
                <div className="userInfo flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <span className="font-medium">Jane Doe</span>
                </div>
                <div className="buttons flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Follow
                  </button>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="item mb-4">
            <span className="text-lg font-semibold">Latest Activities</span>
            {[...Array(4)].map((_, index) => (
              <div className="user flex justify-between items-center mt-4" key={index}>
                <div className="userInfo flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <p className="text-gray-600">
                    <span className="font-medium">Jane Doe</span> changed their cover picture
                  </p>
                </div>
                <span className="text-gray-500 text-sm">1 min ago</span>
              </div>
            ))}
          </div>
          <div className="item">
            <span className="text-lg font-semibold">Online Friends</span>
            {[...Array(10)].map((_, index) => (
              <div className="user flex items-center mt-4" key={index}>
                <div className="userInfo flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online w-3 h-3 bg-green-500 rounded-full mr-2" />
                  <span className="font-medium">Jane Doe</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default RightBar;