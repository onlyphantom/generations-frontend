import { useEffect, useState } from "react";

export default function BookmarkList(params) {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch('https://generationsapi.herokuapp.com/api/bookmarks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data)
                setBookmarks(data.data);
                setLoading(false)
            });
    }, []);

    return <div>
        {!loading
            ? bookmarks.sort((a, b) => b.created_at.localeCompare(a.created_at))
                .map((bookmark, i) => (
                    <h3>{JSON.stringify(bookmark)}</h3>
                    // <BookmarkCard bookmark={bookmark} key={i} />
                ))
            : 'Loading...'}
    </div>
}