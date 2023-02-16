import React, { useState } from "react";
import MessageAlert from "./MessageAlert";

const EnrollFormModal = () => {
  const [status, setStatus] = useState("signup");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sign up
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Log in
  const [identifier, setIdentifier] = useState("");
  const [pass, setPass] = useState("");

  // Forgot Password
  const [emailForgot, setEmailForgot] = useState("");

  // Reset Password
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

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
        setError("error");
        event.target.reset();
        setLoading(false);
      });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

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
          throw new Error(`${data.error.message}. Please try again.`);
        }
        sessionStorage.setItem("userSession", data.jwt);
        event.target.reset();
        setError(false);
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.message.toString());
        setError("error");
        event.target.reset();
        setLoading(false);
      });
  };

  const handleForgotSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let data = {
      email: emailForgot,
    };

    fetch(`https://generationsapi.herokuapp.com/api/auth/forgot-password`, {
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
          throw new Error(`${data.error.message}`);
        }
        setStatus("reset");
        setError("success");
        setMessage(
          "Email sent! Please check your email inbox or spam, and enter the credentials below."
        );
        event.target.reset();
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.message.toString());
        setError("error");
        event.target.reset();
        setLoading(false);
      });
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let data = {
      code: code,
      password: newPass,
      passwordConfirmation: confirmPass,
    };

    fetch(`https://generationsapi.herokuapp.com/api/auth/reset-password`, {
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
          throw new Error(`Invalid data provided. Please try again.`);
        }
        setStatus("login");
        setError("success");
        setMessage("You have successfully reset your password!");
        event.target.reset();
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.message.toString());
        setError("error");
        event.target.reset();
        setLoading(false);
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
            <h2 className="text-4xl font-bold mb-4 text-center">
              Enroll in <span className="text-secondary">Fellowship</span>
            </h2>
            <div className="text-center mb-6 text-gray-500">
              <p className="text-lg">
                Already have an account?{" "}
                <span
                  className={`${loading ? "" : "link link-secondary"}`}
                  onClick={() => setStatus("login")}
                >
                  Login here
                </span>
              </p>
            </div>
            <MessageAlert error={error} setError={setError} message={message} />
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
                    datacy="signup-username"
                    disabled={loading ? true : false}
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    autoComplete="username"
                    name="email"
                    className="input w-full input-bordered"
                    placeholder="Email address"
                    onChange={(event) => setEmail(event.target.value)}
                    datacy="signup-email"
                    disabled={loading ? true : false}
                    required
                  />
                </div>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                className="input w-full  input-bordered mb-6"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                datacy="signup-password"
                disabled={loading ? true : false}
                required
              />
              <button
                type="submit"
                // data-mdb-ripple="true"
                // data-mdb-ripple-color="light"
                className="mb-3 w-full btn btn-secondary"
                disabled={loading ? true : false}
              >
                Submit
              </button>
              <progress
                className={`${
                  loading
                    ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    : "hidden"
                } progress w-48`}
              ></progress>
            </form>
            <div className="divider text-lg text-center text-gray-500 mb-6">
              or
            </div>
            <a
              href="https://generationsapi.herokuapp.com/api/connect/google"
              role="button"
              className="w-full btn link-accent action:text-blue-800 transition duration-200 ease-in-out"
              disabled={loading ? true : false}
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
              <span>Enroll with Google</span>
            </a>

            {/* <div className="flex justify-center">
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
            </div> */}
          </div>
        </div>
      </>
    );
  } else if (status === "login") {
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
            <div className="text-center mb-6 text-gray-500">
              <p className="text-lg">
                Don't have an account?{" "}
                <span
                  className={`${loading ? "" : "link link-primary"}`}
                  onClick={() => setStatus("signup")}
                >
                  Enroll here
                </span>
              </p>
            </div>
            <MessageAlert error={error} setError={setError} message={message} />
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
                datacy="login-id"
                disabled={loading ? true : false}
                required
              />
              <input
                type="password"
                name="pass"
                autoComplete="current-password"
                className="input w-full max-w input-bordered"
                placeholder="Password"
                onChange={(event) => setPass(event.target.value)}
                datacy="login-password"
                disabled={loading ? true : false}
                required
              />
              <div className="text-right text-gray-500 text-lg mb-6">
                <p
                  className={`${loading ? "" : "link"}`}
                  onClick={() => setStatus("forgot")}
                >
                  Forgot Password?
                </p>
              </div>
              <button
                type="submit"
                // data-mdb-ripple="true"
                // data-mdb-ripple-color="light"
                className="mb-3 w-full btn btn-secondary"
                disabled={loading ? true : false}
              >
                Login to your account
              </button>
              <progress
                className={`${
                  loading
                    ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    : "hidden"
                } progress w-48`}
              ></progress>
            </form>
            <div className="divider text-lg text-center text-gray-500 mb-6">
              or
            </div>
            <a
              href="https://generationsapi.herokuapp.com/api/connect/google"
              role="button"
              className="w-full btn link-accent action:text-blue-800 transition duration-200 ease-in-out"
              disabled={loading ? true : false}
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
              <span>Login with Google</span>
            </a>

            {/* <div className="text-center text-gray-500 text-[16px]">
              <p className="mb-6 text-lg">or login with:</p>
            </div> */}

            {/* <div className="flex justify-center">
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
            </div> */}
          </div>
        </div>
      </>
    );
  } else if (status === "forgot") {
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
              Forgot <span className="text-secondary">Password</span>
            </h2>
            <div className="text-center mb-6 text-gray-500">
              <p className="text-lg">
                <span
                  className={`${loading ? "" : "link link-secondary"}`}
                  onClick={() => setStatus("login")}
                >
                  Back to login
                </span>
              </p>
            </div>
            <MessageAlert error={error} setError={setError} message={message} />
            <form
              name="forgot"
              method="post"
              onSubmit={(event) => handleForgotSubmit(event)}
            >
              <input type="hidden" name="form-name" value="forgot" />
              <input
                type="email"
                name="emailForgot"
                className="input w-full input-bordered mb-6"
                placeholder="Email address"
                onChange={(event) => setEmailForgot(event.target.value)}
                disabled={loading ? true : false}
                required
              />
              <button
                type="submit"
                // data-mdb-ripple="true"
                // data-mdb-ripple-color="light"
                className="mb-3 w-full btn btn-secondary"
                disabled={loading ? true : false}
              >
                Email me a password reset link
              </button>
              <progress
                className={`${
                  loading
                    ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    : "hidden"
                } progress w-48`}
              ></progress>
            </form>
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
              onClick={() => setError(false)}
            >
              ✕
            </label>
            <h2 className="text-4xl font-bold mb-4 text-center">
              Reset <span className="text-secondary">Password</span>
            </h2>
            <div className="text-center mb-6 text-gray-500">
              <p className="text-lg">
                Haven't got any email?{" "}
                <span
                  className={`${loading ? "" : "link link-secondary"}`}
                  onClick={() => setStatus("forgot")}
                >
                  Re-enter email address
                </span>
              </p>
            </div>
            <MessageAlert error={error} setError={setError} message={message} />
            <form
              name="reset"
              method="post"
              onSubmit={(event) => handleResetSubmit(event)}
            >
              <input type="hidden" name="form-name" value="reset" />
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <input
                    type="password"
                    name="newpass"
                    className="input w-full max-w-xs input-bordered"
                    placeholder="New Password"
                    onChange={(event) => setNewPass(event.target.value)}
                    disabled={loading ? true : false}
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="confirmpass"
                    className="input w-full input-bordered"
                    placeholder="Confirm Password"
                    onChange={(event) => setConfirmPass(event.target.value)}
                    disabled={loading ? true : false}
                    required
                  />
                </div>
              </div>
              <input
                type="password"
                name="code"
                className="input w-full  input-bordered mb-6"
                placeholder="Code from the email"
                onChange={(event) => setCode(event.target.value)}
                disabled={loading ? true : false}
                required
              />
              <button
                type="submit"
                // data-mdb-ripple="true"
                // data-mdb-ripple-color="light"
                className="mb-3 w-full btn btn-secondary"
                disabled={loading ? true : false}
              >
                Reset Password
              </button>
              <progress
                className={`${
                  loading
                    ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    : "hidden"
                } progress w-48`}
              ></progress>
            </form>
          </div>
        </div>
      </>
    );
  }
};
export default EnrollFormModal;
