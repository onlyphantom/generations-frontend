const SubmissionForm = ({
  collectionId,
  placeholder,
  prefix,
  children,
  onSubmit,
}) => {
  // const onSubmitForm = () => {
  //   setSubmitBtnStatus("submitting");
  //   fetch(
  //     `https://generationsapi.herokuapp.com/api/collections/${collectionId}/submit`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setSubmitBtnStatus("submitted");
  //       console.log(data);
  //     });
  // };

  return (
    <div>
      <div className="form-control my-4">
        {children}
        <label className="label">
          <h3 className="label-text text-xl">Proof of Completion</h3>
        </label>
        <label className="input-group">
          <span className="text-sm">{prefix || "URL"}</span>
          <input
            type="text"
            placeholder={
              placeholder ||
              "https://github.com/<github-username>/Submission-URL"
            }
            className="input input-bordered w-3/4 input-bordered input-secondary"
          />
          <button className="btn" onClick={onSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>{" "}
            Submit
          </button>
        </label>
      </div>
    </div>
  );
};

export default SubmissionForm;
