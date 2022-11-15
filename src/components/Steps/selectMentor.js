// import { getBookmarkedCollections } from "../CollectionList";

const selectMentor = (trayId, expertId, user, collection, setBookmarkedCollections) => {

    const data = {
        "data": {
            "status": "preaccept",
            "expert": expertId
        }
    }
    fetch(`https://generationsapi.herokuapp.com/api/trays/${trayId}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${user.token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(
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
                let trayCollections = data.data.map((t) => {
                    let val = collection.find(
                        (coll) => coll.id === t.attributes.collection.data.id
                    );
                    return {
                        ...val,
                        status: t.attributes.status,
                        assigned_expert: t.attributes.expert.data,
                        trayId: t.id,
                    };
                });
                setBookmarkedCollections(trayCollections);
            })

    )


}

export default selectMentor