const selectMentor = (trayId, expertId, user, bookmarkedCollections, setBookmarkedCollections) => {

    const newData = bookmarkedCollections.map(tray => {
        if (tray.trayId === trayId) {
            tray.status = "preaccept";
            tray.assigned_expert = tray.attributes?.experts?.data?.find(expert => expert.id === expertId);
        }

        return tray
    });
    setBookmarkedCollections(newData);

    const data = {
        "data": {
            "status": "preaccept",
            "expert": expertId
        }
    };

    fetch(`https://generationsapi.herokuapp.com/api/trays/${trayId}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${user.token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json());
}

export default selectMentor