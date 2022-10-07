const addOrRemoveFromTray = (tray, id, setTray, user) => {
    let trayCollections = tray.map(collection => collection.collectionId);

    if (trayCollections.includes(id)) {
        let newTray = tray.filter(i => i.collectionId !== id);
        setTray(newTray);

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
        setTray([
            ...tray, 
            { "collectionId": id, "status": "requested" }
        ]);

        if(user?.token){
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
        }  
    }
}

export default addOrRemoveFromTray;