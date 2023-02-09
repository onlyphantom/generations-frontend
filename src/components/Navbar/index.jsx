import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import EnrollFormModal from "../EnrollFormModal";

export const scrollToSection = (sectionName) => {
  const section = document.querySelector(`#${sectionName}`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { u } = useContext(UserContext);
  const [user] = u;

  useEffect(() => {
    if (user?.token) {
      setLoggedIn(true);
    }
  }, [user]);

  const handleLogOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("userSession");
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start text-sm">
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
              <button onClick={(e) => scrollToSection("curations")}>
                Curations
              </button>
            </li>
            <li>
              <button onClick={(e) => scrollToSection("fellowship")}>
                Cohort-based Fellowship
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost normal-case text-xl">
            Fellowship
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={(e) => scrollToSection("curations")}>
                Curations
              </button>
            </li>
            <li>
              <button onClick={(e) => scrollToSection("fellowship")}>
                Cohort Program
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <button
              onClick={(e) => scrollToSection("curations")}
              className="btn btn-ghost"
            >
              Curations
            </button>
          </li>
          <li>
            <button
              onClick={(e) => scrollToSection("fellowship")}
              className="btn btn-ghost"
            >
              Cohort-based Fellowship
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <p className="text-xs text-gray-500">
          {JSON.stringify(user)} | {user.token ? "Logged in" : "Not logged in"}
        </p> */}

        {loggedIn ? (
          // <div
          //   className="btn btn-secondary"
          //   onClick={(event) => handleLogOut(event)}
          // >
          //   Log Out
          // </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              Account
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content p-2 text-sm shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li className="disabled">
                <span>
                  <a>
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                  {user.username}
                </span>
              </li>

              {/* separator */}
              <li className="divider"></li>
              <li className="menu-title">
                <span>Account Settings</span>
              </li>
              <li>
                <span>Reset Password</span>
              </li>
              <li>
                <span onClick={(event) => handleLogOut(event)}>Log Out</span>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <label className="btn btn-secondary" htmlFor="enroll">
              Enroll in Fellowship
            </label>
            <EnrollFormModal />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
