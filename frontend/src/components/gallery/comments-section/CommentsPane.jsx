import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Toast } from "react-bootstrap";
import CommentBox from "./CommentBox";
import "./comments.css";

function CommentsPane(props) {
    const [isHovered, setIsHovered] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        props.comments.fetchComments(props.photo.id);
        props.comments.fetchLikes(props.photo.id);
        if (props.profileData.token) {
            props.comments.isLiked(props.photo.id, props.profileData.token);
        }
    }, [props.photo.id, props.profileData.token, props.comments.liked, props.comments.likes]);

    function toggleHover() {
        setIsHovered(hover => !hover);
    }

    function sendLike() {
        if (props.profileData.token) {
            props.comments.newLike(props.photo.id, props.profileData.token);
        } else {
            setShowWarning(true);
        }
    }

    return (
        <Card className="comments-container">
            <h2>{props.photo.caption === undefined ? "Photo" : props.photo.caption}</h2>
            <h5>Posted by: {props.photo.username}</h5>
            {/* <p>id: {props.photo.id}</p> */}
            <p>{props.comments.likes} likes</p>
            {/* <p>Token: {props.profileData.token}</p> */}

            <div className="comments-inner">
                <div>
                    <h3 className="comments-title">Comments</h3>
                    {props.comments.comments.map(comment => {
                        // console.log(comment.id)
                        return (
                            <div className="comment" key={comment.id}>
                                <p className="comment-username">{comment.username ? comment.username : "Anon"}:</p>
                                <p className="comment-body">{comment.comment}</p>
                            </div>
                        )
                    })}
                </div>
                <CommentBox className="comment-box" photo={props.photo} comments={props.comments} profileData={props.profileData} />
                <Button variant="light" onClick={sendLike} onMouseEnter={toggleHover} onMouseLeave={toggleHover} className="like-button">
                    {isHovered || props.comments.liked ? <FontAwesomeIcon icon="fa-solid fa-heart" /> : <FontAwesomeIcon icon="fa-regular fa-heart" />}
                </Button>
            </div>
            <Toast show={showWarning} bg="warning" onClose={() => setShowWarning(false)} delay={4000} autohide className="require-login">
                <Toast.Header>
                    <FontAwesomeIcon icon="fas fa-info-circle" />
                    <strong className="me-auto">Not logged in</strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body>You must be logged in to leave a like.</Toast.Body>
            </Toast>
        </Card>
    );
}

export default CommentsPane