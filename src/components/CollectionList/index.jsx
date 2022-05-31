import { useEffect, useState } from "react";
import CollectionCard from "../CollectionCard";

export default function BookmarkList(params) {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://generationsapi.herokuapp.com/api/collections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollection(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-center py-6 px-4 sm:py-12">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Practical lessons, <u className="text-secondary">curated.</u>
      </h2>
      <ul className="columns-1 xl:columns-3 gap-6 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
        {!loading
          ? collection
              .sort((a, b) =>
                b.attributes.createdAt.localeCompare(a.attributes.createdAt)
              )
              .map((collection, i) => (
                <li
                  key={i}
                  className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-solid border-2 
                    odd:border-sky-500 even:border-accent odd:text-sky-300 even:text-accent"
                >
                  <CollectionCard attributes={collection.attributes} />
                  {/* <BookmarkCard url={bookmark.attributes.url} key={i} /> */}
                </li>
              ))
          : "Loading..."}
      </ul>
    </section>
  );
}
