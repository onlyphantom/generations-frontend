import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import CollectionCard from "../CollectionCard";
import EffortPointOfTen from "../CollectionCard/EffortPointOfTen";

import { UserContext } from "../../contexts/UserContext";
import { statusOptions } from "../../utils/constants";

// React Select
const selectStyles = {
  menu: (base) => ({
    ...base,
    backgroundColor: "#282c34",
    borderRadius: "0.5rem",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isFocused
      ? "#282c34"
      : state.selectProps.className?.includes("odds")
      ? "#0ea5e9"
      : "#f29ea7",
    backgroundColor: !state.isFocused
      ? "##282c34"
      : state.selectProps.className?.includes("odds")
      ? "#0ea5e9"
      : "#f29ea7",
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "#282c34",
    borderColor: state.selectProps.className?.includes("odds")
      ? "#0ea5e9"
      : "#f29ea7",
    borderRadius: "0.5rem",
    boxShadow: state.selectProps.className?.includes("odds")
      ? "#0ea5e9"
      : "#f29ea7",
    "&:hover": {
      boxShadow: state.selectProps.className?.includes("odds")
        ? "#0ea5e9"
        : "#f29ea7",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#7a7a7b",
  }),
  multiValue: (base, state) => {
    return {
      ...base,
      backgroundColor: state.selectProps.className?.includes("odds")
        ? "#0ea5e9"
        : "#f29ea7",
    };
  },
  multiValueLabel: (base, state) => ({
    ...base,
    color: "#282c34",
    backgroundColor: state.selectProps.className?.includes("odds")
      ? "#0ea5e9"
      : "#f29ea7",
  }),
  multiValueRemove: (base, state) => ({
    ...base,
    backgroundColor: state.selectProps.className?.includes("odds")
      ? "#0ea5e9"
      : "#f29ea7",
    color: "#282c34",
    ":hover": {
      backgroundColor: state.selectProps.className?.includes("odds")
        ? "#0ea5e9"
        : "#f29ea7",
      color: state.selectProps.className?.includes("odds")
        ? "#bae6fd"
        : "#e8614d",
    },
  }),
};

const Menu = (props) => {
  const shadow = "hsla(218, 50%, 10%, 0.1)";
  return (
    <div
      style={{
        backgroundColor: "black",
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: "absolute",
        zIndex: 2,
      }}
      {...props}
    />
  );
};

const Blanket = (props) => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
    }}
    {...props}
  />
);

const Dropdown = ({ children, isOpen, target, onClose }) => (
  <div style={{ position: "relative" }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);

const Svg = (p) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
);

const DropdownIndicator = () => (
  <div style={{ color: "#7a7a7b", height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);

const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);

// getBookmarkedCollections
export const getBookmarkedCollections = (
  user,
  collection,
  setBookmarkedCollections
) => {
  fetch(`https://generationsapi.herokuapp.com/api/trays`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Sorry, something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      console.log("data from getbookmarked collections");
      console.log(data.data);
      let trayCollections = data.data.map((t) => {
        let val = collection.find(
          (coll) => coll.id === t.attributes.collection.data.id
        );
        return {
          ...val,
          status: t.attributes.status,
          assigned_expert: t.attributes.expert.data,
          trayId: t.id,
          completed_on: t.attributes.completedOn || t.completed_on,
          tray_updated_at: t.attributes.updatedAt,
          tray_created_at: t.attributes.createdAt,
        };
      });
      console.log(`Setting bookmark`);
      console.log(trayCollections);
      setBookmarkedCollections(trayCollections);
    });
};

