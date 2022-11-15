const selectMentor = (trayId, expertId, token) => {

    const data = {
        "data": {
            "status": "preaccept",
            "expert": expertId
        }
    }
    fetch(`https://generationsapi.herokuapp.com/api/trays/${trayId}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(
        response => response.json()
    )
}

export default selectMentor