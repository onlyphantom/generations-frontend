const addOrRemoveFromTray = (bookmarkedCollections, id, setBookmarkedCollections, user, collection) => {
    let trayCollections = bookmarkedCollections.map(collection => collection.id);

    // handle remove scenario
    if (trayCollections.includes(id)) {
        let newTray = bookmarkedCollections.filter(i => i.id !== id);
        setBookmarkedCollections(newTray);

        if (user?.token) {
            fetch(`https://generationsapi.herokuapp.com/api/trays/collections/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                }
            })
                .then((response) => response.json());
        }

    }
    // handle add scenario
    else {
        let newBookmarkedCollection = collection.find((coll) => coll.id === id);

        if (user?.token) {
            const data = {
                "data": {
                    "status": "requested",
                    "collection": id,
                }
            };

            fetch(`https://generationsapi.herokuapp.com/api/trays`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    setBookmarkedCollections([
                        ...bookmarkedCollections,
                        { ...newBookmarkedCollection, status: "requested", assigned_expert: null, trayId: data.data.id }
                    ]);
                });
        }
    }
}

export default addOrRemoveFromTray;