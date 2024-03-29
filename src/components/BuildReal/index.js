import { useInView } from 'react-intersection-observer';

const ImageBox = ({ src, children }) => {

    return (
        <div className="col-span-12 lg:col-span-4 min-h-[300px]">
            <div className="w-1/2 mx-auto lg:block lg:w-1/3 lg:h-full lg:float-left lg:pr-4">
                <div className="avatar">
                    <div className="w-36 pr-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                            src={src}
                            alt="Build Real projects by Supertype"
                            className="animate-pulse paused hover:running"
                            style={{
                                height: "auto",
                                position: "absolute",
                                top: "30px"
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="lg:w-2/3 lg:h-full lg:float-left lg:pl-4">
                {children}
            </div>
        </div>
    )
}


const BuildReal = () => {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0, // 1 is when the entire element is fully in view
        triggerOnce: true,
    });

    return (
        <section className="mb-12 mx-4 text-center lg:text-left" id="buildreal">
            <h2 className="text-4xl font-bold mb-12 text-center">
                Build <span className="mb-12 text-gradient">Real</span> Projects,
                shipped to the <span className="mb-12 text-gradient">real</span>{" "}
                world.
            </h2>
            <div className="grid grid-cols-12 mx-4">
                <ImageBox src="/buildreal/bg-1.svg">
                    <h3 className="text-xl font-bold mb-4">
                        No grades. No tests. No assignments.
                    </h3>
                    <p className="mb-4 text-sm">
                        Instead, you learn programming through electives comprising of
                        <span className="text-secondary"> real projects already <i>live</i></span> in the real world, with real users.
                    </p>
                </ImageBox>
                <ImageBox src="/buildreal/bg-2.svg">
                    <h3 className="text-xl font-bold mb-4">
                        No teachers, no classrooms, no textbooks.
                    </h3>
                    <p className="mb-4 text-sm">
                        You don't submit boring multiple choice questions. Instead, your deployed code are subjected to <span className="text-secondary">
                            expert code reviews</span> and one-on-one feedback.
                    </p>
                </ImageBox>
                <ImageBox src="/buildreal/bg-3.svg">
                    <h3 className="text-xl font-bold mb-4">
                        Collaborative. Build projects together.
                    </h3>
                    <p className="mb-4 text-sm">
                        We pair you with peers who are as passionate about building projects together because <span className="text-secondary">software engineering is
                            inherently collaborative</span>.
                    </p>
                </ImageBox>
                <ImageBox src="/buildreal/bg-4.svg">
                    <h3 className="text-xl font-bold mb-4">
                        Pull Requests driven. Just like real world.
                    </h3>
                    <p className="mb-4 text-sm">
                        Your contributions are measured by Pull Requests,
                        <span className="text-secondary"> exactly as it is</span> in the real world. Your code has real impact and used by real people.
                    </p>
                </ImageBox>
                <ImageBox src="/buildreal/bg-5.svg">
                    <h3 className="text-xl font-bold mb-4">
                        Learn software engineering anytime. Anywhere.
                    </h3>
                    <p className="mb-4 text-sm">
                        Electives are available 24x7, and our community works asynchronously so you can learn
                        at <span className="text-secondary">a pace that suits you</span> and your assigned mentor.
                    </p>
                </ImageBox>
                <ImageBox src="/buildreal/bg-6.svg">
                    <h3 className="text-xl font-bold mb-4">
                        Impactful. Meaningful. Reach the world.
                    </h3>
                    <p className="mb-4 text-sm">
                        Your code doesn't sit in an assignment folder. It is used in open source projects that brings
                        <span className="text-secondary"> you exposure but also add meaning </span> to your work.
                    </p>
                </ImageBox>
                <div ref={ref}
                    className={`${inView && "animate-in slide-in-from-left duration-1000"} "col-span-12 lg: col-span-12 min-h-[300px]"`}
                >
                    <div className="w-1/2 mx-auto lg:block lg:w-1/2 lg:h-full lg:float-left lg:pr-4">
                        <img
                            src="/buildreal/amanda.svg"
                            alt="Build Real projects by Supertype"
                            className="lg:max-w-lg mt-2"
                        />

                    </div>
                    <div className="lg:w-1/2 lg:h-full lg:float-left lg:pl-4">
                        <h3 className="text-3xl font-bold mb-2">
                            Who would you rather hire?
                        </h3>
                        <p className="text-sm">
                            <span className="font-semibold italic text-lg">Alex</span>, who has multiple certificates from online courses and a recent graduate
                            with a degree in Computer Science; Recently completed an online course with
                            an 89% grade, yet to demonstrate a history of real world contributions.
                            <br />
                            <span className="font-semibold italic text-lg">or</span>
                            <br />
                            <span className="font-semibold italic text-lg">Amanda</span>, who do not have a degree, but a solid portfolio of
                            contributing high quality, production-level code to open source projects. Most recently shipped
                            two new features to a popular Python library used by thousands of developers. Demonstrably experienced.
                        </p>
                        <br />
                        <p className="mb-4 text-sm text-gray-300 italic">
                            You can read more about our philosophy and the Fellowship Thesis at &nbsp;
                            <a href="https://supertype.ai/notes/quizmasters/" target="_blank" rel="noreferrer" className="link-primary">our article on recruiting quizmasters.</a>
                            &nbsp; In short, nothing prepares you how to build, ship and launch software features -- better than -- building and shipping itself, under expect guidance and mentorship, directly
                            in the real world.
                        </p>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default BuildReal