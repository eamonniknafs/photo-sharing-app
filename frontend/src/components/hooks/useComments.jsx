import { useState } from "react";

function useComments() {
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    function addComment(newComment, photoId, token = null) {
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
                // console.log(data)
                setComments(cmts => [...cmts, data])
            })
        fetchComments(photoId)
    }

    function newLike(photoId, token) {
        fetch('/api/newlike/' + photoId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res =>
            fetchLikes(photoId),
            isLiked(photoId)
        )

    }

    function removeLike(username) {
        setLikes(likes => likes.filter(like => like !== username));
    }

    function fetchLikes(photoId) {
        fetch('/api/likes/' + photoId)
            .then(response => response.json())
            .then(data => {
                setLikes(data[0][0]);
            });
    }

    function isLiked(photoId) {
        fetch('/api/likes/' + photoId)
            .then(response => response.json())
            .then(data => {
                if (data[0][0] == 0) {
                    setLiked(false)
                } else {
                    setLiked(true)
                }
            });
    }

    function fetchComments(photoId) {
        fetch('/api/comments/' + photoId)
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
        removeLike,
        fetchLikes,
        isLiked,
        liked,
        setLiked,
        newLike

    }
}

export default useComments;