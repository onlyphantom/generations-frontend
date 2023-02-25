import { truncate } from "../BookmarkCardCached/utils";

const Prerequisites = ({ prerequisites }) => {
  return (
    <div className="text-left my-4">
      <div className="divider">
        <h3 className="uppercase tracking-wide text-sm text-secondary font-semibold ml-2">
          Pre-requisites
        </h3>
      </div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prerequisites.map((prerequisite, i) => (
          <li key={i}>
            <div className="card-side shadow-lg bg-base-100 w-full p-2">
              <h2 className="mt-2 card-title text-sm text-primary uppercase font-medium">
                <a
                  href={prerequisite.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  {prerequisite.title}
                </a>
              </h2>

              <div className="grid grid-cols-3 gap-4 mt-2">
                {prerequisite.opengraph.imageSecureUrl && (
                  <div className="col-span-1 overflow-hidden">
                    <div className="w-24 flex items-center">
                      <img
                        src={prerequisite.opengraph.imageSecureUrl}
                        alt={prerequisite.title}
                        className="h-auto"
                      />
                    </div>
                  </div>
                )}

                <div className="col-span-2 text-sm text-white text-left">
                  <a href={prerequisite.url} target="_blank" rel="noreferrer">
                    <p className="mt-1 text-xs text-gray-500">
                      {truncate(prerequisite.details, 100) ||
                        truncate(prerequisite.opengraph.description, 100)}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prerequisites;
