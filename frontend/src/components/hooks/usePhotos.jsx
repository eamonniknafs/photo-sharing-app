import { useState } from "react";

function usePhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataAvailable, setDataAvailable] = useState(true);

    function addPhotos(newPhotos) {
        for (var idx in newPhotos) {
            setPhotos(photos => [...photos, newPhotos[idx]]);
        }
    }

    function fetchPhotos(numLoaded, num, usernames = null) {
        if (usernames !== null) {
            console.log(usernames)
            for (var user in usernames) {
                setLoading(true)
                fetch('/api/explore/' + numLoaded + '&' + num + (usernames[user] != null ? '/' + usernames[user] : ""), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data === undefined || data.length === 0) {
                        setDataAvailable(false)
                        console.log('NO MORE DATA')
                    } else {
                        console.log(data)
                        for (var idx in data) {
                            fetchPhotoSrc(data[idx][0])
                        }
                    }
                }).catch(() => {
                    setDataAvailable(false)
                    console.log('NO MORE DATA for ' + usernames[user])
                });
            }
            setLoading(false)
        } else {
            setLoading(true)
            fetch('/api/explore/' + numLoaded + '&' + num, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data === undefined || data.length === 0) {
                    setDataAvailable(false)
                    console.log('NO MORE DATA')
                } else {
                    console.log(data)
                    for (var idx in data) {
                        fetchPhotoSrc(data[idx][0])
                    }
                }
            }).catch(() => {
                setDataAvailable(false)
                console.log('NO MORE DATA for ' + usernames[user])
            });
            setLoading(false)
        }
    }

    function fetchPhotoSrc(id) {
        fetch('/api/photo/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            return response.blob().then((blob) => {
                return {
                    blob: blob,
                    width: response.headers.get('width'),
                    height: response.headers.get('height'),
                    username: response.headers.get('username'),
                    caption: response.headers.get('caption')
                };
            });
        }).then(({ blob, width, height, username }) => {
            let src = URL.createObjectURL(blob)
            addPhotos([{
                src: src,
                width: parseInt(width),
                height: parseInt(height),
                id: id,
                username: username
            }])
        });
    }


    return {
        photos,
        setPhotos,
        addPhotos,
        fetchPhotos,
        loading,
        dataAvailable,
        setDataAvailable
    }
}

export default usePhotos;