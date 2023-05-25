import React, { useState } from "react";

const HomepageForm = () => {
  const [email, setEmail] = useState();

  const sendEmail = (e) => {
    fetch(`https://generationsapi.herokuapp.com/api/users/welcome-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e
      }),
    })
  }

  return (
    <>
      <form name="enquiry" method="post" data-netlify="true">
        <input type="hidden" name="form-name" value="enquiry" />
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <input
              type="text"
              name="first-name"
              className="input w-full max-w-xs input-bordered"
              placeholder="First name"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="last-name"
              className="input w-full max-w-xs input-bordered"
              placeholder="Last name"
              required
            />
          </div>
        </div>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full max-w input-bordered mb-6"
          placeholder="Email address"
          required
        />
        <div className="form-check flex justify-center mb-6 text-[16px]">
          <label className="cursor-pointer label" htmlFor="newsletterChecked">
            <input
              className="form-check-input checkbox checkbox-secondary rounded-sm focus:outline-none transition duration-200 align-top mr-2"
              type="checkbox"
              value="newsletter"
              id="newsletterChecked"
              name="newsletterChecked"
              // checked
            />
            <span className="label-text">Subscribe to our newsletter 💌</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full btn btn-info hover:bg-sky-500 border-4
          bg-gradient-to-r from-purple-400 to-pink-200 text-transparent bg-clip-text
          hover:from-purple-500 hover:to-pink-300 hover:border-success transition duration-200
          "
          onClick={() => sendEmail(email)}
        >
          Enquire about upcoming cohort
        </button>
      </form>
    </>
  );
};

export default HomepageForm;
