import BookmarkCardCached from "../BookmarkCardCached";
import Empty from "../../icons/Empty";
import Prerequisites from "./Prerequisites";

const ListOfBookmarks = ({ bookmarks }) => {
  if (bookmarks.length === 0) {
    return (
      <>
        <Empty />
        <h3 className="mt-2 text-sm font-medium text-gray-300">
          Empty Collection
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This Collection may yet to be updated.
        </p>
      </>
    );
  } else {
    return bookmarks
      .sort((a, b) =>
        b.attributes.createdAt.localeCompare(a.attributes.createdAt)
      )
      .map((bookmark, i) => (
        <div
          key={i}
          className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-solid border-2 
                    border-secondary odd:text-sky-300 even:text-accent"
        >
          <BookmarkCardCached data={bookmark} key={i} />
          {bookmark.attributes.dependsOn.length > 0 && (
            <Prerequisites prerequisites={bookmark.attributes.dependsOn} />
          )}
        </div>
      ));
  }
};

export default ListOfBookmarks;
