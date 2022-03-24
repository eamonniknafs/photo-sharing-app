import { useState } from "react";

function usePhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    function addPhotos(newPhotos) {
        for (var idx in newPhotos) {
            setPhotos(photos => [...photos, newPhotos[idx]]);
        }
    }

    function fetchPhotos(numLoaded, num) {
        setLoading(true)
        fetch('/api/explore/' + numLoaded + '&' + num, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            for (var idx in data) {
                fetchPhotoSrc(data[idx][0])
            }
        }).catch(() => (console.log('NO MORE DATA')));
        setLoading(false)
    }

    function fetchPhotoSrc(id) {
        fetch('/api/photo/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.blob().then((blob) => {
                return {
                    blob: blob,
                    width: response.headers.get('width'),
                    height: response.headers.get('height')
                };
            });
        }).then(({ blob, width, height }) => {
            let src = URL.createObjectURL(blob)
            addPhotos([{
                src: src,
                width: parseInt(width),
                height: parseInt(height)
            }])
        });
    }


    return {
        photos,
        setPhotos,
        addPhotos,
        fetchPhotos,
        loading
    }
}

export default usePhotos;