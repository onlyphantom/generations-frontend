import HomepageForm from "../HomepageForm";
import Navbar from "../Navbar";

export default function Header() {
  return (
    <section className="mb-0 background-radial-gradient overflow-hidden">
      <Navbar />
      <div className="px-6 py-12 lg:py-24 text-center lg:text-left">
        <div className="container mx-auto xl:px-4 text-gray-200">
          <div className="grid lg:grid-cols-2 gap-12 flex items-center">
            <div className="mt-12 lg:mt-0" style={{ zIndex: 10 }}>
              <h1 className="font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <span className="maintitle">Direct Paths </span>
                <br />
                <span
                  className="text-4xl underline font-semibold"
                  style={{ display: "table-cell" }}
                >
                  to Employable Engineering Skills
                </span>
              </h1>
              <article className="prose font-medium text-lg">
                Supertype Fellowship is a peer-to-peer community for data
                science practitioners and software engineers looking to develop
                product development skills — by immersing themselves with other
                industry practitioners in a self-directed, elective-based
                learning environment.
                <br />
                <br />
                We're currently invite-only, and admissions are subjected to a
                quick screening process by the awesome team at{" "}
                <a
                  href="https://supertype.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="link link-accent"
                >
                  Supertype.ai
                </a>
                , a full-cycle data science consultancy.
              </article>
            </div>
            <div className="mb-12 lg:mb-0 relative">
              <div
                id="radius-shape-1"
                className="absolute rounded-full shadow-lg"
              ></div>
              <div id="radius-shape-2" className="absolute shadow-lg"></div>
              <div className="block rounded-lg shadow-lg bg-glass px-6 py-12 md:px-8 border-solid border-4 border-secondary">
                <HomepageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
