import SubmissionForm from "./SubmissionForm";
import { cyrb53 } from "../../utils/crypt";

const GitHubVerify = ({ user }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1 items-center justify-center">
          <div className="mockup-code min-w-fit">
            <pre
              data-prefix="1"
              className="bg-success text-warning-content text-sm"
            >
              <code>{cyrb53(user.token.slice(-8))}</code>
            </pre>
          </div>
        </div>
        <div className="col-span-2 text-left">
          <p className="prose prose-slate text-sm ml-4">
            You should create a new repository named{" "}
            <code className="prose-code">supertype-fellowship</code> on GitHub
            following the instructions in the Challenge and in that repository
            upload a file named{" "}
            <code className="prose-code">{`verify-${user.username}.txt`}</code>{" "}
            with the verification code (
            <code>{cyrb53(user.token.slice(-8))}</code>).
          </p>
        </div>
      </div>
      <SubmissionForm placeholder="https://github.com/<github-username>/supertype-fellowship/blob/main/verify-samuel0.txt">
        <label className="label">
          <h3 className="label-text text-s prose-slate">
            Enter the link to the verification file (
            <code className="prose-code">`verify-${user.username}.txt`</code>)
          </h3>
        </label>
      </SubmissionForm>
    </div>
  );
};

export default GitHubVerify;
