import PaymentBox from "./PaymentBox";

const index = () => {
  return (
    <section
      id="fellowship-plus"
      className="mb-32 mx-4 text-center lg:text-left justify-center items-center flex flex-col"
    >
      <h2 className="text-4xl font-bold mb-12 text-center">
        <span className="font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Fellowship Plus
        </span>
      </h2>

      <section className="relative overflow-hidden w-full">
        <div className="relative z-10 container mx-auto">
          <div className="flex flex-wrap lg:items-center -m-8">
            <div className="w-full md:w-1/2 p-8">
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
                  mentors and a community of peers to help you navigate this
                  journey. The subscription fee compensates for the time and
                  effort of all the mentors who are contributing to your
                  development goals.
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
              <PaymentBox />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default index;
