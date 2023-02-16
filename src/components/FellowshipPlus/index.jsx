import Checkmark from "../../icons/Checkmark";

const index = () => {
  return (
    <section
      id="fellowship-plus"
      className="mb-32 mx-4 text-center lg:text-left justify-center items-center flex flex-col"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">
        <span className="font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Fellowship Plus
        </span>
      </h2>

      <section className="relative overflow-hidden w-full">
        <div className="relative z-10 container mx-auto">
          <div className="flex flex-wrap lg:items-center -m-8">
            <div className="w-full md:w-1/2 p-4">
              <div>
                <h2 className="my-4 text-4xl font-bold font-heading tracking-px-n leading-none">
                  Fellowship+
                </h2>
                <h3 className="mb-4 text-xl font-bold font-heading tracking-px-n leading-none">
                  Accelerate your journey into tech &#38; data.
                </h3>
                <p className="prose text-justify">
                  Taking your first step into the data science and software
                  engineering industry can be daunting and feel intimidating at
                  times.
                  <br />
                  <h4>Additional Support</h4>
                  We offer a Fellowship+ membership to pair you with a team of
                  mentor and a community of peers to help you navigate this
                  journey. This membership fee is collected to compensate for
                  the time and effort of all the mentors who are contributing to
                  your development goals.
                  <br />
                  We also use the funds to cover the costs of running the
                  platform and to provide you with the best experience possible.
                  <h4>Always Free</h4>
                  Fellowship+ is an add-on to the core Fellowship program. The
                  main features of the Fellowship program will always be free to
                  the greatest extent possible.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 py-8">
              <div className="border md:max-w-md mx-auto overflow-hidden rounded-3xl shadow-8xl">
                <div className="p-9">
                  <span className="mb-7 inline-block text-sm text-gray-500 font-semibold uppercase tracking-px">
                    Features included:
                  </span>
                  <ul>
                    <li className="mb-4 flex items-center">
                      <Checkmark />
                      <p className="font-semibold leading-normal">
                        Peer-to-Peer Learning Forum
                      </p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <Checkmark />
                      <p className="font-semibold leading-normal">
                        Mentorship Access
                      </p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <Checkmark />
                      <p className="font-semibold leading-normal">
                        Learn to Earn
                      </p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <Checkmark />
                      <p className="font-semibold leading-normal">
                        1x Round trip to Malang
                      </p>
                    </li>
                    <li className="flex items-center">
                      <Checkmark />
                      <p className="font-semibold leading-normal">
                        Expedited Email Support
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="p-9 bg-white">
                  <div className="flex flex-wrap -m-8 items-center">
                    <div className="sm:w-2/3 p-4">
                      <span className="mb-2 inline-block text-sm text-gray-500 font-semibold uppercase tracking-px">
                        Fellowship Pro
                      </span>
                      <p className="text-gray-900 font-semibold leading-normal">
                        Unlock all features
                      </p>
                    </div>
                    {/* <div className="w-full sm:w-1/2 p-8"> */}
                    <div className="sm:w-1/3 p-4">
                      <div className="sm:max-w-max ml-auto">
                        <p className="font-bold">
                          <span className="text-5xl leading-tight tracking-px-n text-secondary">
                            $12
                          </span>
                          <span className="text-lg text-gray-500 leading-snug tracking-px-n">
                            /mo
                          </span>
                        </p>
                        <p className="font-medium text-gray-500 leading-relaxed text-sm">
                          Billed anually
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-9">
                    <button
                      className="py-4 px-5 w-full text-white font-semibold rounded-xl focus:ring btn-secondary hover:bg-indigo-700 transition ease-in-out duration-200"
                      type="button"
                    >
                      Upgrade to Fellowship+
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default index;
