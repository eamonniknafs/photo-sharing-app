import { Card } from "react-bootstrap";

function CommentsPane(props) {
    console.log(props.photo.id)
    return(
        <Card className="comments-container">
            <h1>Hello world!</h1>
            <p>This photo's id is: {props.photo.id}</p>
            <p>From user: {props.photo.username}</p>
        </Card>
    );
}

export default CommentsPane