const addOrRemoveFromTray = (bookmarkedCollections, id, setBookmarkedCollections, user, collection) => {
    let trayCollections = bookmarkedCollections.map(collection => collection.id);

    if (trayCollections.includes(id)) {
        let newTray = bookmarkedCollections.filter(i => i.id !== id);
        setBookmarkedCollections(newTray);

        if(user?.token){
            fetch(`https://generationsapi.herokuapp.com/api/trays/collections/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                }
            })
                .then((response) => response.json());
        }

    } else {
        let newBookmarkedCollection = collection.find((coll) => coll.id === id);

        setBookmarkedCollections([
            ...bookmarkedCollections, 
            { ...newBookmarkedCollection, status: "requested", assigned_expert: null }
        ]);

        if(user?.token){
            console.log("ada token")
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
                .then((response) => response.json());
        }  else {
            console.log("gaada token")
        }
    }
}

export default addOrRemoveFromTray;