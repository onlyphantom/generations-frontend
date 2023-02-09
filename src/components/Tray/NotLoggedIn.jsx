import React from "react";

const NotLoggedIn = () => {
  return (
    // <div className="mx-4">
    //     Not Logged In! 😟
    //     <p className="prose">
    //         The Learning Tray functionality is available with an account.
    //         <br />
    //         Create an account or sign in with an existing account to access more learning facilities on this portal.
    //     </p>
    // </div>
    <div className="alert alert-info shadow-lg mx-4 w-10/12">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-black flex-shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold text-2xl"> You are not signed in 😟.</h3>
          <div className="text-sm">
            This functionality is available with an account.
            <br />
            Create an account or sign in with an existing account to access more
            learning facilities on this portal.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
