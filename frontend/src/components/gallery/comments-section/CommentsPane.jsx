import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import CommentBox from "./CommentBox";
import "./comments.css";

function CommentsPane(props) {

    useEffect(() => {
        props.comments.fetchComments(props.photo.id);
    }, [props.photo.id])

    return (
        <Card className="comments-container">
            <h2>{props.photo.caption === undefined ? "Photo" : props.photo.caption}</h2>
            <h5>Posted by: {props.photo.username}</h5>
            <p>id: {props.photo.id}</p>
            {/* <p>Token: {props.profileData.token}</p> */}

            <div className="comments-inner">
                <div>
                    <h3 className="comments-title">Comments</h3>
                    {props.comments.comments.map(comment => { console.log(comment.id)
                     return (
                        <div className="comment" key={comment.id}>
                            <p className="comment-username">{comment.username ? comment.username : "Anon"}:</p>
                            <p className="comment-body">{comment.comment}</p>
                        </div>
                    )})}
                </div>
                <CommentBox className="comment-box" photo={props.photo} comments={props.comments} profileData={props.profileData} />
            </div>

        </Card>
    );
}

export default CommentsPane