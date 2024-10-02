import React from 'react';

const Home = () => {
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="https://png.pngtree.com/png-vector/20210629/ourmid/pngtree-cms-information-management-illustration-work-data-statistics-png-image_3528750.jpg" alt="Logo" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/about" className="text-gray-900 hover:text-gray-700">About Us</a>
              <a href="/choose-user" className="bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700">Login</a>
            </div>
          </div>
        </div>
      </nav>

      
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('https://media.cntraveler.com/photos/631b4fe1f2f54501e692c5d3/16:9/w_2580,c_limit/University%20of%20Michigan_GettyImages-470656298.jpg')` }}
      >
        <div className="bg-white bg-opacity-30 p-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to College Management System</h1>
          <p className="text-lg text-black font-bold mb-6">
            Streamline college management, class organization, and add students and faculty. Seamlessly track attendance, assess performance, and provide feedback. Access records, view marks, and communicate effortlessly.
          </p>
          <div className="flex justify-center space-x-4">

            <a href="/choose-user" className="bg-purple-900 text-white px-6 py-2 rounded-md text-lg hover:bg-purple-700">Login</a>
            {/* <button className="border-2 border-purple-900 text-purple-900 px-6 py-2 rounded-md text-lg hover:bg-purple-50">Login as Guest</button> */}
          </div>
          <p className="mt-4 text-black font-bold">Don't have an account? <a href="/student-register" className="text-purple-900 hover:underline font-bold" >Sign up</a></p>
        </div>
      </div>
    </>
  );
};

export default Home;
