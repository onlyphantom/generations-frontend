import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

const Curation = ({ setCurrentStep }) => {
  const { t } = useContext(UserContext);
  const [tray, setTray] = t;

  return (
    <div>
      <p className="prose prose-stone" onClick={() => setTray()}>
        {JSON.stringify(tray)}
      </p>
    </div>
  );
};

export default Curation;
