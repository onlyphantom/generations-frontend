import { scrollToSection } from "../Navbar";

const NoProMembership = ({ btnDisplay }) => {
  return (
    <div className="alert alert-error shadow-lg mt-4 max-w-2xl">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>

        <div>
          <h3 className="font-bold">Exclusive for Fellow members</h3>
          <div className="text-xs">
            This feature is only available with an active Fellow subscription.
          </div>
        </div>
      </div>
      {btnDisplay && (
        <div className="flex-none">
          <button
            className="btn btn-sm"
            onClick={(e) => scrollToSection("curations")}
          >
            Scroll to Curations
          </button>
        </div>
      )}
    </div>
  );
};

export default NoProMembership;
