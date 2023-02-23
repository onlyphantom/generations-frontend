import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import Info from "../../icons/Info";

import EnrollFormModal from "../EnrollFormModal";
import ResetPasswordModal from "./ResetPasswordModal";

export const scrollToSection = (sectionName) => {
  const section = document.querySelector(`#${sectionName}`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ProMembershipStatus = ({ user }) => {
  if (user.proUser) {
    return (
      <li className="text-slate-400">
        <span className="hover:cursor-default">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
          Fellowship+ <br />
          Expires: {user.proExpiry}
        </span>
        {/* <div className="menu-title">
          <button
            className="btn btn-outline btn-success btn-sm border-success"
            onClick={() => {
              scrollToSection("fellowship-plus");
            }}
          >
            Renew Fellowship+
          </button>
        </div> */}
      </li>
    );
  } else {
    return (
      <li className="text-slate-400">
        <div className="menu-title">
          <button
            className="btn btn-outline btn-success btn-sm border-success"
            onClick={() => {
              scrollToSection("fellowship-plus");
            }}
          >
            Upgrade to Fellowship+
          </button>
        </div>
      </li>
    );
  }
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
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
          <label
            tabIndex={0}
            className="btn btn-ghost normal-case text-lg md:text-3xl invisible lg:visible"
          >
            {/* <span className="bg-gradient-to-r from-purple-400 to-pink-60 text-transparent bg-clip-text"> */}
            <span className="bg-gradient-to-r from-purple-400 to-pink-200 text-transparent bg-clip-text">
              fellowship
            </span>
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
        {loggedIn ? (
          // <div
          //   className="btn btn-secondary"
          //   onClick={(event) => handleLogOut(event)}
          // >
          //   Log Out
          // </div>
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                Account
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content p-2 text-sm shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li className="menu-title">
                  <span>Account Information</span>
                </li>
                <li className="text-slate-400">
                  <span className="hover:cursor-default">
                    <Info /> {user.username}
                  </span>
                </li>
                <ProMembershipStatus user={user} />

                {/* separator */}
                <li className="divider"></li>
                <li className="menu-title">
                  <span>Account Settings</span>
                </li>
                <li>
                  <label htmlFor="reset">Reset Password</label>
                </li>
                <li>
                  <span onClick={(event) => handleLogOut(event)}>Log Out</span>
                </li>
              </ul>
            </div>
            <ResetPasswordModal user={user} />
          </>
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
