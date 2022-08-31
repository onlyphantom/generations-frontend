import React, { useState } from "react";

const EnrollFormModal = () => {
  const [status, setStatus] = useState("signup");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // Sign up
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Log in
  const [identifier, setIdentifier] = useState("");
  const [pass, setPass] = useState("");

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    let data = {
      username: username,
      email: email,
      password: password,
    };

    fetch(`https://generationsapi.herokuapp.com/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data === null) {
          throw new Error(`${data.error.message}. Please try again.`);
        }
        sessionStorage.setItem("userSession", data.jwt);
        event.target.reset();
        setError(false);
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.message.toString());
        setError(true);
        event.target.reset();
      });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    let data = {
      identifier: identifier,
      password: pass,
    };

    fetch(`https://generationsapi.herokuapp.com/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data === null) {
          throw new Error(
            `${data.error.message}. Please try again.`
          );
        }
        sessionStorage.setItem("userSession", data.jwt);
        event.target.reset();
        setError(false);
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.message.toString());
        setError(true);
        event.target.reset();
      });
  };

  if (status === "signup") {
    return (
      <>
        <input type="checkbox" id="enroll" className="modal-toggle" />
        <div className="modal modal-center m:modal-middle">
          <div className="modal-box w-10/12 md:w-6/12 max-w-4xl">
            <label
              htmlFor="enroll"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setError(false)}
            >
              ✕
            </label>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Enroll in <span className="text-secondary">Fellowship</span>
            </h2>
            <div className="text-center mb-6 text-gray-500 text-[16px]">
              <small>
                Already have an account?{" "}
                <span className="link" onClick={() => setStatus("login")}>
                  Login here
                </span>
              </small>
            </div>
            <div
              className={
                error
                  ? "bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-6 text-xs"
                  : "hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-xs"
              }
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
            <form
              name="signup"
              method="post"
              onSubmit={(event) => handleSignupSubmit(event)}
            >
              <input type="hidden" name="form-name" value="signup" />
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <input
                    type="text"
                    name="username"
                    className="input w-full max-w-xs input-bordered"
                    placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    name="email"
                    className="input w-full max-w-xs input-bordered"
                    placeholder="Email address"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>
              <input
                type="password"
                name="password"
                className="input w-full max-w input-bordered mb-6"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="enroll">
                <button
                  type="submit"
                  // data-mdb-ripple="true"
                  // data-mdb-ripple-color="light"
                  className="mb-6 w-full btn btn-secondary"
                >
                  Submit
                </button>
              </label>
            </form>
            <div className="text-center text-gray-500 ">
              <p className="mb-6 text-[16px]">or enroll with:</p>
            </div>
            <div className="flex justify-center">
              <a
                href="#!"
                role="button"
                className="link-accent action:text-blue-800 transition duration-200 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </a>
              <a
                href="https://generationsapi.herokuapp.com/api/connect/google"
                role="button"
                className="link-accent action:text-blue-800 transition duration-200 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
              </a>
              <a
                href="#!"
                role="button"
                className="link-accent action:text-blue-800 transition duration-200 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <input type="checkbox" id="enroll" className="modal-toggle" />
        <div className="modal modal-center m:modal-middle">
          <div className="modal-box w-10/12 md:w-6/12 max-w-4xl">
            <label
              htmlFor="enroll"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => {
                setStatus("signup");
                setError(false);
              }}
            >
              ✕
            </label>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Welcome back to <span className="text-secondary">Fellowship</span>
            </h2>
            <div className="text-center mb-6 text-gray-500 text-[16px]">
              <small>
                Don't have an account?{" "}
                <span className="link" onClick={() => setStatus("signup")}>
                  Enroll here
                </span>
              </small>
            </div>
            <div
              className={
                error
                  ? "bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-6 text-xs"
                  : "hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-xs"
              }
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
            <form
              name="login"
              method="post"
              onSubmit={(event) => handleLoginSubmit(event)}
            >
              <input type="hidden" name="form-name" value="login" />
              <input
                type="text"
                name="identifier"
                className="input w-full max-w input-bordered mb-6"
                placeholder="Username or Email Address"
                onChange={(event) => setIdentifier(event.target.value)}
                required
              />
              <input
                type="password"
                name="pass"
                className="input w-full max-w input-bordered mb-6"
                placeholder="Password"
                onChange={(event) => setPass(event.target.value)}
                required
              />
              <button
                type="submit"
                // data-mdb-ripple="true"
                // data-mdb-ripple-color="light"
                className="mb-6 w-full btn btn-secondary"
              >
                Login to your account
              </button>
            </form>
            <div className="text-center text-gray-500 text-[16px]">
              <p className="mb-6">or login with:</p>
            </div>
            <div className="flex justify-center">
              <a
                href="#!"
                role="button"
                className="link-accent action:text-blue-800 transition duration-200 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </a>
              <a
                href="https://generationsapi.herokuapp.com/api/connect/google"
                role="button"
                className="link-accent action:text-blue-800 transition duration-200 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
              </a>
              <a
                href="#!"
                role="button"
                className="link-accent action:text-blue-800 transition duration-200 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="w-4 h-4 mx-4"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default EnrollFormModal;
