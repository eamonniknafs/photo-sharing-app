import React, { useState, useRef } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
import "./comments.css";
import { propTypes } from "react-bootstrap/esm/Image";
import { Button } from "react-bootstrap";

const INITIAL_HEIGHT = 46;

export default function CommentBox( props ) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);
    useDynamicHeightField(textRef, commentValue);

    const onExpand = () => {
        if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
    };

    const onChange = (e) => {
        setCommentValue(e.target.value);
    };

    const onClose = () => {
        setCommentValue("");
        setIsExpanded(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let comment = {
            username: props.profileData.username,
            comment: commentValue,
        }
        props.comments.addComment(comment, props.photo.id, props.profileData.token);
    };

    return (
        <div className="container">
            <form
                onSubmit={onSubmit}
                ref={containerRef}
                className={cn("comment-box", {
                    expanded: isExpanded,
                    collapsed: !isExpanded,
                    modified: commentValue.length > 0
                })}
                style={{
                    minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
                }}
            >
                <div className="header">
                    <div className="user">
                        <span className="comment-box-username">{props.profileData.profileData.username ? props.profileData.profileData.username : "Anonymous User"}</span>
                    </div>
                </div>
                <textarea
                    ref={textRef}
                    onClick={onExpand}
                    onFocus={onExpand}
                    onChange={onChange}
                    className="comment-field"
                    placeholder="Leave a comment..."
                    value={commentValue}
                    name="comment"
                    id="comment"
                />
                <div className="actions">
                    <button type="button" className="cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <Button type="submit" disabled={commentValue.length < 1}>
                        Post
                    </Button>
                </div>
            </form>
        </div>
    );
}
