import { useState } from 'react';

function useProfileData() {

    function getProfileData() {
        const userProfileData = localStorage.getItem('profileData');
        return userProfileData && userProfileData
    }

    const [profileData, setProfileData] = useState(getProfileData() != null ?
        {
            firstname: JSON.parse(getProfileData()).firstname,
            lastname: JSON.parse(getProfileData()).lastname,
            dob: JSON.parse(getProfileData()).dob,
            email: JSON.parse(getProfileData()).email,
            hometown: JSON.parse(getProfileData()).hometown,
            gender: JSON.parse(getProfileData()).gender,
            since: JSON.parse(getProfileData()).since,
            username: JSON.parse(getProfileData()).username,
            numphotos: JSON.parse(getProfileData()).numphotos
        }
        : {
            firstname: null,
            lastname: null,
            dob: null,
            email: null,
            hometown: null,
            gender: null,
            since: null,
            username: null,
            numphotos: null
        });

    function saveProfileData(userProfileData) {
        localStorage.setItem('profileData', JSON.stringify(userProfileData));
        setProfileData(userProfileData);
    };

    function removeProfileData() {
        localStorage.removeItem('profileData');
        setProfileData(JSON.stringify({
            firstname: null,
            lastname: null,
            dob: null,
            email: null,
            hometown: null,
            gender: null,
            since: null,
            username: null,
            numphotos: null
        }));
        console.log('logout')
    }

    function fetchProfileData(token) {
        fetch('/api/profile', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(function (response) { return response.json(); })
            .then(function (data) {
                saveProfileData({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    dob: data.dob,
                    email: data.email,
                    hometown: data.hometown,
                    gender: data.gender,
                    since: data.since,
                    username: data.username,
                    numphotos: data.numphotos
                });
            })

    }

    return {
        setProfileData: saveProfileData,
        profileData,
        removeProfileData,
        fetchProfileData
    }

}

export default useProfileData;