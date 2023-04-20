import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Website from "../../icons/Website";

const renderWebsiteLink = (website) => {
  if (website.startsWith("https://collective.supertype.ai")) {
    return (
      <div className="inline group">
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="first:pl-0 px-2 lg:pl-0 lg:pr-2 text-xs group-hover:text-info group-hover:animate-pulse text-primary"
        >
          <Website />{" "}
          <div className="whitespace-nowrap text-gradient ml-2 font-semibold group-hover:text-info text-xs inline align-middle">
            Supertype Collective
          </div>
        </a>
      </div>
    );
  }
  return (
    <a
      href={website}
      target="_blank"
      rel="noreferrer"
      className="first:pl-0 px-2 lg:pl-0 lg:pr-2 hover:text-info"
    >
      <Website />
    </a>
  );
};

const Mentor = () => {
  const { e } = useContext(UserContext);
  const [experts] = e;

  // const [experts, setExperts] = useState([]);

  // useEffect(() => {
  //   fetch("https://generationsapi.herokuapp.com/api/experts/")
  //     .then((res) => res.json())
  //     .then((data) => setExperts(data.data));
  // }, []);

  return (
    <>
      <section className="mb-32 mx-4 text-center lg:text-left">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Meet the <span className="mb-12 text-gradient">experts.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 xl:gap-x-12">
          {experts.map((expert) => (
            <div
              className="mb-6 bg-glass lg:mb-0 p-5 self-center rounded-lg rounded-box rounded-lg border-4 odd:border-sky-500 even:border-accent odd:text-sky-300 even:text-white"
              key={expert.id}
            >
              <div className="flex flex-row items-center">
                {/* <div className="w-7/12 md:grow lg:w-5/12 mr-2 lg:mr-0"> */}
                <div className="w-7/12 md:grow lg:w-6/12 mr-2">
                  <img
                    src={expert.attributes.imageURL}
                    alt={expert.attributes.name}
                    className="mask mask-hexagon rounded-md filter grayscale sepia-25"
                    style={{ width: 120, height: 120 }}
                  />
                </div>
                <div className="w-6/12 lg:w-7/12 text-left">
                  <h5 className="text-xl font-bold mb-2">
                    {expert.attributes.name}
                  </h5>
                  <p className="mb-4 text-sm">{expert.attributes.jobTitle}</p>
                  <ul className="list-inside flex mx-auto">
                    {expert.attributes.website
                      ? renderWebsiteLink(expert.attributes.website)
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Mentor;
