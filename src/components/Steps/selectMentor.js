const selectMentor = (trayCollectionId, expertId, token) => {

    const data = {
        "data": {
            "status": "preaccept",
            "expert": expertId
        }
    }
    fetch(`https://generstionsapi.herokuapp.com/api/trays/collections/${trayCollectionId}`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(
        response => response.json()
    )
}

export default selectMentor