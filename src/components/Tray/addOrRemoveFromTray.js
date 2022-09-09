const addOrRemoveFromTray = (tray, id, setTray) => {

    if (tray.includes(id)) {
        let newTray = tray.filter(i => i !== id)
        setTray(newTray)
    } else {
        setTray([...tray, id]);
    }
}

export default addOrRemoveFromTray