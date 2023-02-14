import React, { useState } from "react";
import MessageAlert from "../EnrollFormModal/MessageAlert";

const ResetPasswordModal = ({user}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // Reset Password
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let data = {
        currentPassword: oldPass,
        password: newPass,
        passwordConfirmation: confirmPass
    };

    fetch(`https://generationsapi.herokuapp.com/api/users/me/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`,
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

  return (
    <>
      <input type="checkbox" id="reset" className="modal-toggle" />
      <div className="modal modal-center m:modal-middle">
        <div className="modal-box w-10/12 md:w-6/12 max-w-4xl">
          <label
            htmlFor="reset"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
                setError(false);
                setOldPass("");
                setNewPass("");
                setConfirmPass("");
            }}
          >
            ✕
          </label>
          <h2 className="text-4xl font-bold mb-6 text-center">
            Reset <span className="text-secondary">Password</span>
          </h2>
          
          <MessageAlert 
            error={error} 
            setError={setError} 
            message={message} 
          />
          <form
            name="reset"
            method="post"
            onSubmit={(event) => handleResetSubmit(event)}
          >
            <input type="hidden" name="form-name" value="reset" />
            <input
              type="password"
              name="oldPass"
              className="input w-full input-bordered mb-6"
              placeholder="Current Password"
              onChange={(event) => setOldPass(event.target.value)}
              disabled={loading ? true : false}
              required
            />
            <input
              type="password"
              name="newPass"
              className="input w-full  input-bordered mb-6"
              placeholder="New Password"
              onChange={(event) => setNewPass(event.target.value)}
              disabled={loading ? true : false}
              required
            />
            <input
              type="password"
              name="confirmPass"
              className="input w-full  input-bordered mb-6"
              placeholder="Confirm Password"
              onChange={(event) => setConfirmPass(event.target.value)}
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
            <progress className={`${loading ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" : "hidden"} progress w-48`}></progress>
          </form>
        </div>
      </div>
    </>
  );
};
export default ResetPasswordModal;
