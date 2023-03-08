import HomepageForm from "../HomepageForm";
import Navbar from "../Navbar";
import { scrollToSection } from "../Navbar";

export default function Header() {
  return (
    <section className="mb-0 background-radial-gradient overflow-hidden">
      <Navbar />
      <div className="px-6 py-12 lg:py-24 text-center lg:text-left">
        <div className="container mx-auto xl:px-4 text-gray-200">
          <div className="grid lg:grid-cols-2 gap-12 flex items-center">
            <div className="mt-12 lg:mt-0" style={{ zIndex: 10 }}>
              <h1 className="font-extrabold mb-12">
                <span className="maintitle tracking-in-expand text-gradient">
                  Ship real code{" "}
                </span>
                <br />
                <span
                  className="text-4xl underline font-semibold tracking-in-expand text-gradient"
                  style={{ display: "table-cell" }}
                >
                  guided by technical experts
                </span>
              </h1>
              <article className="prose font-medium text-lg">
                Supertype Fellowship is a community of learners, educators, and
                open source developers combining to graduate industry-prepared
                developers by providing them with the opportunity to contribute
                to <span className="text-gradient">open source projects</span>.
                The program features a combination of expert mentoring,
                peer-to-peer learning, and plenty of opportunity to{" "}
                <span
                  className="link link-primary underline cursor-pointer"
                  onClick={() => scrollToSection("buildreal")}
                >
                  <span className="text-gradient hover:text-secondary">
                    help build real software being used by real people
                  </span>
                </span>
                .
                <br />
                <br />
                We're currently invite-only, and admissions are subjected to a
                quick screening process by the awesome team at{" "}
                <a
                  href="https://supertype.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary"
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
