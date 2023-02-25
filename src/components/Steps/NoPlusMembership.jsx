import { scrollToSection } from "../Navbar";
import Lock from "../../icons/Lock";

const NoPlusMembership = ({ btnDisplay }) => {
  return (
    <div className="alert alert-error shadow-lg mt-4 max-w-2xl">
      <div>
        <Lock />

        <div className="text-left">
          <h3 className="font-bold">Available with Fellowship Plus</h3>
          <div className="text-xs">
            This feature is only available with an active Fellowship Plus
            subscription.
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

export default NoPlusMembership;