export default function BookmarkList() {
  const [loading, setLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [expertSelect, setExpertSelect] = useState({
    isOpen: false,
    value: [],
    selected: [],
  });
  const [statusSelect, setStatusSelect] = useState({
    isOpen: false,
    value: [],
    selected: [],
    unselectedTrayIDs: [],
    availableTrayIDs: [],
  });
  const [tagSelect, setTagSelect] = useState({
    isOpen: false,
    value: [],
    selected: [],
  });
  const [effortSelect, setEffortSelect] = useState(0);

  const { u, c, bc, e, t } = useContext(UserContext);
  const [user] = u;
  const [collection, setCollection] = c;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;
  const [experts] = e;
  const [tags] = t;

  const [filteredCollections, setFilteredCollections] = useState();

  const handleFilter = (current, selectValue) => {
    setFilteredCollections(
      collection.filter((c) => {
        const expertCondition =
          current === "expert"
            ? selectValue.value.length > 0
              ? c.attributes.experts.data?.some((expert) =>
                  selectValue.selected.includes(expert.attributes.name)
                )
              : true
            : expertSelect.value.length > 0
            ? c.attributes.experts.data?.some((expert) =>
                expertSelect.selected.includes(expert.attributes.name)
              )
            : true;

        const statusCondition =
          current === "status"
            ? selectValue.value.length > 0 &&
              selectValue.selected.includes("available")
              ? !selectValue.unselectedTrayIDs.includes(c.id) ||
                selectValue.availableTrayIDs.includes(c.id)
              : selectValue.value.length > 0
              ? !selectValue.unselectedTrayIDs.includes(c.id) &&
                !selectValue.availableTrayIDs.includes(c.id)
              : true
            : statusSelect.value.length > 0 &&
              statusSelect.selected.includes("available")
            ? !statusSelect.unselectedTrayIDs.includes(c.id) ||
              statusSelect.availableTrayIDs.includes(c.id)
            : statusSelect.value.length > 0
            ? !statusSelect.unselectedTrayIDs.includes(c.id) &&
              !statusSelect.availableTrayIDs.includes(c.id)
            : true;

        const tagCondition =
          current === "tag"
            ? selectValue.value.length > 0
              ? Object.keys(c.attributes.tagsCount)?.some((tag) =>
                  selectValue.selected.includes(tag)
                )
              : true
            : tagSelect.value.length > 0
            ? Object.keys(c.attributes.tagsCount)?.some((tag) =>
                tagSelect.selected.includes(tag)
              )
            : true;

        const effortCondition =
          current === "effort"
            ? selectValue > 0
              ? c.attributes.totalEffort <= selectValue
              : true
            : effortSelect > 0
            ? c.attributes.totalEffort <= effortSelect
            : true;

        return (
          statusCondition && expertCondition && tagCondition && effortCondition
        );
      })
    );

    setIsFilter(true);
  };

  const handleExpertChange = (newValue) => {
    setLoading(true);

    const selectedExperts =
      newValue.length > 0
        ? newValue.map((v) => v.value)
        : experts.map((expert) => expert.attributes.name);

    setExpertSelect({
      isOpen: false,
      value: newValue,
      selected: selectedExperts,
    });

    handleFilter("expert", {
      isOpen: false,
      value: newValue,
      selected: selectedExperts,
    });

    setLoading(false);
  };

  const handleStatusChange = (newValue) => {
    setLoading(true);

    const selectedStatus =
      newValue.length > 0
        ? newValue.map((v) => v.value)
        : statusOptions.map((status) => status.value);

    const unselectedTrayIDs = bookmarkedCollections.reduce((filtered, bc) => {
      if (!selectedStatus.includes(bc.status)) {
        filtered.push(bc.id);
      }
      return filtered;
    }, []);

    const availableTrayIDs = collection.reduce((filtered, c) => {
      if (!bookmarkedCollections?.map((bc) => bc.id).includes(c.id)) {
        filtered.push(c.id);
      }
      return filtered;
    }, []);

    setStatusSelect({
      isOpen: false,
      value: newValue,
      selected: selectedStatus,
      unselectedTrayIDs: unselectedTrayIDs,
      availableTrayIDs: availableTrayIDs,
    });

    handleFilter("status", {
      isOpen: false,
      value: newValue,
      selected: selectedStatus,
      unselectedTrayIDs: unselectedTrayIDs,
      availableTrayIDs: availableTrayIDs,
    });

    setLoading(false);
  };

  const handleTagChange = (newValue) => {
    setLoading(true);

    const selectedTags =
      newValue.length > 0
        ? newValue.map((v) => v.value)
        : tags.map((tag) => tag.attributes.title);

    setTagSelect({
      isOpen: false,
      value: newValue,
      selected: selectedTags,
    });

    handleFilter("tag", {
      isOpen: false,
      value: newValue,
      selected: selectedTags,
    });

    setLoading(false);
  };

  const handleEffortChange = (newValue) => {
    setLoading(true);

    setEffortSelect(newValue);

    handleFilter("effort", newValue);

    setLoading(false);
  };

  const handleReset = (e) => {
    setLoading(true);
    setExpertSelect((prev) => {
      return { ...prev, value: [] };
    });
    setStatusSelect((prev) => {
      return { ...prev, value: [] };
    });
    setTagSelect((prev) => {
      return { ...prev, value: [] };
    });
    setEffortSelect(0);
    setFilteredCollections(collection);
    setIsFilter(false);
    setLoading(false);
  };

  useEffect(() => {
    if (
      isFilter === true &&
      expertSelect.value.length === 0 &&
      statusSelect.value.length === 0 &&
      tagSelect.value.length === 0 &&
      effortSelect === 0
    ) {
      setIsFilter(false);
    }
  }, [isFilter, expertSelect, statusSelect, tagSelect, effortSelect]);

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
        setFilteredCollections(data.data);
        setLoading(false);
      });
  }, [setCollection]);

  useEffect(() => {
    if (user?.token) {
      getBookmarkedCollections(user, collection, setBookmarkedCollections);
    }
  }, [user, collection, setBookmarkedCollections]);

  if (loading) {
    return (
      <section className="relative flex min-h-screen flex-col justify-center py-6 px-4 sm:py-12">
        <progress className="progress w-56"></progress>
      </section>
    );
  } else {
    return (
      <section
        id="curations"
        className="relative flex min-h-screen flex-col justify-center py-6 px-4 sm:py-12"
      >
        <h2 className="text-4xl font-bold mb-9 text-center">
          Practical electives,{" "}
          <span className="font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            curated.
          </span>
        </h2>

        <div className="flex flex-wrap gap-2 ml-auto mb-4">
          <Dropdown
            isOpen={expertSelect.isOpen}
            onClose={() =>
              setExpertSelect((prev) => {
                return { ...prev, isOpen: false };
              })
            }
            target={
              <button
                className="btn btn-outline btn-info text-xs max-w-sm whitespace-nowrap"
                onClick={() =>
                  setExpertSelect((prev) => {
                    return { ...prev, isOpen: !expertSelect.isOpen };
                  })
                }
              >
                <span className="text-ellipsis overflow-hidden max-w-xs">
                  {expertSelect.value.length > 0
                    ? `Expert: ${expertSelect.value.map(
                        (v) => ` ${v.label.split(" ")[0]}`
                      )}`
                    : "Expert: All"}
                </span>
                <ChevronDown />
              </button>
            }
          >
            <Select
              className="text-base w-max max-w-sm odds"
              autoFocus
              components={{ DropdownIndicator, IndicatorSeparator: null }}
              menuIsOpen
              onChange={(newValue) => handleExpertChange(newValue)}
              options={experts.map((expert) => {
                return {
                  value: expert.attributes.name,
                  label: expert.attributes.name,
                };
              })}
              placeholder="Search expert..."
              styles={selectStyles}
              value={expertSelect.value}
              isMulti
            />
          </Dropdown>

          <Dropdown
            isOpen={statusSelect.isOpen}
            onClose={() =>
              setStatusSelect((prev) => {
                return { ...prev, isOpen: false };
              })
            }
            target={
              <button
                className="btn btn-outline btn-accent text-xs max-w-sm whitespace-nowrap"
                onClick={() =>
                  setStatusSelect((prev) => {
                    return { ...prev, isOpen: !statusSelect.isOpen };
                  })
                }
              >
                <span className="text-ellipsis overflow-hidden max-w-xs">
                  {statusSelect.value.length > 0
                    ? `Status: ${statusSelect.value.map((v) => ` ${v.label}`)}`
                    : "Status: All"}
                </span>
                <ChevronDown />
              </button>
            }
          >
            <Select
              className="text-base w-max max-w-sm"
              autoFocus
              components={{ DropdownIndicator, IndicatorSeparator: null }}
              menuIsOpen
              onChange={(newValue) => handleStatusChange(newValue)}
              options={statusOptions}
              placeholder="Search status..."
              styles={selectStyles}
              value={statusSelect.value}
              isMulti
            />
          </Dropdown>

          <Dropdown
            isOpen={tagSelect.isOpen}
            onClose={() =>
              setTagSelect((prev) => {
                return { ...prev, isOpen: false };
              })
            }
            target={
              <button
                className="btn btn-outline btn-info text-xs max-w-sm whitespace-nowrap"
                onClick={() =>
                  setTagSelect((prev) => {
                    return { ...prev, isOpen: !tagSelect.isOpen };
                  })
                }
              >
                <span className="text-ellipsis overflow-hidden max-w-xs">
                  {tagSelect.value.length > 0
                    ? `Tag: ${tagSelect.value.map((v) => ` ${v.label}`)}`
                    : "Tag: All"}
                </span>
                <ChevronDown />
              </button>
            }
          >
            <Select
              className="text-base w-max max-w-sm odds"
              autoFocus
              components={{ DropdownIndicator, IndicatorSeparator: null }}
              menuIsOpen
              onChange={(newValue) => handleTagChange(newValue)}
              options={tags.map((tag) => {
                return {
                  value: tag.attributes.title,
                  label: tag.attributes.title,
                };
              })}
              placeholder="Search tag..."
              styles={selectStyles}
              value={tagSelect.value}
              isMulti
            />
          </Dropdown>

          <div className="text-accent">
            <p className="font-semibold uppercase text-xs mb-0">Max Effort:</p>
            <EffortPointOfTen
              effortSelect={effortSelect}
              handleEffortChange={handleEffortChange}
            />
          </div>

          <button
            type="button"
            className={`btn text-xs ${isFilter ? "" : "hidden"}`}
            onClick={(e) => handleReset(e)}
          >
            Reset
          </button>
        </div>

        <ul className="columns-1 xl:columns-3 gap-6 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit text-center">
          {!loading ? (
            filteredCollections
              .sort((a, b) =>
                b.attributes.createdAt.localeCompare(a.attributes.createdAt)
              )
              .map((collection, i) => (
                <li
                  key={i}
                  className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-solid border-4 odd:border-sky-500 even:border-accent odd:text-sky-300 even:text-accent"
                >
                  <CollectionCard
                    attributes={collection.attributes}
                    id={collection.id}
                  />
                  {/* <BookmarkCard url={bookmark.attributes.url} key={i} /> */}
                </li>
              ))
          ) : (
            <progress className="progress w-56"></progress>
          )}
        </ul>
      </section>
    );
  }
}
