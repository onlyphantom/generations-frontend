import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const backendURL = "https://generationsapi.herokuapp.com/api";

function AuthRedirect() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${backendURL}/auth/${params.providerName}/callback${location.search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data === null) {
          throw new Error(`${data.error.message}. Please try again.`);
        }
        sessionStorage.setItem("userSession", data.jwt);
        setText("Authorization Successful!");
        setLoading(false);
        setSuccess(true);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        setText(err.message.toString());
        setLoading(false);
        setTimeout(() => navigate("/"), 2000);
      });
  }, [location.search, params.providerName, navigate]);

  if (loading) {
    return (
      <div className="w-1/12 mx-auto">
        <img src="/192.png" alt="logo" />
        <progress className="progress mt-4"></progress>
      </div>
    );
  } else {
    return (
      <div className="w-3/12 mx-auto">
        <div className="block rounded-lg shadow-lg bg-glass px-6 py-12 md:px-8 border-solid border-2 border-sky-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={success ? "w-5 h-5 mx-auto" : "hidden"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={success ? "hidden" : "w-5 h-5 mx-auto"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          {text}
        </div>
      </div>
    );
  }
}

export default AuthRedirect;
