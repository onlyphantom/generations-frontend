const EffortPointOfTen = ({ effortSelect, setEffortSelect }) => {
  let elemToBeRendered = [];
  let remaining = 10;

  while (remaining > 0) {
    let sel = remaining;
    remaining -= 1;
    elemToBeRendered.push(
      <div
        className={`${
          `badge badge-xs` + (effortSelect >= sel ? " badge-accent" : "")
        }`}
        key={remaining}
        onClick={() => {
          setEffortSelect(sel);
          console.log("settingEffortSelect with", sel);
        }}
      ></div>
    );
  }

  return (
    <div className="flex my-1 max-w-[5rem] flex-wrap items-center gap-1 overflow-x-hidden">
      {elemToBeRendered.reverse()}
    </div>
  );
};

export default EffortPointOfTen;
