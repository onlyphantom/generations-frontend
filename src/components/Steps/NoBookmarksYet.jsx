import { scrollToSection } from "../Navbar";

const NoBookmarksYet = () => {
  return (
    <div className="alert alert-error shadow-lg mt-4 max-w-2xl">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-black flex-shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">Nothing in Learning Tray yet.</h3>
          <div className="text-xs">
            Bookmark your first lesson in Curations and it will appear in this
            section.
          </div>
        </div>
      </div>
      <div className="flex-none">
        <button
          className="btn btn-sm"
          onClick={(e) => scrollToSection("curations")}
        >
          Scroll to Curations
        </button>
      </div>
    </div>
  );
};

export default NoBookmarksYet;
