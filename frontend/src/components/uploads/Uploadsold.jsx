import React, { useRef } from 'react';
import useFileUpload from 'react-use-file-upload';
import { Button, Card, Container, Row } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'; 

const Uploads = (props) => {
    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
    } = useFileUpload();

    const inputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = createFormData();
        console.log(formData)

        console.log(files)
        try {
            fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                    'Content-Type': 'multipart/form-data',
                    'Content-Length': files.length
                },
                body: formData
            })
            console.log({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                    'Content-Type': 'multipart/form-data',
                    'Content-Length': files.length
                },
                body: formData
            });
        } catch (error) {
            console.error('Failed to submit files.');
        }
    };

    return (
        <Container className="center">
            <Card fluid className='inner'>
                <h1>Upload Photos</h1>
                <p>{props.token}</p>
                <p>If you have any photo(s) selected for upload, the photo(s) will appear here:</p>

                <div className="form-container">
                    {/* Display the files to be uploaded */}
                    <div>{/* css={ListCSS} */}
                        <ul>
                            {fileNames.map((name) => (
                                <li key={name}>
                                    <span>{name}</span>

                                    <span onClick={() => removeFile(name)}>
                                        <i className="fa fa-times" />
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {files.length > 0 && (
                            <Container>
                                <Row>
                                    File types found: {fileTypes.join(', ')}
                                </Row>
                                <Row>
                                    Total Size: {totalSize}
                                </Row>
                                <Row>
                                    <Button variant="outline-danger" size="sm" onClick={() => clearAllFiles()}>Clear All</Button>
                                </Row>
                            </Container>
                        )}
                    </div>

                    {/* Provide a drop zone and an alternative button inside it to upload files. */}
                    <Card fluid
                        bg="light"
                        border="dark"
                        // css={DropzoneCSS}
                        onDragEnter={handleDragDropEvent}
                        onDragOver={handleDragDropEvent}
                        onDrop={(e) => {
                            handleDragDropEvent(e);
                            setFiles(e, 'a');
                        }}
                    >
                        <p color='secondary'>Drag and drop files here</p>

                        <Button variant="secondary" onClick={() => inputRef.current.click()}>Or select files to upload</Button>

                        {/* Hide the crappy looking default HTML input */}
                        <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => setFiles(e, 'a')} />
                    </Card>
                </div>

                <div className="submit">
                    <Button variant="primary" size="lg" onClick={handleSubmit}>Submit</Button>
                </div>
            </Card>
        </Container>
    );
};

export default Uploads