import React from "react";

const Navbar = () => {
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
            tabindex="0"
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
        <a className="btn btn-secondary" href="#!">
          Enroll in Fellowship
        </a>
      </div>
    </div>
  );
};

export default Navbar;
