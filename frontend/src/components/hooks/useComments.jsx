import { useState } from "react";

function useComments() {
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(["en"]);

    function addComment(newComment, photoId, token=null) {
        console.log(newComment)
        fetch('/api/comments/' + photoId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setComments(cmts => [...cmts, data])
            })
        fetchComments(photoId)
    }

    function addLike(username) {
        setLikes(likes => [...likes, username]);
    }

    function removeLike(username) {
        setLikes(likes => likes.filter(like => like !== username));
    }

    function fetchLikes(photoId) {
        fetch('/api/likes/' + photoId)
            .then(response => response.json())
            .then(data => {
                setComments(data);
            });
    }

    function fetchComments(photoId) {
        fetch('/api/comments/'+photoId)
            .then(response => response.json())
            .then(data => {
                let cmts = [];
                for (var idx in data) {
                    console.log(data[idx])
                    cmts.push({
                        comment: data[idx][0],
                        username: data[idx][1],
                        id: data[idx][2]
                    })
                }
                setComments(cmts);
            });
        console.log(comments)
    }

    return {
        comments,
        setComments,
        addComment,
        fetchComments,
        likes,
        setLikes,
        addLike,
        removeLike,
        fetchLikes
    }
}

export default useComments;