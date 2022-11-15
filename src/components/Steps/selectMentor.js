import { getBookmarkedCollections } from "../CollectionList"

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

        getBookmarkedCollections(user, collection, setBookmarkedCollections)
    )


}

export default selectMentor