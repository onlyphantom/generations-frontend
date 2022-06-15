import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import EnrollFormModal from "../EnrollFormModal";

const Navbar = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);

  const { dispatch } = useContext(UserContext);
  
  useEffect(() => {
    const token = sessionStorage.getItem("userSession");
    if(token){
      dispatch({
        type: "LOGIN",
        token: token
      });
      setLoggedIn(true);
    }
  }, [dispatch]);

  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch({
        type: "LOGOUT"
    });
    sessionStorage.removeItem("userSession");
    window.location.reload();
  };
  
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="#!">Curations</a>
            </li>
            <li>
              <a href="#!">Cohort-based Fellowship</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl" href="#!">
          Fellowship
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a href="#!">Curations</a>
          </li>
          <li>
            <a href="#!">Cohort-based Fellowship</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {loggedIn 
          ? 
          <div className="btn btn-secondary" onClick={(event) => handleLogOut(event)}> 
            Log Out 
          </div> 
          :
          <>
            <label className="btn btn-secondary" htmlFor="enroll">
              Enroll in Fellowship
            </label>
            <EnrollFormModal/>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;
