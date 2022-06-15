import React from "react";

const HomepageForm = () => {
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
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="last-name"
              className="input w-full max-w-xs input-bordered"
              placeholder="Last name"
            />
          </div>
        </div>
        <input
          type="email"
          name="email"
          className="input w-full max-w input-bordered mb-6"
          placeholder="Email address"
        />
        <div className="form-check flex justify-center mb-6 text-[16px]">
          <label
            className="form-check-label inline-block"
            htmlFor="newsletterChecked"
          >
            <input
              className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="newsletter"
              id="newsletterChecked"
              name="newsletterChecked"
              // checked
            />
            Subscribe to our newsletter 💌
          </label>
        </div>
        <button
          type="submit"
          // data-mdb-ripple="true"
          // data-mdb-ripple-color="light"
          className="w-full btn btn-secondary"
        >
          Enquire about upcoming cohort
        </button>
      </form>
    </>
  );
};

export default HomepageForm;
