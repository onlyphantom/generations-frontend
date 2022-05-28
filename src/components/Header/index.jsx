// export default function Header() {
//     return (
//         <section classNameName="p-4 text-2xl font-bold bg-black text-white mb-4">
//             <div>Generations</div>
//         </section>
//     );
// }

import HomepageForm from "../HomepageForm";

export default function Header() {
  return (
    <section className="mb-0 background-radial-gradient overflow-hidden">
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-gray-300 relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <button
              className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContentY"
              aria-controls="navbarSupportedContentY"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="w-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                ></path>
              </svg>
            </button>
            <a className="navbar-brand text-blue-600" href="#!">
              <svg
                className="w-5 h-5 ml-2 lg:ml-0 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
                ></path>
              </svg>
            </a>
          </div>
          <div
            className="navbar-collapse collapse grow items-center"
            id="navbarSupportedContentY"
          >
            <ul className="navbar-nav mr-auto font-bold lg:flex lg:flex-row">
              <li className="nav-item">
                <a
                  className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="#!"
                >
                  Fellowship
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="#!"
                >
                  Curations
                </a>
              </li>
              <li className="nav-item mb-2 lg:mb-0">
                <a
                  className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="#!"
                >
                  Cohort-based Learning
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:ml-auto">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Enroll in Supertype
            </button>
          </div>
        </div>
      </nav>

      <div className="px-6 py-12 lg:py-24 md:px-12 text-center lg:text-left">
        <div className="container mx-auto xl:px-24 text-gray-200">
          <div className="grid lg:grid-cols-2 gap-12 flex items-center">
            <div className="mt-12 lg:mt-0" style={{ zIndex: 10 }}>
              <h1
                className="text-5xl md:text-6xl font-bold tracking-tight mb-12"
                style={{ color: "hsl(218, 81 %, 95 %)" }}
              >
                Learning Paths <br />
                <span className="underline text-orange-200">
                  purposefully curated.
                </span>
              </h1>
              <p className="opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                Generations is a paid, peer-to-peer community for data science
                practitioners and software engineers who want to develop product
                development skills by immersing themselves with other
                industry-minded developers. <br />
                <br />
                We're currently invite-only, and admissions are subjected to a
                quick screening process by the awesome team at{" "}
                <a
                  href="https://supertype.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-orange-100 hover:text-orange-300"
                >
                  Supertype.ai
                </a>
                , a full-cycle data science consultancy.
              </p>
            </div>
            <div className="mb-12 lg:mb-0 relative">
              <div
                id="radius-shape-1"
                className="absolute rounded-full shadow-lg"
              ></div>
              <div id="radius-shape-2" className="absolute shadow-lg"></div>
              <div className="block rounded-lg shadow-lg bg-glass px-6 py-12 md:px-8">
                <HomepageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
