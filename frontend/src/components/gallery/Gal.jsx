import Gallery from "react-photo-gallery";
import { Container, Spinner, Card, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './gallery.css'
import { useEffect, useState, useCallback } from 'react';
import CommentsPane from "./comments-section/CommentsPane";

function Gal(props) {
    const [startLoadingAt, setStartLoadingAt] = useState(0)
    const loadCount = 40
    // const [currId, setCurrId] = useState(4)
    const [bottom, setBottom] = useState(false)

    useEffect(() => {
        console.log('COMPONENT MOUNTED')
    }, [])

    useEffect(() => {
        loadMore();
        let currentPhotos = []
        for (var pictures in props.gallery.photos) {
            currentPhotos.push(props.gallery.photos[pictures].id)
        }
        currentPhotos.sort(function (a, b) {
            return a - b;
        })
        console.log(currentPhotos)
    }, [startLoadingAt])

    useEffect(() => {
        // setCurrId(props.gallery.photos[props.gallery.photos.length - 1]?.id + 1)
        if (bottom) {
            console.log('AT BOTTOM')
            console.log('dataAvailable: ' + props.gallery.dataAvailable)
            console.log('loading: ' + props.gallery.loading)
            if (props.gallery.dataAvailable && !props.gallery.loading) {
                // console.log("currID: " + currId)
                setStartLoadingAt(start => start + loadCount)
                console.log('CHANGED')
            }
        }
    }, [bottom, props.gallery.loading, props.gallery.dataAvailable])

    // useEffect(() => {
    //     setCurrId(props.gallery.photos[props.gallery.photos.length - 1]?.id + 1)
    // }, [props.gallery.photos])

    const handleScroll = () => {
        setBottom(Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight)
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function loadMore() {
        console.log(props.username)
        if (props.username) {
            props.gallery.fetchPhotos(startLoadingAt, loadCount, [props.username])
            console.log('LOADING MORE, starting at: ' + startLoadingAt)
        } else {
            props.gallery.fetchPhotos(startLoadingAt, loadCount)
            console.log('LOADING MORE, starting at: ' + startLoadingAt)
        }
    }

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const showNext = (e = null) => {
        if (e !== null) {
            e.stopPropagation();
        }
        if (currentImage >= props.gallery.photos.length - 1) {
            setViewerIsOpen(false);
        } else {
            setCurrentImage(current => current + 1)
        }
    };

    const showPrev = (e = null) => {
        if (e !== null) {
            e.stopPropagation();
        } if (currentImage <= 0) {
            setViewerIsOpen(false);
        } else {
            setCurrentImage(current => current - 1)
        }
    };

    const onOverlayClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (e.target === e.currentTarget) {
            closeLightbox();
        }
    };

    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape") {
            closeLightbox();
        } else if (e.key === "ArrowRight") {
            showNext();
        } else if (e.key === "ArrowLeft") {
            showPrev();
        }
    });

    return (
        <Container fluid className="content">
            <Gallery photos={props.gallery.photos} onClick={openLightbox} />
            {props.gallery.dataAvailable ? <Spinner animation="grow" className="spinner" /> : null}
            {viewerIsOpen ?
                <div id="lightbox" onClick={onOverlayClick} >
                    <Button className="button" variant="secondary" size="lg" onClick={showPrev}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></Button>
                    <div className="lightbox-content">
                        <img id="lightbox-img" src={props.gallery.photos[currentImage].src} />
                        <CommentsPane className="commentspane" photo={props.gallery.photos[currentImage]} comments={props.comments} profileData={props.profileData} />
                    </div>
                    <Button className="button" variant="secondary" size="lg" onClick={showNext}><FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Button>
                </div>
                : null}
        </Container>
    );
}

export default Gal;