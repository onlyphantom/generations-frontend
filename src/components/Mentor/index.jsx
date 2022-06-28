import React, { useState, useEffect } from "react";

const Mentor = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetch("https://generationsapi.herokuapp.com/api/experts/")
      .then((res) => res.json())
      .then((data) => setExperts(data.data));
  }, []);

  return (
    <section className="mb-32 mx-4 text-center lg:text-left">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Meet the <span className="text-secondary">experts.</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6 xl:gap-x-12">
        {experts.map((expert) => (
          <div
            className="mb-6 bg-glass lg:mb-0 p-6 rounded-lg rounded-box rounded-lg border-solid border-2 odd:border-sky-500 even:border-accent odd:text-sky-300 even:text-white"
            key={expert.id}
          >
            <div className="flex flex-row items-center">
              <div className="w-7/12 md:grow lg:w-5/12 mr-2 lg:mr-0">
                <img
                  src={expert.attributes.imageURL}
                  alt={expert.attributes.name}
                  className="mask mask-hexagon rounded-md filter grayscale sepia-25"
                  style={{ maxWidth: 150 }}
                />
              </div>
              <div className="w-6/12 lg:w-7/12 text-left">
                <h5 className="text-xl font-bold mb-2">
                  {expert.attributes.name}
                </h5>
                <p className="mb-4 text-sm">{expert.attributes.jobTitle}</p>
                <ul className="list-inside flex mx-auto">
                  <a
                    href={expert.attributes.website}
                    target="_blank"
                    className="first:pl-0 px-2 lg:pl-0 lg:pr-2 hover:text-sky-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mentor;
