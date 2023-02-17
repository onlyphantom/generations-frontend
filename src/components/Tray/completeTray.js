const completeTray = async (bc, c, ta, u, collectionId, githubUsername) => {
    const [bookmarkedCollections, setBookmarkedCollections] = bc;
    const [collection] = c;
    const [user, setUser] = u;
    const [, setTagAwards] = ta;

    const trayIndex = bookmarkedCollections.findIndex(
        (t) => t.id === collectionId
    );
    let completedCollection = collection.find((coll) => coll.id === collectionId);

    // Tag awards
    await fetch(`https://generationsapi.herokuapp.com/api/tag-awards/collections/${collectionId}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
        }
    }).then((res) => {
        const tagsCount = completedCollection?.attributes?.tagsCount;
        tagsCount?.keys?.map((key) =>
        setTagAwards((prev) => {
            return {
                ...prev,
                key: prev[key] ? prev[key] + tagsCount[key] : tagsCount[key]
            };
        })
        )
    });

    // Expended Effort
    const data = githubUsername ? {
        expendedEffort: user?.expendedEffort ? user?.expendedEffort + completedCollection?.attributes?.totalEffort : completedCollection?.attributes?.totalEffort,
        githubUsername: githubUsername
    } : {
        expendedEffort: user?.expendedEffort ? user?.expendedEffort + completedCollection?.attributes?.totalEffort : completedCollection?.attributes?.totalEffort
    };
    await fetch(`https://generationsapi.herokuapp.com/api/users/me/info`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(data),
    }).then((res) =>
        setUser((prev) => {
        return {
            ...prev,
            ...data
        };
        })
    );

    // Tray status
    if (trayIndex === -1) {
         // special collection
        const trayData = {
            "data": {
                "status": "completed",
                "collection": collectionId,
                "completedOn": new Date().toISOString().slice(0,10)
            }
        };

        await fetch(`https://generationsapi.herokuapp.com/api/trays`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(trayData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setBookmarkedCollections([
                    ...bookmarkedCollections,
                    { ...completedCollection, 
                        status: "completed", 
                        assigned_expert: null, 
                        trayId: data.data.id,
                        completed_on: data.data.attributes.completedOn,
                        tray_updated_at: data.data.attributes.updatedAt,
                        tray_created_at: data.data.attributes.createdAt
                    }
                ]);
            });
    } else {
        // normal collection
        await fetch(
          `https://generationsapi.herokuapp.com/api/trays/collections/${collectionId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
              data: {
                status: "completed",
              },
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const updatedData = {
              status: "completed",
              tray_updated_at: data.data?.attributes?.updatedAt,
              completed_on: data.data?.attributes?.completedOn
            };
            
            bookmarkedCollections[trayIndex] = Object.assign({}, bookmarkedCollections[trayIndex], updatedData);
            setBookmarkedCollections([...bookmarkedCollections]);
          });
    }
}

export default completeTray;