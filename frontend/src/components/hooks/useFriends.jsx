import { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

function useFriends() {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    function getUsers(token) {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(function (response) { return response.json(); })
            .then(function (data) {
                let usrs = []
                for (var idx in data) {
                    usrs.push(data[idx][0])
                }
                setUsers(usrs);
            })
    }

    function getFriends(token) {
        fetch('/api/friends', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(function (response) { return response.json(); })
            .then(function (data) {
                let frnds = []
                for (var idx in data) {
                    frnds.push(data[idx][0])
                }
                setFriends(frnds);
            })
    }

    function addRemoveFriend(token, username) {
        fetch('/api/addremovefriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'friend_username': username
            })
        }).then(function (response) { return response.json(); })
            .then(function (data) {
                console.log(data)
            })
    }

    return {
        users,
        getUsers,
        friends,
        getFriends,
        addRemoveFriend
    }
}

export default useFriends;