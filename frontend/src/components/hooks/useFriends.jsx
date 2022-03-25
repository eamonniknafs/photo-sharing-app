import { useState } from "react";

function useFriends() {
    const [users, setUsers] = useState([]);


    return {
        users,
        setUsers
    }
}

export default useFriends;